import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent {
  private usersService = inject(UsersService);
  //private router =

  async ngOnInit() {
    try {
      const user = `{
        userForm: {
          name: 'Juana Alvarez',
          nickname: 'juasdn123',
          email: 'pedesdasd@gmail.com',
          phone: '643434548',
          password: '12345',
          date_of_birth: '1993-02-15',
          status: 2,
          role_id: 2,
          photo: 'url',
        },
        teacherForm: {
          experience: 5,
          class_mode: 'Mañana',
          price_hour: 10.5,
          about_me: 'Soy un soñador brutal con todos los hierros',
        },
        locationForm: {
          latitude: 41.385063,
          longitude: 2.987456,
          address: 'calle de quintal 25',
          city: 'Santiago',
          province: 'A Coruña',
        },
      };`;

      const response = await this.usersService.Register(user);
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
