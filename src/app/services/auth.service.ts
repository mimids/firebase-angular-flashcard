import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from '@angular/fire/auth';

import { Account, Role } from '../core/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:Account = {email:'',password:'',roles:Role.User};

  constructor(private auth:Auth,private api: ApiService,) { }


}
