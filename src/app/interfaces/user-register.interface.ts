import { Teacher } from './teacher.interface';
import { User } from './user.interface';
import { Location } from './location.interface';

export interface UserRegister {
  userForm: User;
  teacherForm: Teacher;
  locationForm: Location;
}
