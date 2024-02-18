import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import { GetStaticProps } from 'next';
import directus, { Containers, FooterData, Services } from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import { groupBy } from 'lodash';
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Smooth } from '@/components/animation/Smooth';


type GroupedContainers = Record<string, Containers[]>;

function updatePictureUrls(array: any[], field: string): void {
    array.forEach((item) => {
        item[field] = `${process.env.DIRECTUS_URL}assets/${item[field]}`;
    });
}

export default function Containers({ containers, footer, services }: { containers: Containers[], footer: FooterData, services: Services[] }) {
    
    const { t } = useTranslation('common');

    const categoryTranslations: { [key: string]: string } = {
        standard: t('containers.standard'),
        platform: t('containers.platform'),
        opentop: t('containers.opentop'),
        refrigerated: t('containers.refrigerated'),
    };

    const groupedContainers: GroupedContainers = groupBy(containers, 'category');  
    
    return (
        <>
            <Head>
                <title>{t('navigation.containers')}</title>
                <meta name='description' content={t('navigation.containersMetaDescription')} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <Header services={services} />
            <main className='mx-auto container px-12 md:px-28 lg:px-36 xl:px-52 pb-20 md:pb-28 lg:pb-40'>
                    <Smooth>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-8 md:mt-14'>
                        {t('navigation.containers')}
                    </h1>
                    </Smooth>
                    {Object.entries(groupedContainers).map(([category, containers], index) => (
                        <div 
                        key={category}
                        className='mt-16 xl:mt-20'
                        >
                            <Smooth width='100%'>
                            <>
                                <h2 className='text-lg text-[#65878A] font-bold uppercase space-x-3'>
                                    <span className='text-white'>{index + 1 < 10 ? '0' : ''}{index + 1}.</span> 
                                    <span>
                                        {categoryTranslations[category]}
                                    </span>
                                </h2>
                                <div className='mt-6'>
                                    <Swiper
                                    cssMode={true}
                                    spaceBetween={60}
                                    navigation={{
                                        nextEl: '.swiper-btn-next',
                                        prevEl: '.swiper-btn-prev',
                                    }}
                                    pagination={{
                                        clickable: true,
                                        el: '.swiper-pagination-block',
                                    }}
                                    modules={[Navigation, Pagination]}
                                    >
                                        {containers.map(container => (
                                        <SwiperSlide key={container.id}>
                                            <div className='flex items-center bg-[#012D30] min-h-[390px] rounded-lg py-8 md:py-14 px-6 md:px-16'>
                                                <div className='flex flex-col gap-y-14 lg:gap-y-0 lg:flex-row lg:justify-between lg:items-center lg:gap-x-14'>
                                                    <div className='basis-7/12 xl:basis-6/12'>
                                                        <div className='text-base md:text-lg font-medium'>
                                                            {container.translations[0].title}
                                                        </div>

                                                        <table className="table-auto text-[#95A9AA] text-xs md:text-sm mt-6 md:mt-10">
                                                            <tbody>
                                                                <tr>
                                                                    <td className='py-1.5 px-2 md:px-4'>{t('content.capacity')}</td>
                                                                    <td className='py-1.5 px-2 md:px-4'>{container.capacity}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='py-1.5 px-2 md:px-4'>{t('content.dimensionsInside')}</td>
                                                                    <td className='py-1.5 px-2 md:px-4'>{container.dimensions_inside}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='py-1.5 px-2 md:px-4'>{t('content.cCargo')}</td>
                                                                    <td className='py-1.5 px-2 md:px-4'>{container.cargo}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='py-1.5 px-2 md:px-4'>{t('content.maxWeight')}</td>
                                                                    <td className='py-1.5 px-2 md:px-4'>{container.max_weight}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                    <div className='basis-5/12 xl:basis-6/12 overflow-hidden'>
                                                        <Image
                                                        src={container.image}
                                                        width={900}
                                                        height={545}
                                                        alt={container.translations[0].title}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex px-8 md:px-10 py-4 md:py-6'>
                                                <div className='md:basis-7/12 lg:basis-8/12'>
                                                    <div className='text-sm text-[#65878A] text-center min-h-[80px] md:text-left'>
                                                        {container.translations[0].description}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        ))}
                                        <div className='relative'>
                                            <div className='md:absolute md:-top-40 lg:-top-32 md:right-0 z-10 flex justify-center md:justify-end p-4 md:p-6'>
                                                <div className='md:basis-4/12'>
                                                    <div className='flex justify-center items-center gap-x-4 mb-8 md:mb-0 md:mt-4'>
                                                        <button className='swiper-btn-prev'>
                                                            <FiChevronLeft size={44} color='white' />
                                                        </button>
                                                        <div className='swiper-pagination-block' />
                                                        <button className='swiper-btn-next'>
                                                            <FiChevronRight size={44} color='white' />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Swiper>
                                </div>
                            </>
                            </Smooth>
                        </div>
                    ))}
            </main>
            <Footer data={footer} services={services} />
        </>
    )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const currentLocale = locale || 'ru';

        const containers = await directus.request(
            readItems('containers', {
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
                    'category',
                    { 
                        translations: [
                            'title',
                            'description',
                        ],
                    },
                    'capacity',
                    'dimensions_inside',
                    'cargo',
                    'max_weight',
                    'image',
                ],
                limit: -1,
            }),
        );

        updatePictureUrls(containers, 'image');

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

        if (!containers || !footer || !services) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                containers,
                footer,
                services,
                ...await serverSideTranslations(currentLocale, ['common']),
            },
            revalidate: 3600,
        };
        
    } catch (error) {
        console.error('Error fetching Containers:', error);
        return {
            notFound: true,
        };
    }
}