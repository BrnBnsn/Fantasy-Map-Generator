"use strict";
// FMG utils related to numbers

// round value to d decimals
function rn(v, d = 0) {
  const m = Math.pow(10, d);
  return Math.round(v * m) / m;
}

function minmax(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// return value in range [0, 100]
function lim(v) {
  return minmax(v, 0, 100);
}

// normalization function
function normalize(val, min, max) {
  return minmax((val - min) / (max - min), 0, 1);
}

// distance between two points
function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}