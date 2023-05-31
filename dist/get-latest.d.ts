import { Anime } from ".";
interface LatestOptions {
    page?: number;
}
export default function getLatest({ page, }: LatestOptions): Promise<Anime[]>;
export {};
