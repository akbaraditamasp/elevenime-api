# Elevenime API

This is Unofficial Samehadaku API, for get anime content from https://samehadaku.day

## Installation

Install via NPM

```bash
npm i elevenime-api
```

## Usage

- Search Anime

```javascript
import { search } from "elevenime-api";

const data = search({ query: "Boruto", page: 1 });

console.log(data);
```

- Get Ongoing Anime

```javascript
import { getOngoing } from "elevenime-api";

const data = getOngoing();

console.log(data);
```

- Get Latest Anime

```javascript
import { getLatest } from "elevenime-api";

const data = getLatest({ page: 1 });

console.log(data);
```

- Get By Genre

```javascript
import { getGenre } from "elevenime-api";

const data = getGenre({ id: "comedy", page: 1 });

console.log(data);
```

- Get Anime Detail

```javascript
import { animeInfo } from "elevenime-api";

const data = animeInfo("adachi-to-shimamura");

console.log(data);
```

- Get Video Embed

```javascript
import { getVideo } from "elevenime-api";

const data = getVideo("isekai-de-cheat-skill-episode-9");

console.log(data);
```
