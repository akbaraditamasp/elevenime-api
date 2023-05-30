import { Cheerio, CheerioAPI, load } from "cheerio";
import { client } from "./client";

interface LatestAnime {
  id: string;
  title: string;
  image: string;
}

export default async function getLatest(): Promise<LatestAnime[]> {
  let content: CheerioAPI;

  try {
    const response = await client.get("/anime-terbaru");
    content = load(response.data);
  } catch (e) {
    throw new Error(e);
  }

  const data: Cheerio<LatestAnime> = content("#content li").map((i, el) => {
    const id = content(el)
      .find("a")
      .first()
      .attr("href")
      .match(/https:\/\/samehadaku\.day\/(.*)\//);

    return {
      id: id[1],
      title: content(el).find(".entry-title").text().trim(),
      image: content(el).find(".anmsa").attr("src"),
    };
  });

  return data.toArray();
}
