import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import("./landing/landing.module").then(m => m.LandingModule) },
  { path: 'articles', loadChildren: () => import("./articles/articles.module").then(m => m.ArticlesModule) },
  { path: 'stories', loadChildren: () => import("./stories/stories.module").then(m => m.StoriesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }