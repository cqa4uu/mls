import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import directus, { Privacy, FooterData, Services } from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Smooth } from '@/components/animation/Smooth';


export default function About({ privacy, footer, services }: { privacy: Privacy, footer: FooterData, services: Services[] }) {
    
    const {
        title,
        content,
        meta_title,
        meta_description,
    } = privacy.translations[0];

    return (
        <>
            <Head>
                <title>{meta_title}</title>
                <meta name='description' content={meta_description} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <Header services={services} />
            <main className='mx-auto container px-12 md:px-28 lg:px-36 xl:px-52 pb-14 md:pb-16 lg:pb-20'>
                <Smooth>
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mt-8 md:mt-14'>
                    {title}
                </h1>
                </Smooth>

                <Smooth>
                <div
                className='html-content page-with-bg overflow-hidden mt-14 pb-12 md:pb-16 lg:pb-20 xl:pb-24'
                dangerouslySetInnerHTML={{ __html: content }}
                />
                </Smooth>

            </main>
            <Footer data={footer} services={services} />
        </>
    )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const currentLocale = locale || 'ru';

        const privacy = await directus.request(
            readItem('privacy', 1, {
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
                            'title',
                            'content',
                            'meta_title',
                            'meta_description',
                        ],
                    },
                ],
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

        if (!privacy || !footer || !services ) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                privacy,
                footer,
                services,
                ...await serverSideTranslations(currentLocale, ['common']),
            },
            revalidate: 3600,
        };
        
    } catch (error) {
        console.error('Error fetching Privacy:', error);
        return {
            notFound: true,
        };
    }
}