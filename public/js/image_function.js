function sel(n) {
  /* */ if (n == _MAIN) return $('#d_main');
  else if (n == _UP) return $('#d_up');
  else if (n == _LEFT) return $('#d_left');
  else if (n == _DOWN) return $('#d_down');
  else if (n == _RIGHT) return $('#d_right');
}

function setImage(place, img) {
  sel(place)
    .children('.img_photo')
    .attr('src', img.url);
}

function placeImage(img, offset) {
  // console.log(offset.x + ' | ' + offset.y);

  offset.x = offset.x / window.innerWidth * 100;
  offset.y = offset.y / window.innerHeight * 100;

  sel(img).css(
    'transform',
    'translate(' + (-50 - offset.x) + '%,' + (-50 - offset.y) + '%)'
  );
}
function swipeUpImages(dir) {
  var main = $('#d_main')
    .children('.img_photo')
    .attr('src');
  var other = sel(dir)
    .children('.img_photo')
    .attr('src');

  $('#d_main')
    .children('.img_photo')
    .attr('src', other);
  sel(dir)
    .children('.img_photo')
    .attr('src', main);
}

function setTags(t) {
  $('#t_up')
    .children('a')
    .html(t.up.toUpperCase());
  $('#t_left')
    .children('a')
    .html(t.left.toUpperCase());
  $('#t_down')
    .children('a')
    .html(t.down.toUpperCase());
  $('#t_right')
    .children('a')
    .html(t.right.toUpperCase());
}
