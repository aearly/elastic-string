var vector = {
  distance: function (a, b) {
    var dx = a.x - b.x,
      dy = a.y - b.y,
      d = Math.sqrt(dx * dx + dy * dy);
    if (d < 0) {
      throw new Error("wtf math");
    }
    return d;
  },

  normalize: function (a) {
    var d = 1 / vector.distance({x: 0, y: 0}, a);
    a.x *= d;
    a.y *= d;
    return a;
  },

  vector: function (a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y
    };
  },

  add: function (a, b) {
    a.x += b.x;
    a.y += b.y;
    return a;
  },

  mult: function (a, t) {
    a.x *= t;
    a.y *= t;
    return a;
  }
};

module.exports = vector;
