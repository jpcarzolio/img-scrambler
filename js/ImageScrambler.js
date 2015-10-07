/**
 * ImageScrambler.js
 * 
 * Implementation of an algorithm to scramble and unscramble an image using 
 * a specified integer key. 
 *
 * This method can be thought of as a weak graphical encryption process.
 * 
 * Image dimensions must be multiples of the block size (by default, 8).
 * 
 * @author jpcarzolio
 * 
*/
var ImageScrambler = (function() {

  "use strict";

  /*
   * Creates a randomly shuffled vector (using LCG and the given seed) containing
   * all integers between 0 and n - 1, swapping values and keys if reverse is set
   * to true.
   */ 
  var getScramblerVector = function(n, seed, reverse) {
    var v = [], i;
    for (i = 0; i < n; i++) {
      v[i] = i;
    }
    
    var rnd = new LCG(seed);
    var out = [];
    var max = n - 1;
    var p;
    for (i = 0; i < n; i++) {
      p = rnd.intBetween(0, max);
      out[i] = v[p];
      v[p] = v[max];
      max--;
    }

    
    if (reverse) {
      var out2 = [];
      for (i = 0; i < n; i++) {
        out2[out[i]] = i;
      }
      
      out = out2;
    }
    
    return out;
  };
  
  /**
   * Slices the given image (HTMLCanvasElement) into bxb sized blocks and
   * reorders them according to the specified scrambler vector 
   * (permutation), returning the resulting image.
   */ 
  var processImage = function(img, sv, b) {
    var w = img.width;
    var h = img.height;
    var n = (w * h) / (b * b);
    
    if (n != sv.length) throw new Exception("Invalid scramble vector size");
    
    var imgOut = document.createElement('canvas');
    imgOut.width = img.width;
    imgOut.height = img.height;
    
    var ctx = imgOut.getContext("2d");
    
    for (var i = 0; i < n; i++) {
      var sx = (i * b) % w;
      var sy = Math.floor((i * b) / w) * b;
      var dx = (sv[i] * b) % w;
      var dy = Math.floor((sv[i] * b) / w) * b;
      ctx.drawImage(img, sx, sy, b, b, dx, dy, b, b);
    }
    
    return imgOut;
    
  };
  
  return {
    /** Scrambles (or unscrambles, if reverse is true) the given image using the given key */
    scramble: function(img, seed, reverse) {
      var b = 8;
      var n = (img.width * img.height) / (b * b);
      var sv = getScramblerVector(n, seed, reverse);
      return processImage(img, sv, b);
    },

      
    /** Unscrambles the given image using the given key */
    unscramble: function(img, seed) {
      return ImageScrambler.scramble(img, seed, true);
    }
  };

})();

