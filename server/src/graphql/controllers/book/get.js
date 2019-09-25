const request = require('request-promise');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const path = require('path');

const { sourceConfig } = require('../../../config/custom');

const source0 = async (id, db) => {
  const book = await db.collection('book').findOne({
    bookId: id
  });

  if (book) {
    return book.book;
  }

  const URL = sourceConfig['source0'];
  const url = encodeURI(`${URL}/book/${id}/`);

  const result = await request({
    url,
    encoding: null
  });
  const html = iconv.decode(result, 'gbk');
  const $ = cheerio.load(html);

  const name = $('body > div.book > div.info > h2').text();
  const category = $('body > div.book > div.info > div.small > span:nth-child(2)')
    .text()
    .split('：')[1]
    .trim(0);
  const status = $('body > div.book > div.info > div.small > span:nth-child(3)')
    .text()
    .split('：')[1]
    .trim();
  const thumb = URL + $('body > div.book > div.info > div.cover > img').attr('src');
  const desc = $('body > div.book > div.info > div.intro')
    .text()
    .split('：')[1]
    .trim()
    .slice(0, -2)
    .replace(/[\t\n\d\s]/g, '');
  const author = $('body > div.book > div.info > div.small > span:nth-child(1)')
    .text()
    .split('：')[1]
    .trim();
  const updatedAt = $('body > div.book > div.info > div.small > span:nth-child(5)')
    .text()
    .split('：')[1]
    .trim();
  const latestA = $('body > div.book > div.info > div.small > span:nth-child(6) > a');
  const latest = {
    id: path.basename(latestA.attr('href'), '.html'),
    name: latestA.text()
  };
  const chapters = $('body > div.listmain > dl')
    .children('dd')
    .toArray()
    .map(o => {
      const aTag = $(o)
        .children()
        .first();
      const chapterId = path.basename(aTag.attr('href'), '.html');
      const chapterName = aTag.text();
      return {
        id: chapterId,
        bookId: id,
        name: chapterName
      };
    })
    .slice(6);

  const data = {
    id,
    name,
    category,
    status,
    thumb,
    desc,
    author,
    updatedAt,
    latest,
    chapters
  };

  await db.collection('book').insertOne({
    bookId: id,
    book: data
  });

  return data;
};

const sourceList = {
  source0
};

module.exports = async (id, { sourceId }, db) => {
  const result = await sourceList[`source${sourceId}`](id, db);
  return result;
};
