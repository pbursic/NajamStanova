export class Posts {
  id: number;
  user_id: number;
  status: boolean;
  title: string;
  description: string;
  bills_included: boolean;
  country: string;
  city: string;
  address: string;
  price: number;
  squares: number;
  type: string;
  available_date: Date;
  walkout_date: Date;
  furnished: boolean;
  bed: number;
  room: number;
  pet: boolean;
  parking: boolean;
  images: string[];
}
