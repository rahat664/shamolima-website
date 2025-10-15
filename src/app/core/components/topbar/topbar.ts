import { Component } from '@angular/core';
import {fadeIn} from '../../../shared/animation';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  animations: [fadeIn],
  styleUrl: './topbar.scss'
})
export class Topbar {

}
