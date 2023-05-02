const fs = require('fs');

module.exports = function getWebpackEntry() {
  const entry = {};
  const pageNameList = fs.readdirSync('./src/js/pages');

  pageNameList.forEach((pageName) => {
    entry[pageName] = `./src/js/pages/${pageName}/main.js`;
  });

  return entry;
};
