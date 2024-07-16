import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../models/User";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input({required:true})user!:User
  @Output()deleteUser = new EventEmitter<number>();
  @Output()editUsers = new EventEmitter<User>();


  userDelete() {
    this.deleteUser.emit(this.user.id)
  }
  userEdit(user: User) {
    this.editUsers.emit(user);
  }
}

