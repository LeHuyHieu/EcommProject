export interface SignUp {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  email: String;
  password: String;
}

export interface product {
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  id: number;
  quantity: undefined | number;
  productId: undefined | number;
}

export interface cart {
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  id: number | undefined;
  quantity: undefined | number;
  userId: number;
  productId: number;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  adress: string;
  phone: string;
  payments: string;
  totalPrice: number;
  userId: number;
  id: number | undefined;
}
