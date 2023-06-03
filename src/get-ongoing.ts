import { Cheerio, CheerioAPI, load } from "cheerio";
import { client } from "./client";
import { Anime } from ".";

export default async function getOngoing(): Promise<Anime[]> {
  let content: CheerioAPI;

  try {
    const response = await client.get("/");
    content = load(response.data);
  } catch (e) {
    throw new Error(e);
  }

  const data: Cheerio<Anime> = content(".animposx").map((i, el) => {
    const id = content(el)
      .find("a")
      .first()
      .attr("href")
      .match(/https:\/\/samehadaku\.day\/anime\/(.*)\//);

    if (!id) {
      return null;
    }

    return {
      id: id[1],
      title: content(el).find(".title").text().trim(),
      image: content(el).find(".anmsa").attr("src"),
      rating: Number(content(el).find(".score").text()),
    } as Anime;
  });

  return data.toArray();
}
