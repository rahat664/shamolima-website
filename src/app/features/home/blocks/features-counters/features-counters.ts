import {Component, ElementRef} from '@angular/core';
import {listStagger} from '../../../../shared/animation';
import {animateCount} from '../../../../shared/counter.util';

@Component({
  selector: 'app-features-counters',
  imports: [],
  templateUrl: './features-counters.html',
  styleUrl: './features-counters.scss',
  animations: [listStagger]
})
export class FeaturesCounters {
  constructor(private el: ElementRef) {}
  ngAfterViewInit() {
    const nums = this.el.nativeElement.querySelectorAll('div.text-3xl');
    [250, 1200, 1.8, 12].forEach((val, i) => animateCount(nums[i], Math.round(val)));
  }
}
