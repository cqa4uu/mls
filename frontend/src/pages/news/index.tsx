import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import directus, { News, FooterData, Services } from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

import { FiArrowUpRight } from 'react-icons/fi';

import { Smooth } from '@/components/animation/Smooth';


function updatePictureUrls(array: any[], field: string): void {
    array.forEach((item) => {
        item[field] = `${process.env.DIRECTUS_URL}assets/${item[field]}`;
    });
}

export default function News({ news, footer, services }: { news: News[], footer: FooterData, services: Services[] }) {

    const { t } = useTranslation('common');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const handleClickLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    const paginatedNews = news.slice(0, currentPage * itemsPerPage);

    return (
        <>
            <Head>
                <title>{t('navigation.news')}</title>
                <meta name='description' content={t('navigation.newsMetaDescription')} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <Header services={services} />
            <main className='mx-auto container min-h-[600px] px-12 md:px-28 lg:px-36 xl:px-52 pb-14 md:pb-16 lg:pb-20'>
                    <Smooth>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-8 md:mt-14'>
                        {t('navigation.news')}
                    </h1>
                    </Smooth>
                    <div className='mt-20'>
                        {paginatedNews && paginatedNews.length > 0 ? (
                            paginatedNews.map((item) => (
                                <div key={item.id}>
                                    <Smooth width='100%'>
                                    <Link
                                    href={`/news/${item.id}`}
                                    className='flex flex-col md:flex-row bg-[#012D30] hover:bg-[#01454A] rounded-2xl overflow-hidden group mb-12'
                                    >
                                        <div className='md:basis-4/12 lg:basis-5/12 h-[255px] relative overflow-hidden'>
                                            <div className='group-hover:hidden duration-100 absolute top-0 left-0 bg-cover bg-center bg-[#012D30] mix-blend-color rounded-2xl w-full h-full z-10' />
                                            <Image
                                            src={item.image}
                                            width={720}
                                            height={500}
                                            alt={item.translations[0].title}
                                            className='w-full h-full rounded-2xl object-cover object-center'
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col justify-between p-8 md:p-10'>
                                            <div className='text-lg md:text-xl xl:text-2xl font-medium'>
                                                {item.translations[0].title}
                                            </div>
                                            <div className='flex flex-col md:flex-row md:justify-between mt-4 md:mt-0'>
                                                <div className='text-sm xl:text-base text-[#95A9AA]'>
                                                    {format(new Date(item.date_created), "dd.MM.yyyy")}
                                                </div>
                                                <div className='flex mt-10 md:mt-0'>
                                                    <div className='flex gap-x-2 whitespace-nowrap border-b border-solid border-[#95A9AA] pb-0.5 group'>
                                                        <span className='text-sm xl:text-base text-[#95A9AA] group-hover:text-[#E7ED52] duration-100 font-medium'>
                                                            {t('content.openNews')}
                                                        </span>
                                                        <span className='relative -top-1'>
                                                            <FiArrowUpRight size={20} color='#95A9AA' />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    </Smooth>
                                </div>
                            ))
                        ) : (
                            <Smooth width='100%'>
                                <p>
                                    {t('content.newsIsEmpty')}
                                </p>
                            </Smooth>
                        )}
                        {news.length > paginatedNews.length && (
                            <Smooth width='100%'>
                            <div className='my-24'>
                                <button
                                type='button'
                                onClick={handleClickLoadMore}
                                className='text-lg font-semibold uppercase border border-solid boredr-[#C5C5C5] hover:bg-[#007780] hover:border-[#007780] duration-100 rounded-full px-8 py-4'
                                >
                                    {t('content.loadMore')}
                                </button>
                            </div>
                            </Smooth>
                        )}
                    </div>
            </main>
            <Footer data={footer} services={services} />
        </>
    )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const currentLocale = locale || 'ru';

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
                        ],
                    },
                    'image',
                ],
            }),
        );

        updatePictureUrls(news, 'image');

        news.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());

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
        console.error('Error fetching news:', error);
        return {
            notFound: true,
        };
    }
}