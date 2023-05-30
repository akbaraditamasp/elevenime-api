import { Cheerio, CheerioAPI, load } from "cheerio";
import { client } from "./client";

interface SearchAnime {
  id: string;
  title: string;
  image: string;
  rating: number;
}

export default async function searchAnime(
  query: string
): Promise<SearchAnime[]> {
  let content: CheerioAPI;

  try {
    const response = await client.get("/", {
      params: {
        s: query,
      },
    });
    content = load(response.data);
  } catch (e) {
    throw new Error(e);
  }

  const data: Cheerio<SearchAnime> = content(".animposx").map((i, el) => {
    const id = content(el)
      .find("a")
      .first()
      .attr("href")
      .match(/https:\/\/samehadaku\.day\/anime\/(.*)\//);

    return {
      id: id[1],
      title: content(el).find(".title").text().trim(),
      image: content(el).find(".anmsa").attr("src"),
      rating: Number(content(el).find(".score").text()),
    } as SearchAnime;
  });

  return data.toArray();
}
