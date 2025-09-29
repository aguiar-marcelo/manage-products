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
  categorie: Category | null | undefined;
}
