import { useState, ReactNode, Fragment } from 'react';
import { Dialog, Tab, Listbox, Transition } from '@headlessui/react';
import { motion } from "framer-motion";
import LogoAndLangs from './LogoAndLangs';
import { FiChevronDown, FiCheck, FiPlus, FiX } from "react-icons/fi";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';


interface CalculateCostProps {
    children: ReactNode;
    closeMenu?: () => void;
}

const cargoType = [
    { name: 'Оборудование' },
    { name: 'Тип 2' },
    { name: 'Тип 3' },
    { name: 'Тип 4' },
    { name: 'Тип 5' },
    { name: 'Тип 6' },
]

export default function CalculateCost(props: CalculateCostProps) {

    const { t } = useTranslation('common');

    const router = useRouter();
    const path = router.pathname;

    const [modalOpen, setModalOpen] = useState(false);
    
    function openModal() {
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false);
        if (props.closeMenu) {
            props.closeMenu();
        }
    }

    const [selected, setSelected] = useState(cargoType[0]);

    const [routeList, setRouteList] = useState([{ id: 1 }, { id: 2 }]);
    const handleAddRoute = () => {
        setRouteList([...routeList, { id: routeList.length + 1 }]);
    };
    const handleRemoveLastRoute = () => {
        if (routeList.length > 2) {
            const updatedRouteList = [...routeList];
            updatedRouteList.pop();
            setRouteList(updatedRouteList);
        }
    };

    return (
        <>
        <div
        role="button"
        tabIndex={0}
        className="outline-none cursor-pointer"
        onClick={openModal}
        >
            {props.children}
        </div>
        <Dialog as='div' open={modalOpen} onClose={setModalOpen}>
            <div className='fixed inset-0 z-20' />
            <Dialog.Panel className='fixed inset-0 z-50 w-full h-full overflow-y-auto bg-[#00191B]'>
                <div className='bg-gradient' />
                <div className='mx-auto container px-6 lg:px-8 py-16'>
                    <div className='flex items-center justify-between'>
                        <LogoAndLangs path={path} />
                        <button
                        type='button'
                        className='px-6 md:px-16'
                        onClick={closeModal}
                        >
                            <div className='border border-solid border-transparent rounded-full p-2 hover:border-[#005056]'>
                                <FiX size={28} color='white' />
                            </div>
                        </button>
                    </div>
                    <div className='max-w-4xl mx-auto mt-24 md:mt-28 px-4 md:px-12 pb-28'>
                        <div className='text-5xl font-bold'>
                            {t('calculateCost.title')}
                        </div>
                        <div className='mt-14'>
                            <Tab.Group>
                                <Tab.List>
                                    <div className='flex flex-wrap gap-4'>
                                        <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                            className={
                                                selected ? 'text-base font-semibold text-white border-2 border-solid border-[#C5C5C5] rounded-full py-3 px-8 cursor-default duration-100 outline-0' : 'text-base font-semibold text-white border border-solid border-[#C5C5C5] hover:border-[#007780] hover:bg-[#007780] rounded-full py-3 px-8 opacity-40 hover:opacity-100 duration-100 outline-0'
                                            }
                                            >
                                                {t('calculateCost.val1')}
                                            </button>
                                        )}
                                        </Tab>
                                        <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                            className={
                                                selected ? 'text-base font-semibold text-white border-2 border-solid border-[#C5C5C5] rounded-full py-3 px-8 cursor-default duration-100 outline-0' : 'text-base font-semibold text-white border border-solid border-[#C5C5C5] hover:border-[#007780] hover:bg-[#007780] rounded-full py-3 px-8 opacity-40 hover:opacity-100 duration-100 outline-0'
                                            }
                                            >
                                                {t('calculateCost.val2')}
                                            </button>
                                        )}
                                        </Tab>
                                        <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                            className={
                                                selected ? 'text-base font-semibold text-white border-2 border-solid border-[#C5C5C5] rounded-full py-3 px-8 cursor-default duration-100 outline-0' : 'text-base font-semibold text-white border border-solid border-[#C5C5C5] hover:border-[#007780] hover:bg-[#007780] rounded-full py-3 px-8 opacity-40 hover:opacity-100 duration-100 outline-0'
                                            }
                                            >
                                                {t('calculateCost.val3')}
                                            </button>
                                        )}
                                        </Tab>
                                    </div>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="where-from" className="block text-sm text-[#3F5557]">
                                                    {t('calculateCost.from')}
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                    type="text"
                                                    name="where-from"
                                                    id="where-from"
                                                    placeholder={t('calculateCost.fromPl')}
                                                    className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="where" className="block text-sm text-[#3F5557]">
                                                    {t('calculateCost.to')}
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                    type="text"
                                                    name="where"
                                                    id="where"
                                                    placeholder={t('calculateCost.toPl')}
                                                    className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm text-[#3F5557]">
                                                    {t('calculateCost.cargoType')}
                                                </label>
                                                <div className="mt-2">
                                                <Listbox value={selected} onChange={setSelected}>
                                                    <div className="relative">
                                                    <Listbox.Button className="block w-full bg-transparent border-b-2 border-solid border-white py-3 text-base text-white text-left outline-none">
                                                        <span className="block truncate">{selected.name}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                                            <FiChevronDown size={22} color='white' />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute max-h-60 w-full overflow-auto bg-[#007780] text-base text-white z-10">
                                                        {cargoType.map((type) => (
                                                            <Listbox.Option
                                                            key={type.name}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-3 pl-10 pr-4 ${
                                                                active ? 'bg-[#00373C]' : ''
                                                                }`
                                                            }
                                                            value={type}
                                                            >
                                                            {({ selected }) => (
                                                                <>
                                                                <span
                                                                className={`block truncate ${
                                                                selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                                >
                                                                    {type.name}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                    <FiCheck size={18} color='white' />
                                                                    </span>
                                                                ) : null}
                                                                </>
                                                            )}
                                                            </Listbox.Option>
                                                        ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                    </div>
                                                </Listbox>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="contacts" className="block text-sm text-[#3F5557]">
                                                    {t('calculateCost.contacts')}
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                    type="text"
                                                    name="contacts"
                                                    id="contacts"
                                                    placeholder='+7 000 00-00-000 / mail@domain.ru'
                                                    className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='relative mt-20'>
                                            <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            type='submit'
                                            className='relative text-base text-[#303030] font-bold bg-[#E7ED52] rounded-full px-6 py-3'
                                            >
                                                {t('content.sendRequest')}
                                            </motion.button>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        {routeList.map((route) => (
                                            <div
                                            key={route.id}
                                            className='bg-[#00363b] rounded first:mt-24 mt-8 px-6 pt-6'
                                            >
                                                <div className='text-lg uppercase'>
                                                    {`${t('form.route')} №${route.id}`}
                                                </div>
                                                <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-6">
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor={`where-from-${route.id}`} className="block text-sm text-[#3F5557]">
                                                            {t('calculateCost.from')}
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            type="text"
                                                            name={`where-from-${route.id}`}
                                                            id={`where-from-${route.id}`}
                                                            placeholder={t('calculateCost.fromPl')}
                                                            className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor={`where-${route.id}`} className="block text-sm text-[#3F5557]">
                                                            {t('calculateCost.to')}
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            type="text"
                                                            name={`where-${route.id}`}
                                                            id={`where-${route.id}`}
                                                            placeholder={t('calculateCost.toPl')}
                                                            className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='flex gap-10 justify-center mt-10'>
                                            <div>
                                                <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                type='button'
                                                onClick={handleAddRoute}
                                                className='relative text-wtite font-bold bg-[#007780] rounded-full px-6 py-2'
                                                >
                                                    <FiPlus size='22' />
                                                </motion.button>
                                            </div>
                                            <div>
                                                <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                type='button'
                                                onClick={handleRemoveLastRoute}
                                                className='relative text-wtite font-bold bg-[#007780] rounded-full px-6 py-2'
                                                >
                                                    <FiX size='22' />
                                                </motion.button>
                                            </div>
                                        </div>
                                        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm text-[#3F5557]">
                                                        {t('calculateCost.cargoType')}
                                                    </label>
                                                    <div className="mt-2">
                                                    <Listbox value={selected} onChange={setSelected}>
                                                        <div className="relative">
                                                        <Listbox.Button className="block w-full bg-transparent border-b-2 border-solid border-white py-3 text-base text-white text-left outline-none">
                                                            <span className="block truncate">{selected.name}</span>
                                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                                                <FiChevronDown size={22} color='white' />
                                                            </span>
                                                        </Listbox.Button>
                                                        <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options className="absolute max-h-60 w-full overflow-auto bg-[#007780] text-base text-white z-10">
                                                            {cargoType.map((type) => (
                                                                <Listbox.Option
                                                                key={type.name}
                                                                className={({ active }) =>
                                                                    `relative cursor-default select-none py-3 pl-10 pr-4 ${
                                                                    active ? 'bg-[#00373C]' : ''
                                                                    }`
                                                                }
                                                                value={type}
                                                                >
                                                                {({ selected }) => (
                                                                    <>
                                                                    <span
                                                                    className={`block truncate ${
                                                                    selected ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                                    >
                                                                        {type.name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <FiCheck size={18} color='white' />
                                                                        </span>
                                                                    ) : null}
                                                                    </>
                                                                )}
                                                                </Listbox.Option>
                                                            ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                        </div>
                                                    </Listbox>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="contacts" className="block text-sm text-[#3F5557]">
                                                        {t('calculateCost.contacts')}
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                        type="text"
                                                        name="contacts"
                                                        id="contacts"
                                                        placeholder='+7 000 00-00-000 / mail@domain.ru'
                                                        className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        <div className='relative mt-20'>
                                            <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            type='submit'
                                            className='relative text-base text-[#303030] font-bold bg-[#E7ED52] rounded-full px-6 py-3'
                                            >
                                                {t('content.sendRequest')}
                                            </motion.button>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="where-from" className="block text-sm text-[#3F5557]">
                                                    {t('calculateCost.from')}
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                    type="text"
                                                    name="where-from"
                                                    id="where-from"
                                                    placeholder={t('calculateCost.fromPl')}
                                                    className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="where" className="block text-sm text-[#3F5557]">
                                                    {t('calculateCost.to')}
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                    type="text"
                                                    name="where"
                                                    id="where"
                                                    placeholder={t('calculateCost.toPl')}
                                                    className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label className="block text-sm text-[#3F5557]">
                                                    {t('calculateCost.cargoType')}
                                                </label>
                                                <div className="mt-2">
                                                <Listbox value={selected} onChange={setSelected}>
                                                    <div className="relative">
                                                    <Listbox.Button className="block w-full bg-transparent border-b-2 border-solid border-white py-3 text-base text-white text-left outline-none">
                                                        <span className="block truncate">{selected.name}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                                            <FiChevronDown size={22} color='white' />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute max-h-60 w-full overflow-auto bg-[#007780] text-base text-white z-10">
                                                        {cargoType.map((type) => (
                                                            <Listbox.Option
                                                            key={type.name}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-3 pl-10 pr-4 ${
                                                                active ? 'bg-[#00373C]' : ''
                                                                }`
                                                            }
                                                            value={type}
                                                            >
                                                            {({ selected }) => (
                                                                <>
                                                                <span
                                                                className={`block truncate ${
                                                                selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                                >
                                                                    {type.name}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                    <FiCheck size={18} color='white' />
                                                                    </span>
                                                                ) : null}
                                                                </>
                                                            )}
                                                            </Listbox.Option>
                                                        ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                    </div>
                                                </Listbox>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3">
                                                <label htmlFor="contacts" className="block text-sm text-[#3F5557]">
                                                    {t('calculateCost.contacts')}
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                    type="text"
                                                    name="contacts"
                                                    id="contacts"
                                                    placeholder='+7 000 00-00-000 / mail@domain.ru'
                                                    className="block w-full bg-transparent border-b-2 border-solid border-white focus:border-[#00CBD1] py-3 text-base text-white placeholder:text-[#65878A] outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='relative mt-20'>
                                            <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            type='submit'
                                            className='relative text-base text-[#303030] font-bold bg-[#E7ED52] rounded-full px-6 py-3'
                                            >
                                                {t('content.sendRequest')}
                                            </motion.button>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
        </>
    );
}
