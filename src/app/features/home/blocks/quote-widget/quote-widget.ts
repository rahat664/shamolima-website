import { Component } from '@angular/core';
import {fadeIn} from '../../../../shared/animation';

@Component({
  selector: 'app-quote-widget',
  imports: [],
  templateUrl: './quote-widget.html',
  styleUrl: './quote-widget.scss',
  animations: [fadeIn]
})
export class QuoteWidget {

}
