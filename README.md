# png-file-stream

Stream a glob list of PNG files as bitmaps.

[![build status](https://secure.travis-ci.org/eugeneware/png-file-stream.png)](http://travis-ci.org/eugeneware/png-file-stream)

Given a glob match specifying a list of PNG images, this will return a readable
stream that will be a Buffer of the raw pixel data. This will be a one dimensional
array of RGBA values.

## Installation

This module is installed via npm:

``` bash
$ npm install png-file-stream
```

## Example Usage

Takes a glob match specifying a list of PNG images, and creates an animated GIF using
[gifencoder](https://github.com/eugeneware/gifencoder).

``` js
var pngFileStream = require('png-file-stream');
var encoder = new GIFEncoder(854, 480);

pngFileStream('test/**/frame?.png')
  .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
  .pipe(fs.createWriteStream('myanimated.gif')));
```

You can skip the PNG to RAW Pixel Data conversion, by passing an optional "false"
value through:

``` js
var pngFileStream = require('png-file-stream');
pngFileStream('test/**/frame?.png', false)
  .pipe(fs.createWriteStream('myconcatendatedpngs.dat')));
```
