import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import CalculateCost from '@/components/CalculateCost';
import directus, { Contacts, FooterData, Services } from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import Callback from '@/components/Callback';

import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import dynamic from 'next/dynamic';
import { FiPhoneCall, FiEdit3 } from "react-icons/fi";

import { motion } from "framer-motion";
import { Smooth } from '@/components/animation/Smooth';


const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Contacts({ contacts, footer, services }: { contacts: Contacts[], footer: FooterData, services: Services[] }) {

    const { t } = useTranslation('common');

    const coordinates = contacts.map(contact => {
        return `${contact.longitude}, ${contact.latitude}`;
    });

    return (
        <>
            <Head>
                <title>{t('navigation.contacts')}</title>
                <meta name='description' content={t('navigation.contactsMetaDescription')} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <Header services={services} />
            <main className='mx-auto container px-12 md:px-28 lg:px-36 xl:px-52 pb-14 md:pb-16 lg:pb-20'>
                <Smooth>
                <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-8 md:mt-14'>
                    {t('navigation.contacts')}
                </h1>
                </Smooth>

                <Smooth>
                    <Tab.Group>
                        <Tab.List>
                            <div className='flex flex-wrap gap-4 mt-10 md:mt-14'>
                                {contacts.map((address) => (
                                    <Tab
                                    key={address.translations[0].location}
                                    as={Fragment}
                                    >
                                    {({ selected }) => (
                                        <button
                                        className={
                                            selected ? 'text-xs md:text-sm font-semibold text-white border-2 border-solid border-[#C5C5C5] rounded-full py-3 px-6 cursor-default duration-100 whitespace-nowrap outline-0' : 'text-xs md:text-sm font-semibold text-white border border-solid border-[#C5C5C5] hover:border-[#007780] hover:bg-[#007780] rounded-full py-3 px-6 opacity-40 hover:opacity-100 duration-100 whitespace-nowrap outline-0'
                                        }
                                        >
                                            {address.translations[0].location}
                                        </button>
                                    )}
                                    </Tab>
                                ))}
                            </div>
                        </Tab.List>
                        <Tab.Panels>
                            {contacts.map((address) => (
                                <Tab.Panel
                                key={address.translations[0].location}
                                >
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-8 lg:gap-y-0 lg:grid-cols-3 gap-x-4 mt-10 md:mt-24'>
                                        <div>
                                            <div className='text-base text-[#758687] lowercase'>
                                                {t('content.phone')}:
                                            </div>
                                            <div className='text-lg'>
                                                <a href={`tel:${address.translations[0].phone}`} className='hover:text-[#E7ED52]'>
                                                    {address.translations[0].phone}
                                                </a>
                                            </div>
                                        </div>
                                        <div className='order-2 lg:order-1'>
                                            <div className='text-base text-[#758687] lowercase'>
                                                {t('content.mail')}:
                                            </div>
                                            <div className='text-lg'>
                                                <a href={`mailto:${address.translations[0].mail}`} className='hover:text-[#E7ED52]'>
                                                    {address.translations[0].mail}
                                                </a>
                                            </div>
                                        </div>
                                        <div className='md:pt-[1.65rem] order-1 lg:order-2'>
                                            <Callback>
                                                <div className='flex items-center gap-x-2 group'>
                                                    <div>
                                                        <FiPhoneCall size={20} color='#95A9AA' />
                                                    </div>
                                                    <div className='text-base text-[#95A9AA] font-medium uppercase underline underline-offset-4 group-hover:text-[#E7ED52]'>
                                                        {t('content.callback')}
                                                    </div>
                                                </div>
                                            </Callback>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 gap-y-14 lg:gap-y-0 lg:grid-cols-2 lg:gap-x-20 xl:gap-x-32 mt-14 lg:mt-24'>
                                        <div className='flex gap-x-8'>
                                            <div className='text-base text-[#758687] lowercase'>
                                                {t('content.address')}:
                                            </div>
                                            <div className='text-base'>
                                                {address.translations[0].address}
                                            </div>
                                        </div>
                                        <div>
                                            <CalculateCost>
                                                <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className='flex w-fit gap-x-3 items-center bg-[#012D30] rounded-full py-1 group'
                                                >
                                                    <div className='border border-solid border-[#95A9AA] rounded-full p-4'>
                                                        <FiEdit3 size={24} color='#95A9AA' />
                                                    </div>
                                                    <div className='text-base text-left leading-tight group-hover:text-[#E7ED52] pr-6'>
                                                        {t('content.sendRequest')}
                                                    </div>
                                                </motion.div>
                                            </CalculateCost>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </Smooth>
                
            </main>
            <div className='relative'>
                <div className='mx-auto max-w-[90rem] px-6 z-0'>
                    <div className='relative top-14 w-full h-[600px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-t-[1.8rem] overflow-hidden'>
                        <Map coordinates={coordinates} />
                    </div>
                </div>
                <div className='relative z-10'>
                    <Footer data={footer} services={services} />
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const currentLocale = locale || 'ru';

        const contacts = await directus.request(
            readItems('contacts', {
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
                    { 
                        translations: [
                            'location',
                            'phone',
                            'mail',
                            'address',
                        ],
                    },
                    'longitude',
                    'latitude',
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
                    'slug',
                    { 
                        translations: [
                            'title',
                        ],
                    },
                ],
                limit: -1,
            }),
        );

        if (!contacts || !footer || !services) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                contacts,
                footer,
                services,
                ...await serverSideTranslations(currentLocale, ['common']),
            },
            revalidate: 3600,
        };
        
    } catch (error) {
        console.error('Error fetching Contacts:', error);
        return {
            notFound: true,
        };
    }
}