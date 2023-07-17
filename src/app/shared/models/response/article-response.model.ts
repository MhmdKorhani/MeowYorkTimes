import { Article } from "../article.model";

export interface ArticleResponse {
    copyright: string;
    response: { docs: Article[]; meta: { hits: number, offset: number }; };
    status: string;
}