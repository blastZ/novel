const request = require('request-promise');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const path = require('path');

module.exports = async () => {
  const url = 'https://www.biquge.com.cn';
  const result = await request({
    url,
    encoding: null
  });

  const html = iconv.decode(result, 'gbk');
  const $ = cheerio.load(html);

  return [];
};
