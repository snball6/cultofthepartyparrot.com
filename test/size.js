var fs        = require('fs'),
    assert    = require('chai').assert,
    convert   = require('convert-units'),
    imageSize = require('image-size');


describe("gifs", function() {

    it("in HD should weight less than 64KB", function() {
        var parrot_hd_gifs = fs.readdirSync(__dirname + '/../parrots/hd'),
            other_hd_gifs  = fs.readdirSync(__dirname + '/../other/hd');

        parrot_hd_gifs.forEach(function(gif) {
            var size = fs.statSync(__dirname + '/../parrots/hd/' + gif).size;
            assert(size <= convert(64).from('KB').to('B'), gif + " is too big(" + convert(size).from('B').to('KB') + " KB)");
        });

        other_hd_gifs.forEach(function(gif) {
            var size = fs.statSync(__dirname + '/../other/hd/' + gif).size;
            assert(size <= convert(64).from('KB').to('B'), gif + " is too big(" + convert(size).from('B').to('KB') + " KB)");
        });
    });

    it("in SD should weight less than 64KB", function() {
        var parrot_gifs = fs.readdirSync(__dirname + '/../parrots'),
            other_gifs  = fs.readdirSync(__dirname + '/../other');

        parrot_gifs.forEach(function(gif) {
            var size = fs.statSync(__dirname + '/../parrots/' + gif).size;
            assert(size <= convert(64).from('KB').to('B'), gif + " is too big(" + convert(size).from('B').to('KB') + " KB)");
        });

        other_gifs.forEach(function(gif) {
            var size = fs.statSync(__dirname + '/../other/' + gif).size;
            assert(size <= convert(64).from('KB').to('B'), gif + " is too big(" + convert(size).from('B').to('KB') + " KB)");
        });
    });

    it("should never be wider or taller than 128px", function () {
        var parrot_hd_gifs = fs.readdirSync(__dirname + '/../parrots/hd'),
            parrot_gifs    = fs.readdirSync(__dirname + '/../parrots'),
            other_hd_gifs  = fs.readdirSync(__dirname + '/../other/hd'),
            other_gifs     = fs.readdirSync(__dirname + '/../other');

        parrot_gifs.forEach(function(gif) {
          if(gif == "hd") { return; } // Skip the HD directory
          var dimensions = imageSize(__dirname + '/../parrots/' + gif);
          assert(dimensions.width <= 128, gif + " is wider than 128px");
          assert(dimensions.height <= 128, gif + " is taller than 128px");
        });

        parrot_hd_gifs.forEach(function(gif) {
          var dimensions = imageSize(__dirname + '/../parrots/hd/' + gif);
          assert(dimensions.width <= 128, gif + " is wider than 128px");
          assert(dimensions.height <= 128, gif + " is taller than 128px");
        });

        other_gifs.forEach(function(gif) {
          if(gif == "hd") { return; } // Skip the HD directory
          var dimensions = imageSize(__dirname + '/../other/' + gif);
          assert(dimensions.width <= 128, gif + " is wider than 128px");
          assert(dimensions.height <= 128, gif + " is taller than 128px");
        });

        other_hd_gifs.forEach(function(gif) {
          var dimensions = imageSize(__dirname + '/../other/hd/' + gif);
          assert(dimensions.width <= 128, gif + " is wider than 128px");
          assert(dimensions.height <= 128, gif + " is taller than 128px");
        });
    });
});
