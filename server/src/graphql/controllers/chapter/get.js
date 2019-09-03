const request = require('request-promise');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const path = require('path');

const { sourceConfig } = require('../../../config/custom');

const source0 = async (id, bookId) => {
  console.log('GET CHAPTER');
  const URL = sourceConfig['source0'];
  const url = encodeURI(`${URL}/book/${bookId}/${id}.html`);

  const result = await request({
    url,
    encoding: null
  });
  const html = iconv.decode(result, 'gbk');
  const $ = cheerio.load(html, {
    decodeEntities: false
  });

  const name = $('#wrapper > div.book.reader > div.content > h1').text();
  const content = $('#content')
    .html()
    .replace(/https:\/\/www.biqiuge.com\/book\/21506\/14009283.html/g, '')
    .replace(/\<script\>chaptererror\(\)\;\<\/script\>/g, '')
    .replace(/请记住本书首发域名：biqiuge.com。笔趣阁手机版阅读网址：wap.biqiuge.com/g, '');

  return {
    id,
    bookId,
    name,
    content
  };
};

sourceList = {
  source0
};

module.exports = async (id, bookId, { sourceId }) => {
  const result = await sourceList[`source${sourceId}`](id, bookId);
  return result;
};
