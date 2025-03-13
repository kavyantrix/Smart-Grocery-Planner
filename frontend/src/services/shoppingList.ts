import { api } from '@/lib/axios';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const shoppingListApi = {
  getAllLists: async () => 
    api.get<ShoppingList[]>('/actions/shopping-list/all'),

  getActiveList: async () => 
    api.get<ShoppingList>('/shopping-list'),

  createList: async (name?: string) => 
    api.post<ShoppingList>('/shopping-list', { name }),

  addItem: async (listId: string, name: string, quantity: string) =>
    api.post<ShoppingItem>(`/shopping-list/${listId}/items`, { name, quantity }),

  addMultipleItems: async (listId: string, items: { name: string; quantity: string }[]) =>
    api.post<ShoppingItem[]>(`ai/shopping-list/${listId}/items/batch`, { items }),

  updateItem: async (listId: string, itemId: string, checked: boolean) =>
    api.patch<ShoppingItem>(`/shopping-list/${listId}/items/${itemId}`, { checked }),

  deleteItem: async (listId: string, itemId: string) =>
    api.delete(`/shopping-list/${listId}/items/${itemId}`),
};