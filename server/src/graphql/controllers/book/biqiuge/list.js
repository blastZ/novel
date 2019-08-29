const request = require('request-promise');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const path = require('path');

const URL = 'https://www.biqiuge.com';

module.exports = async ctx => {
  const data = await ctx.db.collection('topBooks').findOne({
    from: 'biqiuge',
    createdAt: {
      $gt: Date.now() - 24 * 3600 * 1000
    }
  });

  if (data) {
    return data.topBooks;
  }

  const topBooks = await crawler();

  await ctx.db.collection('topBooks').insertOne({
    from: 'biqiuge',
    topBooks: topBooks,
    createdAt: Date.now()
  });

  return topBooks;
};

const crawler = async () => {
  const url = URL;
  const result = await request({
    url,
    encoding: null
  });

  const html = iconv.decode(result, 'gbk');
  const $ = cheerio.load(html);
  const wrap = $('body').children('.wrap');
  const typebds = wrap.children('.type');

  const filter = block => {
    const category = block.find('h2').text();

    const $top = block.find('.top');
    const $list = block.find('ul');

    const top = {
      id: path.basename($top.find('a').attr('href')),
      name: $top.find('img').attr('alt'),
      thumb: url + $top.find('img').attr('src'),
      desc: $top.find('dd').text()
    };

    const list = $list
      .children('li')
      .map((index, ele) => {
        const name = $(ele)
          .children('a')
          .text();
        const author = path.basename($(ele).text());
        const id = path.basename(
          $(ele)
            .children('a')
            .attr('href')
        );
        return {
          name,
          author,
          id
        };
      })
      .get();

    return {
      category,
      top,
      list
    };
  };

  const blockList = typebds
    .find('.block')
    .map((index, ele) => {
      return filter($(ele));
    })
    .get();

  return blockList;
};
