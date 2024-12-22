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
