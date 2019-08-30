const fs = require('fs');
const server = require('http');
const PORT = 8763;

const log = () => {
  const date = new Date().toLocaleDateString();
  const hour = new Date().toLocaleTimeString();
  return `Accessed at ${date}, ${hour} hours. \n`;
}
fs.appendFileSync('logs/log101.txt', log());

server
  .createServer((req, res) => {
    res.end(`Servidor Ativo na Porta ${PORT}.`);
  }).listen(PORT, () => {
    console.log(`Servidor Ativo na Porta ${PORT}.`)
  });