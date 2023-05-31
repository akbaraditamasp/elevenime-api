import getOngoing from "./get-ongoing";
import getLatest from "./get-latest";
import search from "./search";
import animeInfo from "./anime-info";
import getGenre from "./get-genre";
import getVideo from "./video";

export interface Genre {
  id: string;
  name: string;
}

export interface Episode {
  id: string;
  value: string;
}

export interface Info {
  type: string;
  value: string;
}

export interface Anime {
  id: string;
  title: string;
  image: string;
  rating?: number;
  synopsis?: string;
  categories?: Genre[];
  informations?: Info[];
  episodes?: Episode[];
}

export { getOngoing, getLatest, search, animeInfo, getGenre, getVideo };
