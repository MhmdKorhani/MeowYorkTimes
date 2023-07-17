import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DefaultMaterialModule } from '@core/modules/default-material.module';
import { ApiService } from 'src/app/core/providers/api.service';
import { DateService } from 'src/app/core/providers/date.service';
import { Endpoints } from 'src/app/shared/enums/endpoints.enum';
import { CommentsResponse } from '@shared/models/response/comment-response.model';
import { Comment } from '@shared/models/comment.model';
import { environment } from 'src/environments/environment';
import { CommentComponent } from './comment/comment.component';
import { Story } from '@shared/models/story.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DefaultMaterialModule,
    MatDialogModule,
    CommentComponent
  ]
})
export class StoryComponent implements OnInit {

  loading = true;
  comments!: Comment[];
  story!: Story;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Story,
    public date: DateService,
    private api: ApiService) { }


  ngOnInit(): void {
    this.story = this.data;
    this.getComments();
  }

  async getComments() {
    this.comments = (await firstValueFrom(this.api.get<CommentsResponse>(`${environment.dummyData.dummyJson}/${Endpoints.comments}`))).comments;
    this.loading = false;
  }
}