import { Multimedia } from "./multimedia.model";

export interface Article {
    abstract: string;
    byline: { organization: string; original: string; };
    document_type: string;
    headline: { main: string };
    keywords: { name: string, value: string }[];
    lead_paragraph: string;
    multimedia: Multimedia[];
    pub_date: string;
}