module.exports = async id => {
  const url = encodeURI(`https://www.biquge.com.cn/book/${id}`);
  const result = await request({
    url,
    encoding: null
  });
  const html = iconv.decode(result, 'utf8');
  const $ = cheerio.load(html);

  const info = $('#info');
  const name = info.find('h1').text();
  const author = info.find('p:nth-child(2)').text();
  const updatedAt = info.find('p:nth-child(4)').text();
  const status = info.find('p:nth-child(3)').text();
  const latestA = info.find('p:nth-child(5) > a');
  const latest = {
    id: path.basename(latestA.attr('href')).split('.')[0],
    name: latestA.text()
  };
  const desc = $('#intro > p:nth-child(1)').text;
  const thumb = $('#fmimg > img').attr('src');

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
