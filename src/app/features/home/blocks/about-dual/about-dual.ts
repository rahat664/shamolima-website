import { Component } from '@angular/core';
import {fadeIn} from '../../../../shared/animation';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-about-dual',
  imports: [
    RouterLink
  ],
  templateUrl: './about-dual.html',
  styleUrl: './about-dual.scss',
  animations: [fadeIn]
})
export class AboutDual {

}
