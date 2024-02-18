import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import directus, { News, FooterData, Services } from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import Link from 'next/link';
import { FiArrowUpLeft } from 'react-icons/fi';

import { Smooth } from '@/components/animation/Smooth';


export default function NewsDetails({ news, footer, services }: { news: News, footer: FooterData, services: Services[] }) {

    const { t } = useTranslation('common');

    const {
        title,
        content,
        meta_title,
        meta_description,
    } = news.translations[0];

    return (
        <>
            <Head>
                <title>{meta_title}</title>
                <meta name='description' content={meta_description} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <Header services={services} />
            <main className='mx-auto container min-h-[600px] px-12 md:px-28 lg:px-36 xl:px-52 pb-16 md:pb-24 lg:pb-32'>
                    <Smooth>
                        <Link
                        href='/news'
                        className='flex w-fit flex-nowrap items-top gap-x-1 text-sm font-medium underline underline-offset-4 text-[#65878A] hover:text-[#E7ED52]'
                        >
                            <FiArrowUpLeft size={16} color='#65878A' />
                            <span className='uppercase'>
                                {t('navigation.news')}
                            </span>
                        </Link>
                    </Smooth>
                    <Smooth>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mt-8 md:mt-14'>
                            {title}
                        </h1>
                    </Smooth>
                    <Smooth>
                        <div className='text-[#65878A] mt-10'>
                            {format(new Date(news.date_created), "dd.MM.yyyy")}
                        </div>
                    </Smooth>
                    <div className='mt-16'>
                        <Smooth width='100%'>
                            <div
                            className='html-content'
                            dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </Smooth>
                    </div>
            </main>
            <Footer data={footer} services={services} />
        </>
    )
}


export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    try {

        const availableLocales = locales || ['ru'];

        const news = await directus.request(
            readItems('news', {
                filter: {
                    _and: [
                        {
                            status: {
                                _eq: 'published',
                            },
                        },
                    ],
                },
                fields: [
                    'id',
                ],
                limit: -1,
            }),
        );

        const paths = news.flatMap((item) =>
            availableLocales.map((locale) => ({
                params: {
                    newsId: item.id.toString(),
                },
                locale,
            }))
        );
        return {
            paths: paths || [],
            fallback: false,
        };
        } catch (error) {
        console.error('Error fetching paths:', error);
        return {
            paths: [],
            fallback: false,
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    try {
        const currentLocale = locale || 'ru';
        const newsId = params?.newsId as string;

        const news = await directus.request(
            readItem('news', newsId, {
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
                    'date_created',
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

        if (!news || !footer || !services) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                news,
                footer,
                services,
                ...await serverSideTranslations(currentLocale, ['common']),
            },
            revalidate: 3600,
        };
        
    } catch (error) {
        console.error('Error fetching NewsDetails:', error);
        return {
            notFound: true,
        };
    }
}