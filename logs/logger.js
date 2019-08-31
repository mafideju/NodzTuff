const fs = require('fs');

const log = () => {
  const date = new Date().toLocaleDateString();
  const hour = new Date().toLocaleTimeString();
  return `Accessed at ${date}, ${hour} hours. \n`;
}

fs.appendFileSync('./logs/log101.txt', log());

module.exports = log;