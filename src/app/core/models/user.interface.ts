export interface User {
  id: number;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
  date_of_birth: string;
  status: number;
  role_id: number;
  photo: string;
  address?: string;
}
