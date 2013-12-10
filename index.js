var gs = require('glob-stream'),
    fs = require('fs'),
    through = require('through2'),
    png = require('png-js');

module.exports = function (glob, decode) {
  var write = decodeFiles;
  if (decode === false) {
    write = passthru;
  }

  return gs.create(glob).pipe(through({ objectMode: true }, write));

  function decodeFiles(chunk, enc, next) {
    var self = this;
    png.decode(chunk.path, function(pixels) {
      self.push(pixels);
      next();
    });
  }

  function passthru(chunk, enc, next) {
    var self = this;
    fs.createReadStream(chunk.path)
      .on('data', function (data) {
        self.push(data);
      })
      .on('end', next);
  }
};
