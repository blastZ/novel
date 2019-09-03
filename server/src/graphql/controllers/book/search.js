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

  const resultList = $('body').find('.result-list');

  const filter = item => {
    const itemPic = item.children('.result-game-item-pic');
    const thumb = itemPic.find('img').attr('src');
    const id = path.basename(itemPic.find('a').attr('href'));

    const itemDetail = item.children('.result-game-item-detail');
    const name = itemDetail
      .children('h3')
      .children('a')
      .children('span')
      .text();
    const desc = itemDetail
      .children('p')
      .text()
      .trim();

    const itemInfo = itemDetail.children('.result-game-item-info');
    const author = itemInfo
      .children('p')
      .eq(0)
      .children('span')
      .eq(1)
      .text()
      .trim();
    const category = itemInfo
      .children('p')
      .eq(1)
      .children('span')
      .eq(1)
      .text();
    const updatedAt = itemInfo
      .children('p')
      .eq(2)
      .children('span')
      .eq(1)
      .text();
    const latest = itemInfo
      .children('p')
      .eq(3)
      .children('a');
    const latestName = latest.text().trim();
    const latestId = path
      .basename(latest.attr('href'))
      .trim()
      .split('.')[0];

    return {
      id,
      name,
      desc,
      thumb,
      author,
      category,
      updatedAt,
      latest: {
        id: latestId,
        name: latestName
      }
    };
  };

  const books = resultList.children('.result-item').map((index, ele) => {
    return filter($(ele));
  });

  return books;
};
