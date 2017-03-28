import cheerio from 'cheerio';

export default function readAsDom(htmlString) {
  return cheerio.load(htmlString);
}
