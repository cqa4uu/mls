import { navigation } from './Navigation';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { FooterData, Services } from '@/lib/directus';
import ScrollLink from "./ScrollLink"
import { motion } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";
import { VK, Telegram, Dzen } from "./svg/SocialNetwork";
import Link from 'next/link';


export default function Footer({ data, services }: { data: FooterData, services: Services[] }) {

    const { 
        company,
        description,
        phone,
        email,
        address,
        link_vk,
        link_telegram,
        link_dzen,
        company_full_name,
    } = data.translations[0];

    const { t } = useTranslation('common');

    const router = useRouter();
    const locale = router.locale || router.defaultLocale || 'ru';

    const todayDate = new Date()
    const currentYear = todayDate.getFullYear()

    return (
        <footer className="p-6">
            <div className="mx-auto max-w-[90rem]">
                <div className="bg-[#005056] rounded-[1.8rem] py-10 md:py-12 lg:py-14 xl:py-20 px-12 md:px-14 lg:px-16 xl:px-24">
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="basis-3/12">
                            <div className="text-2xl lg:text-3xl xl:text-[2.8rem] font-bold">
                                {company}
                            </div>
                            <div className="text-base text-[#84C2C7] max-w-[230px] mt-3 xl:mt-4">
                                {description}
                            </div>
                            <div className="flex flex-col gap-y-3 md:gap-y-4 mt-14 md:mt-20">
                                <motion.div
                                whileHover={{ color: '#E7ED52' }}
                                className="w-fit h-fit"
                                >
                                    <a href={`tel:${phone}`} className="text-lg lg:text-xl uppercase">
                                        {phone}
                                    </a>
                                </motion.div>
                                <motion.div
                                whileHover={{ color: '#E7ED52' }}
                                className="w-fit h-fit"
                                >
                                    <a href={`mailto:${email}`} className="text-lg lg:text-xl uppercase">
                                        {email}
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:basis-7/12 md:pl-14 xl:pl-24 gap-x-8 lg:gap-x-10 xl:gap-x-20 mt-16 md:mt-0">
                            <div>
                                <motion.div
                                whileHover={{ color: '#E7ED52', scale: 1.05 }}
                                >
                                    <Link
                                    href='/services'
                                    lang={locale}
                                    className="block text-sm lg:text-base font-bold uppercase whitespace-nowrap"
                                    >
                                        {t(`navigation.services`)}
                                    </Link>
                                </motion.div>
                            </div>
                            <div className="md:flex-1 space-y-2 mt-6 md:mt-0">
                                {services && services.length > 0 ? (
                                    <>
                                        {services.map((item, index) => (
                                            <div key={item.slug} className="flex gap-x-1">
                                                <span className="block basis-[1.6rem] text-[#007780]">
                                                    {index + 1 < 10 ? '0' : ''}{index + 1}.
                                                </span>
                                                <Link
                                                href={`/services?slug=${item.slug}`}
                                                lang={locale}
                                                className="block text-[#84C2C7] hover:text-[#E7ED52] duration-100"
                                                >
                                                    {item.translations[0].title}
                                                </Link>
                                            </div>
                                        ))}
                                    </>
                                ) : ''}
                            </div>
                        </div>
                        <div className="md:basis-2/12 flex justify-center md:justify-end xl:justify-center mt-16 md:mt-0">
                            <motion.div
                            whileHover={{ y: -2, scale: 1.1 }}
                            className="w-fit h-fit"
                            >
                                <ScrollLink 
                                to="top-of-the-page"
                                className='flex flex-col items-center gap-y-1 lg:gap-y-2'
                                >
                                    <div className="text-xl lg:text-2xl">
                                        <FiChevronUp color='#E7ED52' />
                                    </div>
                                    <div className="text-sm lg:text-base text-[#E7ED52] uppercase">
                                        {t('footer.navBtnText')}
                                    </div>
                                </ScrollLink>
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <div className="md:basis-3/12 pt-16 md:pt-32">
                            <div className="text-sm lg:text-base text-[#84C2C7]">
                                {address}
                            </div>
                        </div>
                        <div className="flex md:basis-7/12 md:pl-14 xl:pl-24 pt-16 md:pt-32">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-6 md:gap-y-2 lg:gap-y-6">
                                {navigation
                                .filter((item) => item.footer)
                                .map((item) => (
                                    <div key={item.category}>
                                        <motion.div
                                        whileHover={{ color: '#E7ED52', scale: 1.05 }}
                                        >
                                            <Link
                                            href={item.href}
                                            lang={locale}
                                            className="block text-sm lg:text-base font-bold uppercase whitespace-nowrap"
                                            >
                                                {t(`navigation.${item.category}`)}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:basis-2/12 pt-20 lg:pt-12">
                            <div className="flex md:flex-col items-end xl:items-center gap-x-5 md:gap-x-0 md:gap-y-5 pr-5 xl:pr-0">
                                
                                <motion.a
                                whileHover={{ scale: 1.05 }}
                                href={link_vk}
                                rel="nofollow"
                                >
                                    <VK />
                                </motion.a>

                                <motion.a
                                whileHover={{ scale: 1.05 }}
                                href={link_telegram}
                                rel="nofollow"
                                >
                                    <Telegram />
                                </motion.a>

                                <motion.a
                                whileHover={{ scale: 1.05 }}
                                href={link_dzen}
                                rel="nofollow"
                                >
                                    <Dzen />
                                </motion.a>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 justify-between border-t border-solid border-[#007780] mt-20 md:mt-24 pt-4">
                        <div className="space-x-4">
                            <span className="text-sm lg:text-base text-[#84C2C7]">
                                © {currentYear}
                            </span>
                            <span className="text-sm lg:text-base text-[#84C2C7]">
                                {company_full_name}
                            </span>
                        </div>
                        <div className="text-sm lg:text-base text-[#84C2C7]">
                            <Link
                            href="/privacy"
                            lang={locale}
                            className="hover:text-[#E7ED52]"
                            >
                                {t('footer.privacy')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
