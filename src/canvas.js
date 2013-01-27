var
  _ = require("lodash"),
  $ = require("jquery");


module.exports = function () {
  var
    canvas = $("#weighted-string"),
    ctx = canvas[0].getContext("2d"),

    resizeCanvas =function () {
      canvas.css({
        "width": window.innerWidth,
        "height": window.innerHeight
      });
    },

    setup = function () {

    },

    draw = function () {},

    process = function () {};

  resizeCanvas();
  $(window).resize(resizeCanvas);
};
