var expect = require('expect.js'),
    fs = require('fs'),
    path = require('path'),
    concat = require('concat-stream'),
    pngFileStream = require('..');

function fixtures(file) {
  return path.join(__dirname, 'fixtures', file);
}

describe('png-file-stream', function() {
  it('should be able to stream png files as bitmaps', function(done) {
    var rs = pngFileStream('test/**/frame?.png');
    var count = 0;
    rs.on('data', function (data) {
      count++;
      expect(data.length).to.equal(854*480*4);
      expect(data).to.be.a(Buffer);
    });
    rs.on('end', function () {
      expect(count).to.equal(3);
      done();
    });
  });

  it('should be able to stream png files as a png stream', function(done) {
    var rs = pngFileStream('test/**/frame?.png', false);
    var count = 0;
    var length = 0;
    rs.on('data', function (data) {
      count++;
      length += data.length;
      expect(data).to.be.a(Buffer);
    });
    rs.on('end', function () {
      expect(count).to.equal(3);
    });

    rs.pipe(concat(function (data) {
      var expected = fs.readFileSync(fixtures('concat.png'));
      expect(length).to.equal(expected.length);
      expect(expected.toString('hex')).to.equal(data.toString('hex'));
      done();
    }));
  });
});
