import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private route: Router) { }

  logout() {
    localStorage.setItem('loggedin', 'false');
    window.location.href = 'login';
  }
}
