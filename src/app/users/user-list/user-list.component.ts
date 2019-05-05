import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Users } from '../users.model';
import { NgForOfContext } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  users: Users[] = [];
  userId: any = {};
  imgPreview: any = 'http://serenityforge.com/template/wordpress/wp-content/uploads/2014/06/facebook-default-no-profile-pic.jpg';

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUser()
      .subscribe((data) => {
        // console.log(data, 'getting Users');
        this.users = data.users;
      });
  }

  onDelete(userId: string) {
    this.usersService.deleteUser(userId)
      .subscribe((data) => {
        // console.log(userId);
        this.users = this.users.filter(user => user._id !== userId );
      });
  }

  onUpdate(userId: string) {
    this.usersService.getUserID(userId)
      .subscribe((data) => {
        // console.log(data);
        this.userId = data.users;
        // console.log(this.userId);
      });
  }

  saveUserData(username, address, email, contact, id) {
    const userData = {
          username,
          address,
          email,
          contact
        };
    // console.log(userData, 'asdfghjasdfg');
    this.usersService.saveUser(id, userData)
      .subscribe((data) => {
        console.log(data);
      });
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
