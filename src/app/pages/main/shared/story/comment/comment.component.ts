import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '@shared/models/comment.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CommentComponent {

  @Input() comment!: Comment;
  env = environment;

}
