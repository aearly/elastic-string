var
  _ = require("lodash"),
  $ = require("jquery"),
  vec = require("./vector");


module.exports = function () {
  var
    canvas = $("#weighted-string"),
    ctx = canvas[0].getContext("2d"),
    width,
    height,
    mouse = {
      x: 0,
      y: 0
    },
    mouseDown = false,
    clickedPoint = null,
    numPoints = 50,
    points = [],
    /* gravity */
    g = 0.1,
    /* coefficient of friction */
    f = 0.02,
    /* spring constant */
    k = 1,
    /* string length */
    length = 200,
    /* stiffness */
    stiffness = 0.001,
    framerate = 120,

    lerp = function (a, b, t) {
      return (1 - t) * a + t * b;
    },

    resizeCanvas = function () {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.css({
        "width": width,
        "height": height
      });

      ctx.canvas.width = width;
      ctx.canvas.height = height;

      draw();
    },

    setup = function () {
      var resetPoint = function () {
          if (clickedPoint) {
            clickedPoint.clicked = false;
            clickedPoint = null;
          }
        };

      _.times(numPoints, function (i) {
        points.push({
          x: lerp(50, 650, i / numPoints),
          y: 200,
          // velocity components
          xv: 0,
          yv: 0,
          clicked: false
        });
      });

      $(canvas).mousemove(function (event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
      });

      $(canvas).mousedown(function () {
        var  nearest = 10000;
        _.each(points, function (point) {
          var d = vec.distance(mouse, point);
          if (d < nearest && d < 100) {
            nearest = d;
            resetPoint();
            point.clicked = true;
            clickedPoint = point;
          }
        });
      });

      $(canvas).mouseup(resetPoint);

      _.delay(process, 1000 / framerate);
    },

    draw = function () {
      ctx.fillStyle = "#333";
      ctx.strokeStyle = "#ccc";
      ctx.lineWidth = 5;
      ctx.lineCap = ctx.lineJoin = "round";

      ctx.clearRect(0, 0, width, height);
      ctx.fillRect(0, 0, width, height);

      ctx.moveTo(points[0].x, points[1].y);
      ctx.beginPath();
      _.each(points, function (p, i) {
        var
          prev = points[i - 1] || p,
          prev2 = points[i - 2] || p,
          next = points[i + 1] || p,
          cp1 = vec.vector(prev2, p),
          cp2 = vec.vector(next, prev);
        cp1 = vec.add(vec.clone(prev), vec.mult(cp1, 0.15));
        cp2 = vec.add(vec.clone(p), vec.mult(cp2, 0.15));

        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, p.x, p.y);
        //ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    },

    process = function () {
      _.delay(process, 1000 / framerate);
      var
        l = length / numPoints,
        i = 0,
        p,
        prev,
        next,
        force = {x: 0, y: 0},

        attract = function (a, b) {
          var d = vec.distance(a, b),
            v = vec.normalize(vec.vector(a, b)),
            f = k * (d - l);
          return vec.mult(v, f);
        };

      for (; i < numPoints; i += 1) {
        p = points[i];
        force.x = force.y = 0;

        if (i > 0 && i < numPoints - 1) {
          prev = points[i - 1];
          next = points[i + 1];
          // elasticity between points
          vec.add(force, attract(p, next));
          vec.add(force, attract(p, prev));
          // tendency for the string to stay straight
          vec.add(force, vec.mult(vec.vector(p, vec.lerp(prev, next, 0.5)), stiffness / l));
          //gravity
          vec.add(force, {x: 0, y: g});

          p.xv += force.x;
          p.yv += force.y;

        }

        if (p.clicked) {
          // attract towards mouse
          force = attract(p, mouse);

          p.xv += force.x;
          p.yv += force.y;

          // more friction
          p.yv *= 0.7;
          p.xv *= 0.7;
        }

        // friction
        p.yv *= (1 - f);
        p.xv *= (1 - f);
      }

      _.each(points, function (p) {
        p.x += p.xv;
        p.y += p.yv;
      });

      draw();
    };

  setup();
  resizeCanvas();
  $(window).resize(resizeCanvas);


};
