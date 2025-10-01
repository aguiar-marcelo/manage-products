export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  expiration_date: string;
  image: string;
  category: Category;
}

export interface NewProduct {
  name: string;
  desc: string;
  price: number;
  validate: string;
  img: File | null;
  category: Category | null | undefined;
}

export interface Dashboard {
  total_products: number;
  total_categories: number;
  total_products_price: number;
  total_expired_products_price: number;
  products_per_category: {
    name: string;
    product_count: number;
  }[];
}
