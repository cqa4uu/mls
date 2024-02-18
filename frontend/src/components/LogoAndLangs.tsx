import { useRouter } from 'next/router';
import { SVGLogo } from './svg/SVGLogo';
import Link from 'next/link'

type Props = {
    path: string;
}

export default function LogoAndLangs(props: Props) {

    const { path } = props;
    const router = useRouter();
    const { locale, locales } = router;
    const isHomePage = router.pathname === '/' || router.pathname === '/en';
    
    let homeHref = null;
    switch ( locale ) {
        case 'ru':
            homeHref = '/';
            break;
        case 'en':
            homeHref = '/' + locale;
            break;
        default:
            homeHref = '/';
    }

    if (!locales) {
        return null;
    }

    return (
        <div className='flex lg:flex-1 gap-x-4'>
            {isHomePage ? (
                <span className='block p-1.5'>
                    <SVGLogo />
                </span>
            ) : (
                <a href={homeHref} className='block p-1.5'>
                    <SVGLogo />
                </a>
            )}
            <div className='flex flex-col gap-y-1 items-center justify-center'>
                {locales.map((lang) => (
                    lang === locale ? (
                        <span
                        key={lang}
                        className='block text-sm uppercase text-[#758687] cursor-default'
                        >
                            {lang}
                        </span>
                    ) : (
                        <Link
                        key={lang}
                        href={{
                            pathname: path,
                            query: router.query,
                          }}
                        locale= {lang}
                        className='block text-sm uppercase hover:text-[#E7ED52]'
                        >
                            {lang}
                        </Link>
                    )
                ))}
            </div>
        </div>
    )
}