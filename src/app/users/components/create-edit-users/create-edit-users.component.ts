import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-edit-users',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './create-edit-users.component.html',
  styleUrl: './create-edit-users.component.scss'
})
export class CreateEditUsersComponent {
  userForm!: FormGroup;
  isEdit!: boolean;
  constructor(public dialogRef: MatDialogRef<CreateEditUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb :FormBuilder,) {
    this.isEdit = data.isEdit;
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username:['',Validators.required],
      phone:['',Validators.required]
    })

    if (this.isEdit && data.user) {
      this.userForm.patchValue(data.user);
    }
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (!this.isEdit) {
        delete user.id; // Удаляем id, если это создание нового пользователя
      }
      this.dialogRef.close(user);
    }
  }
}
