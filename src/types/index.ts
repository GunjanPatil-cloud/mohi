export interface ChairColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface ChairSpecs {
  mechanism: string;
  lumbar: string;
  armrests: string;
  maxWeight: string;
  warranty: string;
  seatHeight: string;
  reclineRange: string;
  materials: string;
}

export interface Chair {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  category: 'task' | 'active' | 'executive';
  categoryLabel: string;
  colors: ChairColor[];
  description: string;
  idealFor: string;
  highlights: string[];
  specs: ChairSpecs;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}

export interface CartItem {
  cartItemId: string;
  chairId: string;
  name: string;
  price: number;
  selectedColor: string;
  frameFinish: string;
  hasHeadrest: boolean;
  quantity: number;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  chairName: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface QuizAnswers {
  deskHours: string;
  postureGoal: string;
  preferredStyle: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  estimatedDelivery: string;
}
