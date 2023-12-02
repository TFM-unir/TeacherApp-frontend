import { Teacher } from './teacher.interface';
import { User } from './user.interface';
import { Location } from './location.interface';
import { Subject } from './subject.interface';

export interface UserRegister {
  userForm: User;
  teacherForm: Teacher;
  locationForm: Location;
  subjectsForm: Subject[];
}
