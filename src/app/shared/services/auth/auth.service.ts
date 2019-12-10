import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/user.interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<IUser>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    this.user$ = this.afAuth.authState;
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    await this.afAuth.auth.signInWithPopup(provider);
    await this.router.navigate(['/home']);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }
}
