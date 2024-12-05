import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/authentication/Services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit{
  @Input() show:boolean=false;
 @Input() sidebar:boolean=true;
 @Input() mobile:boolean=false;
 currentpage=2;
 currentRoute:any;

  constructor(private responsive: BreakpointObserver,private auth:AuthenticationService,private router:Router,private route:ActivatedRoute){

  }
  click(){
    this.sidebar=!this.sidebar;
    console.log( this.sidebar)
  }
ngOnInit(){
  this.route.pathFromRoot[1].url.subscribe(val => {
    this.currentRoute=val[0].path
    console.log(this.currentRoute)
  }
    );
}


signout() {
  this.auth.signOut();
  this.router.navigate(['sign-in']);
  localStorage.clear();
}
}
