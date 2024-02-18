import { Fragment, useRef, useState, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FormEvent } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';


interface ReviewProps {
    children: ReactNode;
    closeMenu?: () => void;
}

export default function Review(props: ReviewProps) {

    const { t } = useTranslation('common');

    const router = useRouter();
    const locale = router.locale || router.defaultLocale || 'ru';

    const [reviewOpen, setReviewOpen] = useState(false);
    function openReview() {
        setReviewOpen(true);
    }
    function closeReview() {
        setReviewOpen(false);
    }

    const cancelButtonRef = useRef(null)
    
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>('');

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        formData.append('formType', 'review');
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            setFormErrors([]);
            setSuccessMessage(t('form.success'));
            setTimeout(() => {
                closeReview();
                setSuccessMessage('');
            }, 3000);
        } else {
            const { code } = data.errors || {};

            switch (code) {
                case 'FORM_VALIDATION_ERROR':
                    setFormErrors([t('form.validation')]);
                    break;
                case 'INTERNAL_SERVER_ERROR':
                    setFormErrors([t('form.internal')]);
                    break;
                default:
                    setFormErrors([t('form.default')]);
                    break;
            }
        }
    }

    return (
        <>
            <div
            role="button"
            tabIndex={0}
            className="outline-none cursor-pointer"
            onClick={openReview}
            >
                {props.children}
            </div>
            <Transition.Root show={reviewOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setReviewOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-[#00191B] bg-opacity-90 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-[#012D30] text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="p-6">
                            <div className='flex justify-between gap-x-14'>
                                <Dialog.Title as="div" className="text-lg md:text-xl font-semibold uppercase">
                                    {t('content.reviewBtn')}
                                </Dialog.Title>
                                <button
                                        type="button"
                                        className="relative text-base hover:bg-[#007780] border border-solid border-white hover:border-[#007780] rounded-full p-2"
                                        onClick={closeReview}
                                        ref={cancelButtonRef}
                                    >
                                    <FiX size={18} color='white' />
                                </button>
                            </div>
                            <form
                            onSubmit={onSubmit}
                            className={successMessage.length > 0 ? 'hidden' : ''}
                            >
                                <div className="mt-8">
                                    <div>
                                        <label htmlFor="cb-name" className="block text-sm">
                                            {t('content.name')}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="name"
                                            id="cb-name"
                                            placeholder={t('content.namePl')}
                                            required
                                            className="block w-full bg-transparent border-b border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-10'>
                                        <label htmlFor="cb-review" className="block text-sm">
                                            {t('content.review')}
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                            name="review"
                                            id="cb-review"
                                            placeholder={t('content.reviewPl')}
                                            required
                                            className="block w-full bg-transparent border border-solid border-white focus:border-[#00CBD1] py-3 px-6 text-base text-white placeholder:text-[#65878A] outline-none"
                                            rows={5}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center md:gap-x-10 mt-10">
                                    <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    type="submit"
                                    className="relative text-base text-[#303030] font-bold uppercase bg-[#E7ED52] rounded-md px-6 py-5"
                                    >
                                        {t('content.submit')}
                                    </motion.button>
                                    <div className='text-sm leading-relaxed mt-6 md:mt-0'>
                                        {t('content.fieldsRequired')}.
                                        <div className='text-[#65878A]'>
                                            {t('content.accept')}:<br />
                                            <Link
                                            href="/privacy"
                                            lang={locale}
                                            target='_blank'
                                            className='underline underline-offset-4 text-[#65878A] hover:text-white duration-100'
                                            >
                                                {t('content.privacy')}
                                            </Link>.
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {formErrors.length > 0 && (
                                <div className="mt-8 text-red-400">
                                {formErrors.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                                </div>
                            )}
                            {successMessage.length > 0 && (
                                <div className="mt-8 text-green-400">
                                    {successMessage}
                                </div>
                            )}
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition.Root>
        </>
    )
}
