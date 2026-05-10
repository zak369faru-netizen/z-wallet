import { clsx, type ClassValue } from 'clsx'; import { twMerge } from 'tailwind-merge';
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export const money = (n:number,c='KWD') => new Intl.NumberFormat('en-KW',{style:'currency',currency:c}).format(n||0);
