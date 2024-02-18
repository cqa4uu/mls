import { MouseEvent, ReactNode } from 'react';


interface ScrollLinkProps {
    to: string;
    children: ReactNode;
    className?: string;
}

const ScrollLink = ({ to, children, className }: ScrollLinkProps) => {

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetElement = document.getElementById(to);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    return (
        <a href={`#${to}`} onClick={handleClick} className={className}>
            {children}
        </a>
    );
};

export default ScrollLink;
