import React from 'react';
import { useEffect, useState } from 'react';

interface FooterProps {
    text?: string;
}

const Footer: React.FC<FooterProps> = ({ text }) => {
    const [footerText, setFooterText] = useState<string>('');

    useEffect(() => {
        // Set the text only on client-side to avoid hydration mismatch
        setFooterText(text || process.env.NEXT_PUBLIC_FOOTER_PROPS || '© 2023 Daniel G. Rondón García');
    }, [text]);

    return (
        <footer className="md:fixed relative bottom-0 right-0 p-4 text-sm text-gray-400 w-full text-center md:text-right md:w-auto">
            <p>{footerText}</p>
        </footer>
    );
};

export default Footer;