import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  email: string;
  password: string;

  // Password Field Properties
  showPassword = false;
  showPasswordIcon = faEye;
  hidePasswordIcon = faEyeSlash;

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/", "dashboard"])
    }
  }

  clickSignIn() {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this.authService.SignIn(this.signInForm.value.email, this.signInForm.value.password).then((result) => {
        this.isLoading = false;

        if (result === null) {
          this.router.navigate(["/", "dashboard"]);
          // this.errorMessage = "Sign in successful!";
        } else {
          this.errorMessage = result;
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

  clickForgotPassword() {
    if (this.signInForm.value.email !== '') {
      this.authService.forgotPassword(this.signInForm.value.email).then(() => {
        this.errorMessage = "Password reset email sent!";
      }).catch((error) => {
        this.errorMessage = error;
      });
    }
  }

  clickEnterKey($event) {
    this.clickSignIn();
  }

  /**
   * Toggle the show password icon
   */
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
