import { Bricolage_Grotesque } from 'next/font/google';

export const displayFont = Bricolage_Grotesque({
    subsets: ['latin'],
    axes: ['opsz', 'wdth'],
    display: 'swap',
    variable: '--font-display'
});
