const fs = require('fs');
const server = require('http');
const url = require('url');
const logger = require('./logs/logger');
const PORT = 8763;

const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const JSONdata = fs.readFileSync(`${__dirname}/data/data.json`);
const parsedData = JSON.parse(JSONdata);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
}

server
  .createServer((req, res) => {
    logger();

    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });

      res.end(overview.replace('{%PRODUCT_CARDS%}',
        parsedData.map(el => replaceTemplate(card, el)).join('')));

    } else if (pathname === `/product`) {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });

      res.end(replaceTemplate(product, parsedData[query.id]))

    } else if (pathname === '/api') {
      fs.readFile(`data/data.json`, 'utf-8', (err, data) => {
        res.writeHead(200, {
          'Content-type': 'application/json'
        });

        res.end(data)
      });
    } else {
      res.writeHead(404, {
        'Content-type': 'text/html'
      });

      res.end(`<h1>404 >> NOT FOUND <<</h1> \n <h3>Sorry, the page you've requested was not found.<\h3>`)
    };
  }).listen(PORT, () => {
    console.log(`Servidor Ativo na Porta ${PORT}.`);
  });