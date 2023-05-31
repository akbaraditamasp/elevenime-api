import { Anime } from ".";
interface GenreOptions {
    page?: number;
    id: string;
}
export default function getGenre({ page, id, }: GenreOptions): Promise<Anime[]>;
export {};
