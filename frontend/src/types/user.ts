export interface UserSettings {
  autoOrder: boolean;
  deliveryFrequency: 'weekly' | 'biweekly' | 'monthly';
  monthlyBudget: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  familySize?: number;
  settings?: UserSettings;
  dietaryRestrictions?: string[];
  allergies?: string[];
}