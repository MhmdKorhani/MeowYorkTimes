import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [
    NgStyle
  ]
})
export class PostComponent {

  @Input() title!: string;
  @Input() img?: string;
  @Input() index!: number;
  @Output() postClicked = new EventEmitter<number>();

  seeDetails() {
    this.postClicked.emit(this.index);
  }
}
