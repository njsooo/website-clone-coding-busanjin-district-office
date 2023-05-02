const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function extractFileName(pageNameList) {
  for (let i = 0; i < pageNameList.length; i++) {
    pageNameList[i] = path.parse(pageNameList[i]).name;
  }
  return pageNameList;
}

module.exports = function functiongetHtmlWebpackPluginList() {
  const list = [];
  const pageNameList = extractFileName(fs.readdirSync('./src/html/pages'));

  pageNameList.forEach((pageName) => {
    list.push(
      new HtmlWebpackPlugin({
        template: `./src/html/pages/${pageName}.html`,
        filename: `${pageName}.html`,
        chunks: [`${pageName}`],
        minify: {
          collapseWhitespace: false,
          keepClosingSlash: false,
          removeComments: false,
          removeRedundantAttributes: false,
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributes: false,
          useShortDoctype: false,
        },
      })
    );
  });

  return list;
};
