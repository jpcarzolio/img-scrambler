/**
 * LCG.js - A linear congruential generator implementation
 * 
 * @author jpcarzolio
 */
var LCG = (function() {
  
  "use strict";

  var LCG = function(seed) {
    this.state = seed;
  };
  
  var a = 1664525,
      c = 1013904223,
      m = 4294967296;

  LCG.prototype.rand = function() {
    this.state = (this.state * a + c) % m;
    return this.state / m;
  };
  
  LCG.prototype.intBetween = function(min, max) {
    return min + Math.round(this.rand() * (max - min));
  };

  return LCG;
  
})();
