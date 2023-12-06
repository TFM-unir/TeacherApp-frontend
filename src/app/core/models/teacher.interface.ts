// Este sería el interface de un teacher normal pero vamos  arecuperar la info de manera global
export interface Teacher {
  id: number;
  experience: number;
  class_mode: string;
  price_hour: number;
  about_me: string;
}

//Este es el interface del teacher completo
export interface TeacherProfile {
  name: string;
  nickname: string;
  date_of_birth: Date;
  status: number;
  photo: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  province: string;
  experience: number;
  class_mode: string;
  price_hour: number;
  about_me: string;
  subject: string;
  department_name: string;
}