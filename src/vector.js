/*
 * Vector arithmetic utilities
 */
function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

var vector = {
  /*
   *
   */
  clone: function (a) {
    return {
      x: a.x,
      y: a.y
    };
  },

  /*
   *
   */
  vector: function (a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y
    };
  },

  /*
   *
   */
  distance: function (a, b) {
    var dx = a.x - b.x,
      dy = a.y - b.y,
      d = Math.sqrt(dx * dx + dy * dy);
    return d;
  },

  /*
   *
   */
  length: function (a) {
    return vector.distance({x: 0, y: 0}, a);
  },

  /*
   *
   */
  normalize: function (a) {
    var d = 1 / vector.distance({x: 0, y: 0}, a);
    if (isNaN(d) || d === Infinity) {
      return a;
    }
    a.x *= d;
    a.y *= d;
    return a;
  },

  /*
   *
   */
  add: function (a, b) {
    a.x += b.x;
    a.y += b.y;
    return a;
  },

  /*
   *
   */
  mult: function (a, t) {
    if (isNaN(t)) {
      return a;
    }
    a.x *= t;
    a.y *= t;
    return a;
  },

  /*
   *
   */
  lerp: function (a, b, t) {

    return {
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t)
    };
  }
};


module.exports = vector;
