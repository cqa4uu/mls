import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { MdArrowOutward } from "react-icons/md";


interface ParallaxProps {
    children: string;
    baseVelocity: number;
}

export default function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {

    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

  return (
    <div className='flex flex-nowrap overflow-hidden whitespace-nowrap'>
        <motion.div
        style={{ x }}
        className='flex gap-x-10 md:gap-x-16 lg:gap-x-20 flex-nowrap whitespace-nowrap'
        >

            <div className='flex gap-x-2 md:gap-x-4 group'>
                <div className='relative md:-top-2 text-2xl md:text-[3.2rem] lg:text-[4.4rem] xl:text-[6.3rem]'>
                    <MdArrowOutward color='#D9C8A9' />
                </div>
                <div className='text-4xl md:text-[4.8rem] lg:text-[6.2rem] xl:text-[8rem] text-[#D9C8A9] font-bold uppercase whitespace-nowrap leading-normal group-hover:text-white duration-100'>
                    {children}
                </div>
            </div>

            <div className='flex gap-x-2 md:gap-x-4 group'>
                <div className='relative md:-top-2 text-2xl md:text-[3.2rem] lg:text-[4.4rem] xl:text-[6.3rem]'>
                    <MdArrowOutward color='#D9C8A9' />
                </div>
                <div className='text-4xl md:text-[4.8rem] lg:text-[6.2rem] xl:text-[8rem] text-[#D9C8A9] font-bold uppercase whitespace-nowrap leading-normal group-hover:text-white duration-100'>
                    {children}
                </div>
            </div>

            <div className='flex gap-x-2 md:gap-x-4 group'>
                <div className='relative md:-top-2 text-2xl md:text-[3.2rem] lg:text-[4.4rem] xl:text-[6.3rem]'>
                    <MdArrowOutward color='#D9C8A9' />
                </div>
                <div className='text-4xl md:text-[4.8rem] lg:text-[6.2rem] xl:text-[8rem] text-[#D9C8A9] font-bold uppercase whitespace-nowrap leading-normal group-hover:text-white duration-100'>
                    {children}
                </div>
            </div>

            <div className='flex gap-x-2 md:gap-x-4 group'>
                <div className='relative md:-top-2 text-2xl md:text-[3.2rem] lg:text-[4.4rem] xl:text-[6.3rem]'>
                    <MdArrowOutward color='#D9C8A9' />
                </div>
                <div className='text-4xl md:text-[4.8rem] lg:text-[6.2rem] xl:text-[8rem] text-[#D9C8A9] font-bold uppercase whitespace-nowrap leading-normal group-hover:text-white duration-100'>
                    {children}
                </div>
            </div>

        </motion.div>
    </div>
  );
}
