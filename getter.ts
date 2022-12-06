import fs from "fs";
import dotenv from "dotenv";
// Worked with request
import puppeteer from "puppeteer";
import request from "request-promise";

// Dotenv
dotenv.config();

async function getHtml(url: string) {
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     executablePath:
  //       "../../../../../../Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  //   });
  //   const page = await browser.newPage();
  //   await page.goto(url, { waitUntil: "networkidle0" });
  //   const html = await page.content();
  //   await browser.close();
  const html = await request.get(
    `http://api.scraperapi.com/?api_key=${process.env.SCRAPE_API_KEY}&url=${url}&render=true`
  );
  return html;
}

function saveHtmlToFile(html: any, index?: number) {
  fs.writeFileSync(`./page${index}.html`, html);
}

async function main() {
  for (let i = 0; i < 240; i = i + 120) {
    const url = `https://paris.craigslist.org/search/jjj?s=${i}`;
    const html: any = await getHtml(url);
    html && saveHtmlToFile(html, i);
  }
}

main();
