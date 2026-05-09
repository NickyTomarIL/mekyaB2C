import type {CategoryMainItem, CategorySubSection} from '@/screens/Category/categoryScreenTypes';

export const MAIN_CATEGORIES: CategoryMainItem[] = [
  {id: 'mens', label: "Men's Appeals"},
  {id: 'womens', label: "Women's Appeals"},
  {id: 'girls', label: "Girl's Appeals"},
  {id: 'boys', label: "Boy's Appeals"},
  {id: 'summer', label: 'Summer Trends'},
];

const subWomen: CategorySubSection[] = [
  {
    id: 'new-in',
    title: 'New in',
    items: [
      {id: 'w-n1', label: 'Trending Now'},
      {id: 'w-n2', label: 'Latest Arrivals'},
      {id: 'w-n3', label: "Editor's Picks"},
      {id: 'w-n4', label: 'Limited Edition'},
      {id: 'w-n5', label: 'Celebrity Style'},
      {id: 'w-n6', label: 'Seasonal Collection'},
    ],
  },
  {
    id: 'ethnic',
    title: 'Ethnic',
    items: [
      {id: 'w-e1', label: 'Shirts'},
      {id: 'w-e2', label: 'Tshirts'},
      {id: 'w-e3', label: 'Jeans'},
      {id: 'w-e4', label: 'Shirts'},
      {id: 'w-e5', label: 'Tshirts'},
      {id: 'w-e6', label: 'Jeans'},
      {id: 'w-e7', label: 'Shirts'},
      {id: 'w-e8', label: 'Tshirts'},
      {id: 'w-e9', label: 'Jeans'},
    ],
  },
  {
    id: 'western',
    title: 'Western',
    items: [
      {id: 'w-w1', label: 'Shirts'},
      {id: 'w-w2', label: 'Tshirts'},
      {id: 'w-w3', label: 'Jeans'},
      {id: 'w-w4', label: 'Shirts'},
      {id: 'w-w5', label: 'Tshirts'},
      {id: 'w-w6', label: 'Jeans'},
    ],
  },
];

const subGeneric = (prefix: string): CategorySubSection[] => [
  {
    id: `${prefix}-spotlight`,
    title: 'Spotlight',
    items: [
      {id: `${prefix}-s1`, label: 'New Arrivals'},
      {id: `${prefix}-s2`, label: 'Best Sellers'},
      {id: `${prefix}-s3`, label: 'Offers'},
    ],
  },
  {
    id: `${prefix}-tops`,
    title: 'Tops',
    items: [
      {id: `${prefix}-t1`, label: 'Shirts'},
      {id: `${prefix}-t2`, label: 'Tees'},
      {id: `${prefix}-t3`, label: 'Polos'},
      {id: `${prefix}-t4`, label: 'Knitwear'},
    ],
  },
];

export const SUBCATEGORIES_BY_MAIN: Record<string, CategorySubSection[]> = {
  mens: subGeneric('mens'),
  womens: subWomen,
  girls: subGeneric('girls'),
  boys: subGeneric('boys'),
  summer: [
    {
      id: 'summer-edit',
      title: 'Summer Edit',
      items: [
        {id: 'su1', label: 'Linen'},
        {id: 'su2', label: 'Shorts'},
        {id: 'su3', label: 'Sunglasses'},
        {id: 'su4', label: 'Sandals'},
        {id: 'su5', label: 'Caps'},
        {id: 'su6', label: 'Swim'},
      ],
    },
  ],
};
