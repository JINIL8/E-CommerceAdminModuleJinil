import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GaurdService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const loggedin = localStorage.getItem('loggedin');
    console.log(loggedin);
    if (loggedin && loggedin === 'true') {
      return true;
    }
    window.location.href = 'login';
    return false;
  }
}




