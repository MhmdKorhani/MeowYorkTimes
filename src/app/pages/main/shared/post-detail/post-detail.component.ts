import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DefaultMaterialModule } from '@core/modules/default-material.module';
import { CommentComponent } from '../comment/comment.component';
import { Article, Story } from '@shared/models';
import { DateService } from '@core/providers/date.service';
import { ApiService } from '@core/providers/api.service';
import { Comment } from '@shared/models/comment.model';
import { CommentsResponse } from '@shared/models/response';
import { environment } from 'src/environments/environment';
import { Endpoints } from '@shared/enums';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DefaultMaterialModule,
    MatDialogModule,
    CommentComponent
  ]
})
export class PostDetailComponent implements OnInit {

  loading = true;

  abstract!: string;
  title!: string;
  facets!: string[];
  byline!: string;
  publishDate!: Date;
  multimedia?: string | null;

  comments!: Comment[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type: string, value: unknown },
    public date: DateService,
    private api: ApiService) { }

  ngOnInit(): void {
    if (this.data.type == "story") {
      const obj = this.data.value as Story;
      this.title = obj.title;
      this.publishDate = obj.published_date;
      this.abstract = obj.abstract;
      this.byline = obj.byline;
      this.facets = obj.des_facet;
      this.multimedia = obj.multimedia?.length > 0 ? obj.multimedia[0].url : null;
    }
    else {
      const obj = this.data.value as Article;
      this.title = obj.headline.main;
      this.publishDate = obj.pub_date;
      this.abstract = obj.abstract;
      this.byline = obj.byline.original;
      this.facets = [obj.news_desk];
      this.multimedia = obj.multimedia?.length > 0 ? obj.multimedia[0].url : null;
    }
    this.getComments();
  }

  async getComments() {
    const params = new Map<string, string>();
    params.set('limit', (Math.random() * (15 - 1) + 1).toFixed(0).toString());
    this.comments = (await firstValueFrom(this.api.get<CommentsResponse>(`${environment.dummyData.dummyJson}/${Endpoints.comments}`, params))).comments;
    this.loading = false;
  }
}