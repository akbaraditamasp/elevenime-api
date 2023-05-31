import { Anime } from ".";
interface SearchOptions {
    query: string;
    page?: number;
}
export default function search({ query, page, }: SearchOptions): Promise<Anime[]>;
export {};
