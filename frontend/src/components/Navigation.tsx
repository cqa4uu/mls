type Navigation = {
    category: string;
    href: string;
    main: boolean;
    footer: boolean;
    current: boolean;
};

export const navigation: Array<Navigation> = [
    {
        category: 'services',
        href: '/services',
        main: true,
        footer: false,
        current: false,
    },
    {
        category: 'containers',
        href: '/containers',
        main: true,
        footer: true,
        current: false,
    },
    {
        category: 'about',
        href: '/about',
        main: true,
        footer: true,
        current: false,
    },
    {
        category: 'news',
        href: '/news',
        main: false,
        footer: true,
        current: false,
    },
    {
        category: 'contacts',
        href: '/contacts',
        main: true,
        footer: true,
        current: false,
    },
];
