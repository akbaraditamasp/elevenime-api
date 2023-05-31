import { Cheerio, CheerioAPI, load } from "cheerio";
import { client } from "./client";
import { Anime } from ".";

interface GenreOptions {
  page?: number;
  id: string;
}

export default async function getGenre({
  page = 1,
  id,
}: GenreOptions): Promise<Anime[]> {
  let content: CheerioAPI;

  try {
    let url = `/genre/${id}`;
    if (page !== 1) {
      url = `/genre/${id}/page/${page}`;
    }

    const response = await client.get(url);

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

    return {
      id: id[1],
      title: content(el).find(".title").text().trim(),
      image: content(el).find(".anmsa").attr("src"),
      rating: Number(content(el).find(".score").text()),
    } as Anime;
  });

  return data.toArray();
}
