import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@data/interfaces/user.interface';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  // Password Field Properties
  showPassword = false;
  showPasswordIcon = faEye;
  hidePasswordIcon = faEyeSlash;

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/", "dashboard"])
    }    
  }

  clickRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      let newUser: User = {
        id: null,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        phone: null,
        email: this.registerForm.value.email,
      };

      this.authService.signUp(newUser, this.registerForm.value.email, this.registerForm.value.password).then((result) => {
        this.isLoading = false;
        if (result === null) {
          this.router.navigate(["/", "dashboard"]);
        } else {
          console.error(result);
          this.errorMessage = "An error occurred while trying to sign up. Please try again.";
        }
      }).catch((error) => {
        this.isLoading = false;
        this.errorMessage = error;
      });
    }
    else {
      this.errorMessage = "Please fill in all the required fields.";
    }
  }

  clickEnterKey($event) {
    this.clickRegister();
  }

  /**
   * Toggle the show password icon
   */
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
