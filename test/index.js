var expect = require('expect.js'),
    pngFileStream = require('..');

describe('png-file-stream', function() {
  it('should be able to stream png files', function(done) {
    var rs = pngFileStream('test/**/*.png');
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
});
