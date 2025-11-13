export const PRODUCT_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
  { label: 'Bisex', value: 'Bisex' },
];

export const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const PRODUCT_COLOR_OPTIONS = [
  '#FF4842',
  '#1890FF',
  '#FFC0CB',
  '#00AB55',
  '#FFC107',
  '#7F00FF',
  '#000000',
  '#FFFFFF',
];

export const PRODUCT_COLOR_NAME_OPTIONS = [
  { label: 'Custom', value: 'Custom' },
  { value: '#FF4842', label: 'Red' },
  { value: '#1890FF', label: 'Blue' },
  { value: '#FFC0CB', label: 'Pink' },
  { value: '#00AB55', label: 'Green' },
  { value: '#FFC107', label: 'Yellow' },
  { value: '#7F00FF', label: 'Violet' },
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' },
];

export const SIZE_GUIDE = {
  Men: {
    Shirts: ['S', 'M', 'L', 'XL'],
    Sneakers: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
  },
  Women: {
    Dresses: ['XS', 'S', 'M', 'L'],
    Heels: ['EU 36', 'EU 37', 'EU 38', 'EU 39'],
  },
  Kids: {
    'T-Shirts': ['2Y', '4Y', '6Y'],
    'Kids Sneakers': ['C6', 'C7', 'C8'],
  },
  Bisex: {
    Hoodies: ['S', 'M', 'L'],
    'Unisex Sneakers': ['UK 6', 'UK 7', 'UK 8'],
  },
};

export const PRODUCT_STOCK_OPTIONS = [
  { value: 'in stock', label: 'In stock' },
  { value: 'low stock', label: 'Low stock' },
  { value: 'out of stock', label: 'Out of stock' },
];

export const PRODUCT_PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather', 'Accessories'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats', 'Apparel'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

export const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];

export const PRODUCT_CATEGORY_OPTIONS_BY_GENDER = {
  Men: {
    Clothes: ['Shirts', 'T-Shirts', 'Jeans', 'Jackets'],
    Shoes: ['Sneakers', 'Boots', 'Loafers'],
  },
  Women: {
    Clothes: ['Dresses', 'Tops', 'Skirts'],
    Shoes: ['Heels', 'Sandals', 'Ballet Flats'],
    Accessories: ['Bags', 'Scarves'],
  },
  Kids: {
    Clothes: ['T-Shirts', 'Shorts', 'Sweaters'],
    Shoes: ['Kids Sneakers', 'Booties'],
  },
  Bisex: {
    Clothes: ['Hoodies', 'Tracksuits'],
    Shoes: ['Unisex Sneakers'],
    Accessories: ['Caps', 'Belts'],
  },
};
