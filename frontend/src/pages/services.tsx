import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import CalculateCost from '@/components/CalculateCost';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import directus, { Services, FooterData } from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel
  } from '@chakra-ui/react';
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { SVGSendARequestRU, SVGSendARequestEN } from '@/components/svg/SVGSendARequest';

import { Smooth } from '@/components/animation/Smooth';


export default function Services({ services, footer }: { services: Services[], footer: FooterData }) {

    const { t } = useTranslation('common');

    const router = useRouter();
    const locale = router.locale || router.defaultLocale || 'ru';

    const [index, setIndex] = useState<any>(-1);
    useEffect(() => {
        const { slug } = router.query;
        
        if (services) {
            const matchingServiceIndex = services.findIndex(service => service.slug === slug);
    
            if (matchingServiceIndex !== -1) {
                setIndex(matchingServiceIndex);
            }
        }
    }, [router.query, services]);

    useEffect(() => {
        const scrollToAccordionItem = () => {
            const accordionItemElement = document.getElementById(`accordion-item-${index}`);
            if (accordionItemElement) {
                accordionItemElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        if (index !== -1) {
            const timeoutId = setTimeout(scrollToAccordionItem, 300);
            return () => clearTimeout(timeoutId);
        }
    }, [index]);

    return (
        <>
            <Head>
                <title>{t('navigation.services')}</title>
                <meta name='description' content={t('navigation.servicesMetaDescription')} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <Header services={services} />
            <main className='mx-auto container min-h-screen px-12 md:px-28 lg:px-36 xl:px-52 pb-28 md:pb-36 xl:pb-44'>
                <Smooth>
                <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-8 md:mt-14'>
                    {t('navigation.services')}
                </h1>
                </Smooth>
                <div className='mt-8 md:mt-20 md:pl-20 lg:pl-32 xl:pl-44'>
                    <Accordion
                    index={index}
                    onChange={setIndex}
                    >
                        {services.map((service, index) => (
                            <AccordionItem key={service.id}>
                                {({ isExpanded }) => (
                                <Smooth width='100%'>
                                <>
                                {isExpanded ? (
                                    <h2 id={`accordion-item-${index}`}>
                                        <AccordionButton className='flex justify-between gap-x-2 py-8 md:py-10 xl:py-14'>
                                            <div className='text-lg md:text-xl lg:text-2xl font-light uppercase text-left'>
                                                {service.translations[0].title}
                                            </div>
                                            <div className='bg-[#007780] rounded-full p-2'>
                                                <FiArrowUp size={26} color='#00191B' />
                                            </div>
                                        </AccordionButton>
                                    </h2>
                                ) : (
                                    <h2 id={`accordion-item-${index}`} className='border-b border-solid border-[#005056] group'>
                                        <AccordionButton className='flex justify-between gap-x-2 py-8 md:py-10 xl:py-14'>
                                            <div className='text-lg md:text-xl lg:text-2xl font-light uppercase text-left'>
                                                {service.translations[0].title}
                                            </div>
                                            <div className='bg-[#00373C] group-hover:bg-[#E7ED52] rounded-full p-2'>
                                                <FiArrowDown size={26} color='#00191B' />
                                            </div>
                                        </AccordionButton>
                                    </h2>
                                )}
                                <AccordionPanel>
                                    <div
                                    className='html-content border-b-[3px] border-solid border-[#007780] pb-14'
                                    dangerouslySetInnerHTML={{ __html: service.translations[0].content }}
                                    />
                                </AccordionPanel>
                                </>
                                </Smooth>
                                )}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </main>
            <div className='mx-auto container px-6 lg:px-8 pb-20 md:pb-32 xl:pb-40'>
                <CalculateCost>
                    <div className='max-w-[350px]'>
                        {locale === 'ru' ? (
                            <SVGSendARequestRU />
                        ) : (
                            <SVGSendARequestEN />
                        )}
                    </div>
                </CalculateCost>
            </div>
            <Footer data={footer} services={services} />
        </>
    )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const currentLocale = locale || 'ru';

        const services = await directus.request(
            readItems('services', {
                filter: {
                    _and: [
                        {
                            status: {
                                _eq: 'published',
                            },
                        },
                    ],
                },
                deep: {
                    translations: {
                        _filter: {
                            _and: [
                                {
                                    languages_code: { _eq: currentLocale },
                                },
                            ],
                        },
                    },
                },
                fields: [
                    'id',
                    'slug',
                    { 
                        translations: [
                            'title',
                            'short_title',
                            'content',
                        ],
                    },
                    'icon',
                ],
                limit: -1,
            }),
        );

        const footer = await directus.request(
            readItem('footer', 1, {
                deep: {
                    translations: {
                        _filter: {
                            _and: [
                                {
                                    languages_code: { _eq: currentLocale },
                                },
                            ],
                        },
                    },
                },
                fields: [
                    { 
                        translations: [
                            'company',
                            'description',
                            'phone',
                            'email',
                            'address',
                            'link_vk',
                            'link_telegram',
                            'link_dzen',
                            'company_full_name',
                        ],
                    },
                ],
            }),
        );

        if (!services || !footer) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                services,
                footer,
                ...await serverSideTranslations(currentLocale, ['common']),
            },
            revalidate: 3600,
        };
        
    } catch (error) {
        console.error('Error fetching Services:', error);
        return {
            notFound: true,
        };
    }
}