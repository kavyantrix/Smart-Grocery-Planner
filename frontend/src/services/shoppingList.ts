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
  getActiveList: () => 
    api.get<ShoppingList>('/shopping-list'),

  createList: (name?: string) => 
    api.post<ShoppingList>('/shopping-list', { name }),

  addItem: (listId: string, name: string, quantity: string) =>
    api.post<ShoppingItem>(`/shopping-list/${listId}/items`, { name, quantity }),

  updateItem: (listId: string, itemId: string, checked: boolean) =>
    api.patch<ShoppingItem>(`/shopping-list/${listId}/items/${itemId}`, { checked }),

  deleteItem: (listId: string, itemId: string) =>
    api.delete(`/shopping-list/${listId}/items/${itemId}`),
};