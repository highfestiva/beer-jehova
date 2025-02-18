import products from '../data/products.json'
import { shuffleArray } from './utils';

export const mainCategories = [
  {
    name: 'lager',
    className: 'col-span-2 row-span-2',
    display: 'Lager'
  },
  {
    name: 'stout',
    textClassName: 'text-orange-200',
    display: 'Stout'
  },
  {
    name: 'ale',
    display: 'Ale'
  },
  {
    name: 'ipa',
    className: 'hidden xl:block'
  },
  {
    name: 'weiss',
    className: 'hidden xl:block',
    textClassName: 'bg-white/70',
    display: 'Hvedeøl'
  },
];

export function getProducts(): any[] {
  return shuffleArray(products);
}
