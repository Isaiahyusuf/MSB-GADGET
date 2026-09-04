export type Listing = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  price: number;
  location: string;
  condition: string | null;
  status: string;
  featured: boolean;
  quantity: number;
  brand: string | null;
  model: string | null;
  storage: string | null;
  year: number | null;
  mileage: number | null;
  transmission: string | null;
  fuelType: string | null;
  propertySize: string | null;
  titleDocument: string | null;
  images: { id: string; url: string }[];
  createdAt: string | Date;
};

export type CartItem = Pick<Listing, "id" | "title" | "price" | "quantity" | "type" | "images"> & {
  cartQuantity: number;
};