const request = require('request-promise');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const path = require('path');

const URL = 'https://www.biqiuge.com';

module.exports = async id => {
  const url = encodeURI(`${URL}/book/${id}/`);
  const result = await request({
    url,
    encoding: null
  });
  const html = iconv.decode(result, 'gbk');
  const $ = cheerio.load(html);

  const name = $('body > div.book > div.info > h2').text();
  const author = $('body > div.book > div.info > div.small > span:nth-child(1)')
    .text()
    .split('：')[1]
    .trim();
  const updatedAt = $('body > div.book > div.info > div.small > span:nth-child(5)')
    .text()
    .split('：')[1]
    .trim();
  const status = $('body > div.book > div.info > div.small > span:nth-child(3)')
    .text()
    .split('：')[1]
    .trim();
  const latestA = $('body > div.book > div.info > div.small > span:nth-child(6) > a');
  const latest = {
    id: path.basename(latestA.attr('href')).split('.')[0],
    name: latestA.text()
  };
  const desc = $('body > div.book > div.info > div.intro')
    .text()
    .split('：')[1]
    .trim();
  const thumb = URL + $('body > div.book > div.info > div.cover > img').attr('src');

  return {
    id,
    name,
    status,
    thumb,
    desc,
    author,
    updatedAt,
    latest,
    chapters: []
  };
};
