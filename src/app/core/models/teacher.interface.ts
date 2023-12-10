// Este sería el interface de un teacher normal pero vamos  arecuperar la info de manera global
export interface TeacherInput {
  id: number;
  experience: number;
  class_online: boolean;
  class_in_person: boolean;
  price_hour: number;
  about_me: string;
}

//Este es el interface del teacher completo
export interface TeacherProfile {
  id: number;
  name: string;
  nickname: string;
  date_of_birth: Date;
  status: number;
  photo: string;
  distance: number;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  province: string;
  experience: number;
  class_online: boolean;
  class_in_person: boolean;
  price_hour: number;
  about_me: string;
  subject: string;
  department_name: string;
  rating: number | null;
}
