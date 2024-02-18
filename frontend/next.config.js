/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

module.exports = {
    output: 'standalone',
    reactStrictMode: true,
    i18n,
    env: {
        DIRECTUS_URL: process.env.DIRECTUS_URL,
    },
    images: {
        domains: [new URL(process.env.DIRECTUS_URL).hostname],
    },
};