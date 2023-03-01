import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent {

  constructor(private location: Location) 
  {}

  backClicked() {
    this.location.back();
  }
}
