import { api } from '@/lib/axios';

export interface GroceryRecommendation {
  items: {
    name: string;
    quantity: string;
    reason: string;
    category: string;
  }[];
  suggestions: string[];
}

export interface GenerateListParams {
  familySize: number;
  dietaryRestrictions: string[];
  preferences: string[];
  budget?: number;
}

export const aiService = {
  generateGroceryList: async (params: GenerateListParams) => {
    return api.post<GroceryRecommendation>('/ai/generate-list', params);
  },

  getGeneratedLists: async () => {
    return api.get('/ai/generated-lists');
  },

  saveGeneratedList: async (data: {
    name: string;
    items: any[];
    suggestions: string[];
  }) => {
    return api.post('/ai/save-list', data);
  },
};