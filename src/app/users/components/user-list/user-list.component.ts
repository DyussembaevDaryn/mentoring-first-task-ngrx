import {Component, inject, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {CreateEditUsersComponent} from "../create-edit-users/create-edit-users.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {User} from "../../models/User";
import {addUser, deleteUsers, loadUsers, loadUsersSuccess, updateUser} from "../../../State/users.actions";
import {Store} from "@ngrx/store";
import {selectUsers} from "../../../State/users.selectors";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserCardComponent,
    NgForOf,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  private store = inject(Store)
  public readonly users$ = this.store.select(selectUsers);
  constructor(private matDialog:MatDialog) {}

  ngOnInit() {
    const users = localStorage.getItem('users');
    if (users) {
      this.store.dispatch(loadUsersSuccess({ users: JSON.parse(users) as User[] }));
    } else {
      this.store.dispatch(loadUsers()); // Запрос к API для получения данных
    }
  }


  deleteUsers(id:number) {
    this.store.dispatch(deleteUsers({userId: id}))

  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(CreateEditUsersComponent, {
      width: '500px',
      data: {
        isEdit: false,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(addUser({ user: result }));
      }
    });
  }

  openEditUser(user: User) {
    const dialogRef = this.matDialog.open(CreateEditUsersComponent, {
      width: '500px',
      data: {
        isEdit: true,
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updateUser({ user: result }));
      }
    });
  }

}

