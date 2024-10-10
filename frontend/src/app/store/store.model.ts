export interface Product {
  id: string;
  image: {
    src: string;
    alt: string;
  };
  rating: string;
  details: {
    title: string;
    price: string;
    description: string;
    colors: string[]
  };
  amount: number;
}
