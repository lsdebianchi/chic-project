var waiting = false;

$('#t_down').click(function() {
  myApp.doSwipe(_DOWN);
});
$('#t_left').click(function() {
  myApp.doSwipe(_LEFT);
});
$('#t_right').click(function() {
  myApp.doSwipe(_RIGHT);
});
$('#t_up').click(function() {
  myApp.doSwipe(_UP);
});
var ratioControlTiming = 300;

function shift_down() {
  if (!waiting) {
    waiting = true;
    $('#d_up').css('top', '50%');
    $('#d_main').css('top', '150%');

    controllRatio('#d_up');

    setTimeout(function() {
      swipeUpImages(_UP);
      restore_place('#d_up', '#d_main');
      // setImage(_UP, { url: './img/hg.png' });
      myApp.step();
    }, 600);
  }
}

function shift_right() {
  if (!waiting) {
    waiting = true;
    $('#d_left').css('left', '50%');
    $('#d_main').css('left', '150%');

    controllRatio('#d_left');

    setTimeout(function() {
      swipeUpImages(_LEFT);
      restore_place('#d_left', '#d_main');
      // setImage(_LEFT, { url: './img/hg.png' });
      myApp.step();
    }, 600);
  }
}

function shift_up() {
  if (!waiting) {
    waiting = true;
    $('#d_down').css('top', '50%');
    $('#d_main').css('top', '-50%');

    controllRatio('#d_down');

    setTimeout(function() {
      swipeUpImages(_DOWN);
      restore_place('#d_down', '#d_main');
      // setImage(_DOWN, { url: './img/hg.png' });
      myApp.step();
    }, 600);
  }
}

function shift_left() {
  if (!waiting) {
    waiting = true;
    $('#d_right').css('left', '50%');
    $('#d_main').css('left', '-50%');

    controllRatio('#d_right');

    setTimeout(function() {
      swipeUpImages(_RIGHT);
      restore_place('#d_right', '#d_main');
      // setImage(_RIGHT, { url: './img/hg.png' });
      myApp.step();
    }, 600);
  }
}

function restore_place(name1, name2) {
  $(name1 + ',' + name2).css('transition', '0s');
  var p = get_place(name1);
  $(name1).css('left', p[0]);
  $(name1).css('top', p[1]);

  p = get_place(name2);
  $(name2).css('left', p[0]);
  $(name2).css('top', p[1]);
  setTimeout(
    function() {
      $(name1 + ',' + name2).css('transition', '0.5s');
      waiting = false;
    }.bind(this),
    100
  );
}

function openSmoothing(state) {
  if (state) $('#d_main').css('transition', '0.5s');
  else $('#d_main').css('transition', '0s');
}

function get_place(name) {
  if (name == '#d_up') return ['50%', '-50%'];
  if (name == '#d_down') return ['50%', '150%'];
  if (name == '#d_left') return ['-50%', '50%'];
  if (name == '#d_right') return ['150%', '50%'];
  if (name == '#d_main') return ['50%', '50%'];
}
