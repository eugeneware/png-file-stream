var gs = require('glob-stream'),
    fs = require('fs'),
    through = require('through2'),
    png = require('png-js');

module.exports = function (glob) {
  return gs.create(glob).pipe(through({ objectMode: true }, write));
  function write(chunk, enc, next) {
    var self = this;
    png.decode(chunk.path, function(pixels) {
      self.push(pixels);
      next();
    });
  }
};
