import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const inter = Inter({ 
    subsets: ['cyrillic']
});

const App = ({ Component, pageProps }: AppProps) => {

    const router = useRouter();
    const locale = router.locale || router.defaultLocale || 'ru';

    return (
        <>
            <style jsx global>{`
                html, body {
                font-family: ${inter.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} locale={locale} />
        </>
    );
};

export default appWithTranslation(App);
