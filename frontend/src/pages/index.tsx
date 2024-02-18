import Head from 'next/head';
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import CalculateCost from '@/components/CalculateCost';
import directus, { Home, Services, Reviews, Customers, FooterData } from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Callback from '@/components/Callback';
import Review from '@/components/Review';

import Image from 'next/image'
import Link from 'next/link';
import { Ship, Truck, Train, Plane, Warehouse, Insurance, Products, Brokerage } from '@/components/svg/ServiceIcons';
import { SVGPlanetRU, SVGPlanetEN } from '@/components/svg/SVGPlanet';
import { SVGCallbackRU, SVGCallbackEN } from '@/components/svg/SVGCallback';
import { FiArrowRightCircle, FiEdit3 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

import { Smooth } from '@/components/animation/Smooth';
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from 'react';
import ParallaxText from '@/components/animation/ParallaxText';


type IconType = {
    [key: string]: JSX.Element;
};

const mainIconComponents: IconType = {
    Ship: <Ship />,
    Truck: <Truck />,
    Train: <Train />,
    Plane: <Plane />,
    Warehouse: <Warehouse />,
    Insurance: <Insurance />,
    Products: <Products />,
    Brokerage: <Brokerage />,
};

const getMainIconComponents = (icon: string) => {
    const component = mainIconComponents[icon];
    if (!component) {
        console.error(`Неизвестная иконка: ${icon}`);
        return null;
    }
    return component;
};

const iconComponents: IconType = {
    Ship: <Ship circleColor='#FFFFFF' />,
    Truck: <Truck circleColor='#FFFFFF' />,
    Train: <Train circleColor='#FFFFFF' />,
    Plane: <Plane circleColor='#FFFFFF' />,
    Warehouse: <Warehouse circleColor='#FFFFFF' />,
    Insurance: <Insurance circleColor='#FFFFFF' />,
    Products: <Products circleColor='#FFFFFF' />,
    Brokerage: <Brokerage circleColor='#FFFFFF' />,
};

const getIconComponent = (icon: string) => {
    const component = iconComponents[icon];
    if (!component) {
      console.error(`Неизвестная иконка: ${icon}`);
      return null;
    }
    return component;
};


export default function Home({ home, services, reviews, customers, footer }: { home: Home, services: Services[], reviews: Reviews[], customers: Customers[], footer: FooterData }) {

    const { t } = useTranslation('common');
    const router = useRouter();
    const locale = router.locale || router.defaultLocale || 'ru';

    const {
        slogan_p1,
        slogan_p2,
        advantage,
        title,
        content,
        slogan_in_services,
        slogan_in_services_info,
        meta_title,
        meta_description,
    } = home.translations[0];

    const groupSize = 4;
    const maxServices = 8;
    const slicedServices = services.slice(0, maxServices);
    const groupedServices = [];

    for (let i = 0; i < slicedServices.length; i += groupSize) {
        const group = slicedServices.slice(i, i + groupSize);
        groupedServices.push(group);
    }
    
    const firstGroup = groupedServices[0];
    const secondGroup = groupedServices[1];

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['0 0.4', '1 1']});
    
    const translateY = useTransform(scrollYProgress, [0, 0.4], [200, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.9], [0.8, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const line = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

    return (
        <>
            <Head>
                <title>{meta_title}</title>
                <meta name='description' content={meta_description} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
            </Head>
            <Header services={services} />
            <main className='mx-auto max-w-[90rem] px-6 lg:px-8'>
                <section ref={ref} className='bg-gradient-to-t from-[#005056] rounded-[1.8rem]'>
                    <div className='mx-auto container px-6 lg:px-8 pt-10 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-28 xl:pb-44'>
                        <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 140,
                            damping: 20,
                            delay: 0.15,
                        }}
                        className='mx-auto max-w-2xl lg:max-w-3xl space-x-5 md:space-x-6 lg:space-x-8 xl:space-x-12 leading-[2.4rem] md:leading-[3.5rem] text-center'
                        >
                            <span className='text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase'>{slogan_p1}</span> <span className='text-sm lg:text-lg xl:text-xl uppercase'>{slogan_p2}</span>
                        </motion.div>
                        <div className='flex flex-col md:flex-row justify-between items-start mt-16 md:mt-20 lg:mt-16'>
                            <div className='md:basis-[140px] lg:basis-[185px] mx-auto'>
                                <div className='flex md:flex-col md:items-center md:gap-y-6 gap-x-4 md:gap-x-0'>
                                    
                                    {firstGroup.map((service) => {
                                        const IconComponent = getMainIconComponents(service.icon);

                                        if (!IconComponent) {
                                            return null;
                                        }

                                        return (
                                            <motion.div
                                            key={service.id}
                                            whileHover={{ scale: 1.1 }}
                                            className='w-[40px] lg:w-[50px] h-[40px] lg:h-[50px]'
                                            >
                                                <Link
                                                href={`/services?slug=${service.slug}`}
                                                lang={locale}
                                                >
                                                    {IconComponent}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}

                                </div>
                            </div>
                            <div className='hidden md:block md:flex-1 md:pl-10 lg:pl-24 pt-12 md:pt-16'>
                                <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 140,
                                    damping: 20,
                                    delay: 0.3,
                                }}
                                className='text-base text-[#758687] max-w-[230px]'
                                dangerouslySetInnerHTML={{ __html: advantage }}
                                />
                            </div>
                            <div className='hidden md:block md:basis-[260px] lg:basis-[332px]'>
                                <div className='w-[260px] lg:w-[332px] h-[224px] lg:h-[287px]'>
                                    {locale === 'ru' ? (
                                        <SVGPlanetRU />
                                    ) : (
                                        <SVGPlanetEN />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='relative h-[360px] md:h-[580px] lg:h-[680px] xl:h-[840px] pointer-events-none'>
                            <div className='flex justify-center items-center absolute top-10 md:-top-14 lg:-top-24 xl:-top-52 z-10'>
                                <motion.div
                                style={{
                                    y: translateY,
                                    scale: scale,
                                    opacity: opacity,
                                }}
                                >
                                <Image 
                                src='/images/home/container.png'
                                width={1280}
                                height={1301}
                                alt={title}
                                />
                                </motion.div>
                            </div>
                            <div className='flex justify-center items-center absolute top-[7.3rem] md:top-[8.5rem] lg:top-40 xl:top-32 -mx-9 md:-mx-10 lg:-mx-14 xl:-mx-24'>
                                <svg className='w-full h-auto' width="1440" height="555" viewBox="0 0 1440 555" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <motion.path
                                    style={{ pathLength: line }} 
                                    d="M-112 508.5C-112 508.5 136.5 230 348.5 246.5C560.5 263 643.5 560 888.5 520.5C1133.5 481 1478 18 1478 18"
                                    stroke="url(#paint0_linear_421_290)"
                                    strokeWidth="60"
                                    />
                                    <defs>
                                        <linearGradient id="paint0_linear_421_290" x1="1328" y1="58.4999" x2="122.5" y2="541" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" stopOpacity="0"/>
                                            <stop offset="0.5" stopColor="white" stopOpacity="0.5"/>
                                            <stop offset="1" stopColor="white" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <Smooth width='100%'>
                        <div className='flex flex-col md:flex-row justify-between gap-x-14 max-w-4xl mx-auto md:px-12 lg:px-16 xl:px-0'>
                            <div className='order-2 md:order-1'>
                                <div className='border-t-2 border-solid border-white w-[100px] mt-14 md:mt-0' />
                                <div className='text-base mt-16 md:mt-24 overflow-hidden' dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                            <div className='flex flex-col justify-between items-end order-1 md:order-2'>
                                <h1 className='text-3xl lg:text-4xl xl:text-5xl font-bold uppercase text-right !leading-tight overflow-hidden'>
                                    {title}
                                </h1>
                                <Link
                                href='/services'
                                lang={locale}
                                className='block mt-6 md:mt-0 group'
                                >
                                    <div className='flex gap-x-2 items-center'>
                                        <div>
                                            <FiArrowRightCircle size={18} color='white' />
                                        </div>
                                        <div className='text-base uppercase underline underline-offset-4 group-hover:text-[#E7ED52]'>
                                            {t('links.containers')}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        </Smooth>
                    </div>
                </section>
                <section className='py-16 lg:py-20'>
                    <div className='mx-auto max-w-[90rem]'>
                        <Smooth width='100%'>
                        <div className='flex flex-col md:flex-row justify-start items-center gap-x-8 lg:gap-x-14 xl:gap-x-24'>
                            <div className='text-4xl md:text-6xl lg:text-[5rem] xl:text-[6.8rem] text-[#00373C] font-bold uppercase order-2 md:order-1 mt-16 md:mt-0'>
                                {t('content.cargo')}
                            </div>
                            <motion.div
                            whileHover={{ rotate: 10 }}
                            className='w-[120px] md:w-[60px] lg:w-[90px] xl:w-[135px] h-[120px] md:h-[60px] lg:h-[90px] xl:h-[135px] order-1 md:order-2'
                            >
                                <Callback>
                                    {locale === 'ru' ? (
                                        <SVGCallbackRU />
                                    ) : (
                                        <SVGCallbackEN />
                                    )}
                                </Callback>
                            </motion.div>
                        </div>
                        </Smooth>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 lg:mt-6'>

                            {firstGroup.map((service) => {
                                const IconComponent = getIconComponent(service.icon);

                                if (!IconComponent) {
                                    return null;
                                }

                                return (
                                    <motion.div
                                    key={service.id}
                                    whileHover={{ scale: 1.05 }}
                                    >
                                        <Link
                                        href={`/services?slug=${service.slug}`}
                                        lang={locale}
                                        className='block'
                                        >
                                            <Smooth width='100%' slide={true} sledeBgColor='#00191B'>
                                                <div className='relative w-full h-[210px] rounded-2xl overflow-hidden'>
                                                    <div className='absolute top-0 left-0 w-full h-full z-0'>
                                                        <Image
                                                        src={service.picture}
                                                        width={640}
                                                        height={400}
                                                        alt={service.translations[0].title}
                                                        className='w-full h-full object-cover object-center'
                                                        />
                                                    </div>
                                                    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6 z-10'>
                                                        <div className='w-[35px] h-[35px]'>
                                                            {IconComponent}
                                                        </div>
                                                        <div className='flex justify-between items-end gap-x-4'>
                                                            <div className='text-lg'>
                                                                {service.translations[0].short_title}
                                                            </div>
                                                            <div className='text-lg'>
                                                                {String(service.id).padStart(2, '0')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Smooth>
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <div className='md:col-span-2'>
                                <Smooth width='100%' slide={true} sledeBgColor='#00191B'>
                                <Tab.Group>
                                    <div className='w-full md:h-[210px] p-6 md:p-4'>
                                        <div className='flex items-center gap-x-6'>
                                            <Tab.List className='flex items-center gap-x-2'>
                                                {reviews
                                                .map((review) => (
                                                    <Tab
                                                    key={review.id}
                                                    as={Fragment}>
                                                        {({ selected }) => (
                                                        <Image
                                                            src={review.photo}
                                                            width={35}
                                                            height={35}
                                                            alt={review.name}
                                                            className={
                                                            selected ? 'border border-solid border-white rounded-full p-0.5 outline-0' : 'border border-solid border-transparent rounded-full p-0.5 hover:scale-110 duration-100 outline-0 cursor-pointer'
                                                            }
                                                        />
                                                        )}
                                                    </Tab>
                                                ))}
                                            </Tab.List>
                                            <div className='text-xs text-[#758687] max-w-[150px]'>
                                                {t('content.reviewInfo')}
                                            </div>
                                        </div>
                                        <Tab.Panels>
                                            {reviews.map((review) => (
                                                <Tab.Panel
                                                key={review.id}
                                                className='min-h-[72px] text-base overflow-hidden mt-4'
                                                >
                                                    {review.content && review.content.length > 185
                                                        ? `${review.content.substring(0, 185)}...`
                                                        : review.content
                                                    }
                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>
                                        <div className='flex items-center gap-x-4 mt-6'>
                                            <div className='flex items-center gap-x-1 border border-solid border-[#758687] rounded-md px-3 pt-1.5 pb-2'>
                                                <div>
                                                    <FaStar size={18} color='#E7ED52' />
                                                </div>
                                                <div className='text-sm relative top-[0.1rem]'>
                                                    5.0
                                                </div>
                                            </div>
                                            <div>
                                                <Review>
                                                    <div className='flex items-center gap-2 hover:bg-[#007780] border border-solid border-white hover:border-[#007780] rounded-md px-3 py-[0.4rem]'>
                                                        <div>
                                                            <FiEdit3 size={18} color='white' />
                                                        </div>
                                                        <div className='text-sm'>
                                                            {t('content.reviewBtn')}
                                                        </div>
                                                    </div>
                                                </Review>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Group>
                                </Smooth>
                            </div>

                            {secondGroup.map((service) => {
                                const IconComponent = getIconComponent(service.icon);

                                if (!IconComponent) {
                                    return null;
                                }

                                return (
                                    <motion.div
                                    key={service.id}
                                    whileHover={{ scale: 1.05 }}
                                    >
                                        <Link
                                        href={`/services?slug=${service.slug}`}
                                        lang={locale}
                                        className='block'
                                        >
                                            <Smooth width='100%' slide={true} sledeBgColor='#00191B'>
                                                <div className='relative w-full h-[210px] rounded-2xl overflow-hidden'>
                                                    <div className='absolute top-0 left-0 w-full h-full z-0'>
                                                        <Image
                                                        src={service.picture}
                                                        width={640}
                                                        height={400}
                                                        alt={service.translations[0].title}
                                                        className='w-full h-full object-cover object-center'
                                                        />
                                                    </div>
                                                    <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-between p-6 z-10'>
                                                        <div className='w-[35px] h-[35px]'>
                                                            {IconComponent}
                                                        </div>
                                                        <div className='flex justify-between items-end gap-x-4'>
                                                            <div className='text-lg'>
                                                                {service.translations[0].short_title}
                                                            </div>
                                                            <div className='text-lg'>
                                                                {String(service.id).padStart(2, '0')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Smooth>
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <div className='md:col-span-2'>
                                <Smooth width='100%' slide={true} sledeBgColor='#00191B'>
                                <div className='flex justify-center items-center w-full md:h-[210px] p-6'>
                                    <div>
                                        <div className='space-x-3'>
                                            <span className='text-2xl xl:text-3xl font-bold uppercase'>
                                                MLS:
                                            </span>
                                            <span className='text-2xl xl:text-3xl font-bold mt-1 md:mt-0'>
                                                {slogan_in_services}
                                            </span>
                                        </div>
                                        <div className='text-base max-w-[380px] mt-6 md:mt-4'>
                                            {slogan_in_services_info}
                                        </div>
                                    </div>
                                </div>
                                </Smooth>
                            </div>

                        </div>
                    </div>
                </section>
                <section className='py-16 md:py-20 lg:py-28'>
                    <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                        <Smooth>
                        <h2 className='text-4xl md:text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem] font-bold uppercase !leading-tight'>
                            <span className='text-[#00373C]'>{t('content.trustUsP1')}</span> {t('content.trustUsP2')}
                        </h2>
                        </Smooth>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12'>
                            
                        {customers.map((item) => {
                            if (!item.selection) {
                                return (
                                    <Smooth key={item.id} width='100%' slide={true}>
                                        <div className='flex justify-center items-center border border-solid border-[#758687] hover:border-[#00CBD1] rounded-2xl w-full h-[140px] p-4'>
                                            <Image
                                                src={item.logo || ''}
                                                width={220}
                                                height={105}
                                                alt={item.company || ''}
                                            />
                                        </div>
                                    </Smooth>
                                );
                            } else {
                                return (
                                    <Smooth key={item.id} width='100%' slide={true}>
                                        <div className='flex justify-center items-center w-full h-[140px] p-4'>
                                            <div className='text-xl text-[#758687] text-center uppercase'>
                                                {item.translations && item.translations[0]
                                                    ? <>{item.translations[0].text}</>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </Smooth>
                                );
                            }
                        })}
                            
                        </div>
                    </div>
                </section>
                <section className='pt-10 md:pt-16 pb-2 xl:pb-8'>
                    <div className='mx-auto max-w-[90rem] overflow-hidden'>
                        <CalculateCost>
                            <ParallaxText baseVelocity={3}>{t('content.sendText')}</ParallaxText>
                        </CalculateCost>
                    </div>
                </section>
            </main>
            <Footer data={footer} services={services} />
        </>
    )
}

const sortByLanguage = (reviews: Reviews[], currentLocale: string) => {
    const sortedReviews = [...reviews];

    sortedReviews.sort((a, b) => {
        if (a.language === currentLocale && b.language !== currentLocale) {
            return -1;
        } else if (b.language === currentLocale && a.language !== currentLocale) {
            return 1;
        }
        
        return 0;
    });

    return sortedReviews;
};

function updatePictureUrls(array: any[], field: string): void {
    array.forEach((item) => {
        item[field] = `${process.env.DIRECTUS_URL}assets/${item[field]}`;
    });
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const currentLocale = locale || 'ru';

        const home = await directus.request(
            readItem('home', 1, {
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
                            'slogan_p1',
                            'slogan_p2',
                            'advantage',
                            'title',
                            'content',
                            'slogan_in_services',
                            'slogan_in_services_info',
                            'meta_title',
                            'meta_description',
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
                    'picture',
                ],
                limit: -1,
            }),
        );

        updatePictureUrls(services, 'picture');

        const reviewsRaw = await directus.request(
            readItems('reviews', {
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
                    'language',
                    'name',
                    'content',
                    'photo',
                ],
                limit: 5,
            }),
        );

        const reviews = sortByLanguage(reviewsRaw, currentLocale);
        updatePictureUrls(reviews, 'photo');

        const customers = await directus.request(
            readItems('customers', {
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
                    'selection',
                    'company',
                    'logo',
                    { 
                        translations: [
                            'text',
                        ],
                    },
                ],
                limit: -1,
            }),
        );

        updatePictureUrls(customers, 'logo');

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

        if (!home || !services || !reviews || !customers || !footer) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                home,
                services,
                reviews,
                customers,
                footer,
                ...await serverSideTranslations(currentLocale, ['common']),
            },
            revalidate: 3600,
        };
        
    } catch (error) {
        console.error('Error fetching Home:', error);
        return {
            notFound: true,
        };
    }
}