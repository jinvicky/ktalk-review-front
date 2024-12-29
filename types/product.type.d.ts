export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description?: string;
  thumbnail: string;
  images: string[];
  price: number;
  cartQuantity: number;
}

export interface EventProduct {
  id: string;
  name: string;
  summary: string;
  content: string;
  thumbnail: string;
  price: number;
  quantity: number;
  soldOut: boolean;
}
