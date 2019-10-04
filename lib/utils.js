const fs = require('fs');

function readJson(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

function getRandomFileFromDir(dirFullPath, callback) {
  fs.readdir(dirFullPath, (err, items) => {
    if (items) {
      const imgFiles = [];
      for (var i = 0; i < items.length; i++) {
        console.log(items[i]);
        if (items[i].indexOf('.png') > 0 || items[i].indexOf('.jpg') > 0) {
          imgFiles.push(items[i]);
        }
      }
      if (imgFiles.length > 0) {
        const randFullPath = dirFullPath + '/' + imgFiles[Math.floor(Math.random() * (imgFiles.length - 1))];
        callback(randFullPath);
      }
    }
  });
}

module.exports = {
  readJson,
  getRandomFileFromDir
};
