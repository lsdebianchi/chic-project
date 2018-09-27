var _UP = 10;
var _DOWN = 20;
var _LEFT = 30;
var _RIGHT = 40;
var _MAIN = 50;

function dir_name(dir) {
  if (dir == _UP) return 'up';
  if (dir == _DOWN) return 'down';
  if (dir == _LEFT) return 'left';
  if (dir == _RIGHT) return 'right';
}
function opposite_dir(dir) {
  if (dir == _UP) return _DOWN;
  if (dir == _DOWN) return _UP;
  if (dir == _LEFT) return _RIGHT;
  if (dir == _RIGHT) return _LEFT;
}
function caps(str) {
  var _str = '';

  for (var i = 0; i < str.length; i++) {
    if (str[i] === 'a') _str += 'A';
    else if (str[i] === 'a') _str += 'A';
    else if (str[i] === 'b') _str += 'B';
    else if (str[i] === 'c') _str += 'C';
    else if (str[i] === 'd') _str += 'D';
    else if (str[i] === 'e') _str += 'E';
    else if (str[i] === 'f') _str += 'F';
    else if (str[i] === 'g') _str += 'G';
    else if (str[i] === 'h') _str += 'H';
    else if (str[i] === 'i') _str += 'I';
    else if (str[i] === 'j') _str += 'J';
    else if (str[i] === 'k') _str += 'K';
    else if (str[i] === 'l') _str += 'L';
    else if (str[i] === 'm') _str += 'M';
    else if (str[i] === 'n') _str += 'N';
    else if (str[i] === 'o') _str += 'O';
    else if (str[i] === 'p') _str += 'P';
    else if (str[i] === 'q') _str += 'Q';
    else if (str[i] === 'r') _str += 'R';
    else if (str[i] === 's') _str += 'S';
    else if (str[i] === 't') _str += 'T';
    else if (str[i] === 'u') _str += 'U';
    else if (str[i] === 'v') _str += 'V';
    else if (str[i] === 'w') _str += 'W';
    else if (str[i] === 'x') _str += 'X';
    else if (str[i] === 'y') _str += 'Y';
    else if (str[i] === 'z') _str += 'Z';
    else _str += str[i];
  }

  return _str;
}

function random_elem(array) {
  var choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
function random_index(array) {
  return Math.floor(Math.random() * array.length);
}
function remove_elem(array, i) {
  array.splice(i, 1);
}
function insert_elem(array, i, elem) {
  array.splice(i, 0, elem);
}
function shuffle_elem(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}
function placeFirst(array, element) {
  var index = array.indexOf(element);
  if (index == -1) {
    console.log("ERROR - they ask me to find '" + element + "' in " + array);
  }
  array.splice(index, 1);
  array.unshift(element);
  return array;
}
function placeLast(array, element) {
  var index = array.indexOf(element);
  if (index == -1) {
    console.log("ERROR - they ask me to find '" + element + "' in " + array);
  }
  array.splice(index, 1);
  array.push(element);
  return array;
}

var Vec = function(x, y) {
  this.x = x;
  this.y = y;
};

Vec.prototype = {
  add: function(v) {
    return new Vec(this.x + v.x, this.y + v.y);
  },

  subtract: function(v) {
    return new Vec(this.x - v.x, this.y - v.y);
  },
};

var DataImg = function(attr) {
  this.url = attr.url;
  this.tags = attr.tags;
  this.index = attr.index;
};

function getTouch(e) {
  return {
    x: e.changedTouches[0].pageX,
    y: e.changedTouches[0].pageY,
  };
}
