import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input()
  private rating: number = 0;

  private stars: boolean[];

  @Input()
  private readonly: boolean = true;

  @Output()
  private  ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  clickStar(index: number) {console.log(3);
    if (!this.readonly) {
      this.rating = index + 1;
      console.log(3);
      this.ratingChange.emit(this.rating);
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

}
