import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  error: any;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              public afAuth: AngularFireAuth,
              private router: Router,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required,
        Validators.pattern(/^([a-zA-Z0-9][a-zA-Z0-9_.+-]{0,63})@([a-zA-Z0-9][a-zA-Z0-9-]{0,253})\.([a-zA-Z0-9-.]{2,6})+$/)]],
      password: ['', [Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_-]{5,16})+$/)]]
    });
  }

  onSubmit(data) {
    if (data.valid) {
      this.afAuth.auth.createUserWithEmailAndPassword(data.value.email, data.value.password).then(
        (success) => {
          this.router.navigate(['/login']);
        }).catch( err => {
        this.error = err;
        this.cdRef.detectChanges();
      });
    }
  }

}
