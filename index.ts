import request from "request-promise";
import cheerio from "cheerio";
import fs from "fs";

async function scrape() {
  //   "https://paris.craigslist.org/search/jjj?s=0";
  for (let i = 0; i < 240; i = i + 120) {
    const html = fs.readFileSync(`./page${i}.html`);
    const $ = await cheerio.load(html);
    $(".result-heading")
      .children()
      .each((i, e) => {
        console.log($(e).text());
      });
    console.log("At page number " + i / 120);
  }
}

scrape();
