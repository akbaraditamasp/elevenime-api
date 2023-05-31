import { Cheerio, CheerioAPI, load } from "cheerio";
import { client } from "./client";
import { Anime, Episode, Genre, Info } from ".";

export default async function animeInfo(id: string): Promise<Anime> {
  let content: CheerioAPI;

  try {
    const response = await client.get(`/anime/${id}`);
    content = load(response.data);
  } catch (e) {
    throw new Error(e);
  }

  return {
    id,
    title: content("#infoarea .entry-title")
      .text()
      .replace("Nonton Anime ", ""),
    image: content("#infoarea .anmsa").attr("src"),
    rating: Number(content("#infoarea .rtg span[itemprop=ratingValue]").text()),
    synopsis: content("#infoarea .desc .entry-content").text().trim(),
    categories: content("#infoarea .genre-info a")
      .map((i, el) => {
        const id = content(el)
          .attr("href")
          .match(/https:\/\/samehadaku\.day\/genre\/(.*)/);

        return {
          id: id[1],
          name: content(el).text(),
        } as Genre;
      })
      .toArray(),
    informations: content(".infox .spe span")
      .map((i, el) => {
        const type = content(el).find("b").text();
        content(el).find("b").remove();

        return {
          type,
          value: content(el).text().trim(),
        } as Info;
      })
      .toArray(),
    episodes: content(".listeps li")
      .map((i, el) => {
        const id = content(el)
          .find("a")
          .first()
          .attr("href")
          .match(/https:\/\/samehadaku\.day\/(.*)\//);

        return {
          id: id[1],
          value: content(el).find("a").first().text(),
        } as Episode;
      })
      .toArray(),
  };
}
