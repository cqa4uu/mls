import { createDirectus } from '@directus/sdk';
import { rest } from '@directus/sdk/rest';


export interface Home {
    status: string;
    translations: HomeTranslations[];
}

export type HomeTranslations = {
    languages_code: string;
    slogan_p1: string;
    slogan_p2?: string;
    advantage: string;
    title: string;
    content: string;
    slogan_in_services: string;
    slogan_in_services_info?: string;
    meta_title: string;
    meta_description?: string;
}

export interface Services {
    id: number;
    slug: string;
    status: string;
    translations: ServicesTranslations[];
    icon: string;
    picture: string;
}

export type ServicesTranslations = {
    languages_code: string;
    title: string;
    short_title: string;
    content: string;
}

export interface Containers {
    id: number;
    status: string;
    category: string;
    translations: ContainersTranslations[];
    capacity?: string;
    dimensions_inside?: string;
    cargo?: string;
    max_weight?: string;
    image: string;
}

export type ContainersTranslations = {
    languages_code: string;
    title: string;
    description: string;
}

export interface About {
    status: string;
    translations: AboutTranslations[];
}

export type AboutTranslations = {
    languages_code: string;
    title: string;
    content: string;
    meta_title: string;
    meta_description?: string;
}

export interface News {
    id: number;
    status: string;
    date_created: string;
    translations: NewsTranslations[];
    image: string;
}

export type NewsTranslations = {
    languages_code: string;
    title: string;
    content: string;
    meta_title: string;
    meta_description?: string;
}

export interface Contacts {
    status: string;
    translations: ContactsTranslations[];
    longitude: string;
    latitude: string;
}

export type ContactsTranslations = {
    languages_code: string;
    location: string;
    phone: string;
    mail: string;
    address: string;
}

export interface Reviews {
    id: number;
    status: string;
    language: string;
    name: string;
    content: string;
    photo: string;
}

export interface Customers {
    id: number;
    status: string;
    selection: boolean;
    company?: string;
    logo?: string;
    translations?: Customerslations[];
}

export type Customerslations = {
    languages_code: string;
    text?: string;
}

export interface Privacy {
    status: string;
    translations: PrivacyTranslations[];
}

export type PrivacyTranslations = {
    languages_code: string;
    title: string;
    content: string;
    meta_title: string;
    meta_description?: string;
}

export interface FooterData {
    translations: FooterDataTranslations[];
}

export type FooterDataTranslations = {
    languages_code: string;
    company: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    link_vk?: string;
    link_telegram?: string;
    link_dzen?: string;
    company_full_name: string;
}

interface Schema {
    home: Home[];
    services: Services[];
    containers: Containers[];
    about: About[];
    news: News[];
    contacts: Contacts[];
    reviews: Reviews[];
    customers: Customers[];
    privacy: Privacy[];
    deep: any[];
    footer: FooterData[];
}

const directusUrl = process.env.DIRECTUS_URL;

if (!directusUrl) {
    throw new Error('The environment variable is not set: DIRECTUS_URL');
}

const directus = createDirectus<Schema>(directusUrl).with(rest());

export default directus;