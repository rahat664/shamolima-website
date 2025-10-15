import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {fadeIn} from '../../../../shared/animation';

@Component({
  selector: 'app-blog-teasers',
  imports: [
    RouterLink
  ],
  templateUrl: './blog-teasers.html',
  styleUrl: './blog-teasers.scss',
  animations: [fadeIn]
})
export class BlogTeasers {

}
