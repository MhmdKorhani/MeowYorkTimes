import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class CommentComponent implements OnInit {

  @Input() comment!: Comment;
  avatar!: string;

  ngOnInit(): void {
    this.generateAvatar();
  }

  private generateAvatar() {
    this.avatar = `${environment.dummyData.avatar}/?name=${this.comment.user.username}&background=333&color=fff`;
  }
}
