import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface DefaultProps {
    children: JSX.Element;
    width?: 'fit-content' | '100%';
    slide?: boolean;
    sledeBgColor?: string;
};

export const Smooth = ({ children, width = 'fit-content', slide = false, sledeBgColor = '#012D30' }: DefaultProps) => {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if(isInView) {
            mainControls.start('visible');
            if (slide) {
                slideControls.start('visible');
            }
        }
    }, [isInView, slide, mainControls, slideControls]);

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 80 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial='hidden'
                animate={mainControls}
                transition={{ duration: 0.45, delay: 0.25 }}
            >
                {children}
            </motion.div>
            {slide && (
                <motion.div
                    variants={{
                        hidden: { left: 0 },
                        visible: { left: '100%' },
                    }}
                    initial='hidden'
                    animate={slideControls}
                    transition={{ duration: 0.45, ease: 'easeIn' }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: sledeBgColor,
                        borderRadius: '1rem',
                        zIndex: 20,
                    }}
                />
            )}
        </div>
    );
};