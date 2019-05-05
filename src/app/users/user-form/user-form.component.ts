import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Users } from '../users.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent {

  imgPreview: any = 'http://serenityforge.com/template/wordpress/wp-content/uploads/2014/06/facebook-default-no-profile-pic.jpg';

  constructor(public usersService: UsersService) {}

  onSubmitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const userData: Users = {
      _id: null,
      username: form.value.username,
      address: form.value.address,
      contact: form.value.contact,
      email: form.value.email
    };
    this.usersService.addUsers(userData)
      .subscribe((data) => {
        // console.log(data.);
      });
    form.resetForm();
  }

  uploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result;
    };
    reader.readAsDataURL(file);
    // this.usersService.saveImage(file)
    //   .subscribe(data => {
    //     console.log(data);
    //   });
    // console.log(file);
  }
}
