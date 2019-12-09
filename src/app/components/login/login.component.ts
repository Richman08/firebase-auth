import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              public afAuth: AngularFireAuth,
              private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
                   Validators.pattern(/^([a-zA-Z0-9][a-zA-Z0-9_.+-]{0,63})@([a-zA-Z0-9][a-zA-Z0-9-]{0,253})\.([a-zA-Z0-9-.]{2,6})+$/)]],
      password: ['', [Validators.required,
                      Validators.pattern(/^([a-zA-Z0-9_-]{5,16})+$/)]]
    });
  }

  onSubmit(data) {
    if (data.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(data.value.email, data.value.password)
        .then(
        (success) => {
          this.router.navigate(['/home']);
        }).catch( err => this.error = err);
    }
  }
}
