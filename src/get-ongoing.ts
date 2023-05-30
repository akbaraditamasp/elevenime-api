import { client } from "./client";
import * as cheerio from "cheerio";

interface OngoingAnime {
  id: string;
  title: string;
  image: string;
  rating: number;
}

export default async function getOngoing(): Promise<OngoingAnime[]> {
  let content: cheerio.CheerioAPI;

  try {
    const response = await client.get("/");
    content = cheerio.load(response.data);
  } catch (e) {
    throw new Error(e);
  }

  const data: cheerio.Cheerio<OngoingAnime> = content(".animposx").map(
    (i, el) => {
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
      } as OngoingAnime;
    }
  );

  return data.toArray();
}
