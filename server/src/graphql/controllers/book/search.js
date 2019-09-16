const request = require('request-promise');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const path = require('path');

module.exports = async keyword => {
  const url = encodeURI(`https://www.biquge.com.cn/search.php?keyword=${keyword}`);
  const result = await request({
    url,
    encoding: null
  });

  const html = iconv.decode(result, 'utf8');
  const $ = cheerio.load(html);

  const resultList = $('body > div.result-list')
    .children()
    .toArray();

  const books = resultList.map(o => {
    const div = $(o);
    const id = path.basename(div.find('a.result-game-item-pic-link').attr('href'));
    const name = div
      .find('a.result-game-item-title-link')
      .children()
      .eq(0)
      .text();
    const category = div.find('div.result-game-item-info > p:nth-child(2) > span:nth-child(2)').text();
    const thumb = div.find('img.result-game-item-pic-link-img').attr('src');
    const desc = div
      .find('p.result-game-item-desc')
      .text()
      .trim();
    const author = div
      .find('div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)')
      .text()
      .trim();
    const updatedAt = div
      .find('div.result-game-item-detail > div > p:nth-child(3) > span:nth-child(2)')
      .text()
      .trim();
    const latest = {
      id: path.basename(
        div
          .find('div.result-game-item-detail > div > p:nth-child(4) > a')
          .attr('href')
          .trim(),
        '.html'
      ),
      bookId: id,
      name: div
        .find('div.result-game-item-detail > div > p:nth-child(4) > a')
        .text()
        .trim()
    };

    const result = {
      id,
      name,
      category,
      thumb,
      desc,
      author,
      updatedAt,
      latest,
      chapters: []
    };

    return result;
  });

  return books;
};

// TODO add page navigation
