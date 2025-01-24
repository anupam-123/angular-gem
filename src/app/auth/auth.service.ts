import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { firebaseEnv } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  app = initializeApp(firebaseEnv);
  auth = getAuth(this.app);
  createUser(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  constructor() {}
}
