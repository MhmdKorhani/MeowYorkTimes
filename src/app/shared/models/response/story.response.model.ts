import { Story } from "../story.model";


export interface StoryResponse {
    num_results: number;
    results: Story[];
    status: string;
}