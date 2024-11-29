// Интерфейс запроса для фильтрации и сортировки пользователей
export interface UserRequest {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number;  // сколько на странице
  offset?: number;  // страницу
}

// Интерфейс пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string 
  isBlocked: boolean;
  isAdmin: boolean;
  phoneNumber: string;
}
// Интерфейс метаинформации

export interface MetaResponse<T> {
  data: T[]
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }
}
// Интерфейс для обновления прав пользователя
export interface UserRightsUpdate {
  field: 'isAdmin' | 'isBlocked';
  value: boolean;
  // isAdmin: string;
  // isBlocked: string;
}
// Интерфейс для обновления данных пользователяinterface 
export interface UserUpdate {
  username?: string;
  email?: string;
  phoneNumber?: string;
}
