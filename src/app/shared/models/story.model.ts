import { Multimedia } from "./multimedia.model";

export interface Story {
    abstract: string;
    byline: string;
    des_facet: string[];
    multimedia: Multimedia[];
    item_type: string;
    kicker: string;
    material_type_facet: string;
    published_date: Date;
    section: string;
    short_url: string;
    subsection: string;
    title: string;
}