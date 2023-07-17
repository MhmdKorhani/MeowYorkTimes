import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [
    NgStyle
  ]
})
export class PostComponent implements OnInit {

  @Input() title!: string;
  @Input() img?: string;
  @Input() index!: number;
  @Output() postClicked = new EventEmitter<number>();

  seeDetails() {
    this.postClicked.emit(this.index);
  }

  ngOnInit(): void {
    if (!this.img) {
      this.img = environment.dummyData.lorempicsum;
    }
  }
}
