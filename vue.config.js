/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');

// Generate pages object
const pages = {};

function getEntryFile(entryPath) {
  const files = fs.readdirSync(entryPath);
  return files;
}

const chromeName = getEntryFile(path.resolve('src/entry'));

function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
}
chromeName.forEach((name) => {
  const fileExtension = getFileExtension(name);
  const fileName = name.replace(`.${fileExtension}`, '');
  pages[fileName] = {
    entry: `src/entry/${name}`,
    template: 'public/index.html',
    filename: `${fileName}.html`,
  };
});

const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
  pages,
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    plugins: [
      new CopyPlugin([
        {
          from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
          to: `${path.resolve('dist')}/manifest.json`,
        },
        {
          from: path.resolve('public/'),
          to: `${path.resolve('dist')}/`,
        },
      ]),
    ],
    devtool: isDevMode ? 'inline-source-map' : false,
  },
  css: {
    extract: false, // Make sure the css is the same
  },
};
