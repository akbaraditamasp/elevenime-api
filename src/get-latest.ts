import { Cheerio, CheerioAPI, load } from "cheerio";
import { client } from "./client";
import { Anime } from ".";

interface LatestOptions {
  page?: number;
}

export default async function getLatest({
  page = 1,
}: LatestOptions): Promise<Anime[]> {
  let content: CheerioAPI;

  try {
    let url: string = "/anime-terbaru";

    if (page !== 1) {
      url = `/anime-terbaru/page/${page}`;
    }

    const response = await client.get(url);
    content = load(response.data);
  } catch (e) {
    throw new Error(e);
  }

  const data: Cheerio<Anime> = content("#content li").map((i, el) => {
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
