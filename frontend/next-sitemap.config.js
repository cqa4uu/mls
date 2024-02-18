/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.SITE_URL,
    changefreq: 'daily',
    priority: 0.7,
    generateIndexSitemap: false,
    generateRobotsTxt: true,
}