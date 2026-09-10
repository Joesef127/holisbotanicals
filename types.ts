export interface Testimonial {
  id: number;
  productId?: 'prostanone' | 'menoset';
  seedId?: string | null;
  name: string;
  age: number | null;
  location: string | null;
  text: string;
  rating: number;
}

export interface ProductPackage {
  id: string;
  productId?: 'prostanone' | 'menoset';
  name: string;
  containers: number;
  price: number;
  originalPrice?: number | null;
  description: string;
  subtitle?: string | null;
  savings?: number;
  savingsText?: string | null;
  badge?: string | null;
  recommendedFor?: string | null;
  deliveryText?: string | null;
  usageNote?: string | null;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

export enum QuizSeverity {
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE'
}

export interface CartItem {
  packageId: string;
  quantity: number;
}

export interface QuizResult {
  score: number;
  severity: QuizSeverity;
  answers: Record<number, number>; // questionId -> score
}

export type ModalConfig =
  | {
      kind: 'alert';
      title: string;
      message: string;
      confirmLabel?: string;
    }
  | {
      kind: 'confirm';
      title: string;
      message: string;
      confirmLabel?: string;
      cancelLabel?: string;
      destructive?: boolean;
    }
  | {
      kind: 'prompt';
      title: string;
      message?: string;
      placeholder?: string;
      defaultValue?: string;
      confirmLabel?: string;
      cancelLabel?: string;
    }
  | {
      kind: 'share';
      title: string;
      url: string;
    };