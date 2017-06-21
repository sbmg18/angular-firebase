import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyArsUJvFy_fWGbSisngMeXlaH5ed7KhA9I',
      authDomain: 'ng-recipe-book-c5af9.firebaseapp.com'
    });
  }
}
