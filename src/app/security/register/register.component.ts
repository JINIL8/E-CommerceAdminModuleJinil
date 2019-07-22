import { Component, OnInit } from '@angular/core';
import { User, RegisterService } from 'src/app/service/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: '',
    created_at: new Date().getTime(),
    role: 'user'
  };


  constructor( private service: RegisterService,  private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }
  registerUser() {
    // console.log(this.user);
    this.service.addUser(this.user).then(() => {
      this.toastr.success('User Registered Successfully!!!', 'Registration');
    });
    setTimeout(function() {
      window.location.href = 'login';
      // this.router.navigate(['login']);
    }, 3000 );
  }

}
