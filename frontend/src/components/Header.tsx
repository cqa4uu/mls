import { useRouter } from 'next/router';
import { navigation } from './Navigation';
import { Services } from '@/lib/directus';
import { useTranslation } from 'next-i18next';
import { useState } from 'react'
import { Dialog, Disclosure } from '@headlessui/react'
import { FiX, FiArrowDown, FiArrowUp } from "react-icons/fi";
import { SVGSendARequestRU, SVGSendARequestEN } from './svg/SVGSendARequest';
import LogoAndLangs from './LogoAndLangs';
import CalculateCost from './CalculateCost';
import Link from 'next/link';


export default function Header({ services }: { services: Services[] }) {

    const { t } = useTranslation('common');

    const router = useRouter();
    const locale = router.locale || router.defaultLocale || 'ru';
    const path = router.pathname;
    navigation.forEach(item => {
        item.current = path === item.href;
    });
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    function openMenu() {
        setMobileMenuOpen(true)
    }

    function closeMenu() {
        setMobileMenuOpen(false)
    }

    return (
        <header id='top-of-the-page'>
        <nav className='flex items-center justify-between mx-auto container px-6 lg:px-8 py-16' aria-label='Global'>
            <LogoAndLangs path={path} />
            <div className='hidden lg:flex lg:gap-x-12'>
                {navigation
                .filter((item) => item.main)
                .map((item) => (
                    item.current ? (
                        <span
                        key={item.category}
                        className='border-[#007780] cursor-default text-sm text-[#758687] font-medium uppercase border-b-2 border-solid pb-[0.8rem]'
                        >
                            {t(`navigation.${item.category}`)}
                        </span>
                    ) : (
                        <Link
                        key={item.category}
                        href={item.href}
                        lang={locale}
                        className='border-transparent hover:border-[#00CBD1] text-sm font-medium uppercase border-b-2 border-solid pb-[0.8rem]'
                        >
                            {t(`navigation.${item.category}`)}
                        </Link>
                    )
                ))}
            </div>
            <div className='flex flex-1 justify-end'>
                <div className='relative'>
                    <button
                    type='button'
                    className='btn-menu items-center justify-center text-sm font-medium uppercase hover:border-[#00CBD1]'
                    onClick={openMenu}
                    >
                        {t('navigation.menu')}
                    </button>
                </div>
            </div>
        </nav>
        <Dialog as='div' open={mobileMenuOpen} onClose={closeMenu}>
            <div className='fixed inset-0 z-20' />
            <Dialog.Panel className='fixed inset-0 z-50 w-full h-full overflow-y-auto bg-[#00191B]'>
                <div className='bg-gradient' />
                <div className='mx-auto container px-6 lg:px-8 py-16'>
                    <div className='flex items-center justify-between'>
                        <LogoAndLangs path={path} />
                        <button
                        type='button'
                        className='px-6 md:px-16'
                        onClick={closeMenu}
                        >
                            <div className='border border-solid border-transparent rounded-full p-2 hover:border-[#005056]'>
                                <FiX size={28} color='white' />
                            </div>
                        </button>
                    </div>
                    <div className='max-w-3xl mx-auto mt-24 md:mt-32 px-4 md:px-12'>
                        <div className='flex flex-col md:flex-row md:justify-between gap-y-24 md:gap-y-0 md:gap-x-16'>
                            <div className='md:basis-6/12 space-y-9'>
                                {navigation.map((item) => (
                                    item.category === 'services' ? (
                                        <Disclosure key={item.category} as='div'>
                                            {({ open }) => (
                                                <>
                                                <Disclosure.Button className='flex items-center gap-x-3 group'>
                                                    <div className='text-2xl font-medium uppercase group-hover:text-[#E7ED52]'>
                                                        {t(`navigation.${item.category}`)}
                                                    </div>
                                                    <div className='bg-[#007780] group-hover:bg-[#E7ED52] rounded-full p-2'>
                                                        {open ? (
                                                            <FiArrowUp size={18} color='#00191B' />
                                                        ) : (
                                                            <FiArrowDown size={18} color='#00191B' />
                                                        )}
                                                    </div>
                                                </Disclosure.Button>
                                                <Disclosure.Panel className='mt-6 mb-16 pl-2 space-y-4'>
                                                    {services.map((item) => (
                                                        <div key={item.slug}>
                                                            <Link
                                                                href={`/services?slug=${item.slug}`}
                                                                lang={locale}
                                                                className='text-lg text-[#758687] leading-snug hover:text-[#E7ED52]'
                                                            >
                                                                {item.translations[0].title}
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ) : (
                                        <div key={item.category}>
                                            <Link
                                                href={item.href}
                                                lang={locale}
                                                className='text-2xl font-medium uppercase hover:text-[#E7ED52]'
                                            >
                                                {t(`navigation.${item.category}`)}
                                            </Link>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className='md:basis-6/12 space-y-28 md:space-y-32'>
                                <CalculateCost closeMenu={closeMenu}>
                                    <div className='max-w-[356px]'>
                                        {locale === 'ru' ? (
                                            <SVGSendARequestRU />
                                        ) : (
                                            <SVGSendARequestEN />
                                        )}
                                    </div>
                                </CalculateCost>
                                <div className='space-y-9'>
                                    <div>
                                        <a
                                        href='#'
                                        className='text-2xl font-medium uppercase text-[#758687] hover:text-[#E7ED52]'
                                        >
                                            {t('navigation.login')}
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                        href='#'
                                        className='text-2xl font-medium uppercase text-[#758687] hover:text-[#E7ED52]'
                                        >
                                            {t('navigation.registration')}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
        </header>
    )
}
