
var W = window.innerWidth; //$(window).width();
var H = window.innerHeight; //$(window).height();
var CENTER = new Vec(W / 2, H / 2);

console.log('new shit');

_WAITING = 11;
_MOVEMENT = 13;
_FREEZE = 14;

var App = function() {
  this.data = new database(INPUT);
  this.swipe = {
    direction: 0,
    state: _WAITING,
    origin: undefined,
    buffer1: 10,
    buffer2: 100,
    offset: new Vec(0, 0),
  };

  this.setup();

  this.elem_img = [
    document.getElementById("i_up"),
    document.getElementById("i_left"),
    document.getElementById("i_down"),
    document.getElementById("i_right")
  ];

  this.charged = 0;
  // this.update();
};

App.prototype = {
  // update: function() {
  //   requestAnimationFrame(this.update.bind(this));
  // },

  setup: function() {
    // console.log('current IMG : ' + this.data.current_img.index);

    setImage(_MAIN, this.data.current_img);
    controllRatio();

    this.data.setInitalImages();
    setTags(this.data.tag_direction);
    ///////////
    ///////////
    for (var key in this.data.sequence) {
      // console.log(key + ' : ' + this.data.sequence[key]);
    }
    ///////////
    ///////////
  },

  charging : function(){

    this.charged = 0;

    for (var i = 0; i < this.elem_img.length; i++) {
      if(this.elem_img[i].complete === true) this.charged++;
    }

    if(this.charged < 4){

        setTimeout(function(){
        myApp.charging();
        console.log('tik');
      }, 10);
    }
    else{
      console.log("DONE!");
      $('#d_left').children('.img_photo').css('visibility', 'visible');
      $('#d_up').children('.img_photo').css('visibility', 'visible');
      $('#d_down').children('.img_photo').css('visibility', 'visible');
      $('#d_right').children('.img_photo').css('visibility', 'visible');
    }
  },

  step: function() {
    // console.log('-----STEP-START-----------');

    // console.log('setting new tags');
    setTags(this.data.tag_direction);

    // console.log('setting new images');
    this.data.setNextImages();

    // console.log('-----STEP-END-------------');
    // console.log('> new sequences :');

    for (var key in this.data.sequence) {
      // console.log(key + ' : ' + this.data.sequence[key]);
    }
    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%');
    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%');
  },

  doSwipe: function(d) {
    this.handleEnd();
    placeImage(_MAIN, new Vec(0, 0));

    this.swipe.state = _FREEZE;

    // console.log('going : ' + dir_name(d).toUpperCase());
    if (d == _UP) shift_up();
    if (d == _LEFT) shift_left();
    if (d == _DOWN) shift_down();
    if (d == _RIGHT) shift_right();
    // console.log('---');
    // console.log(
    //   'start MOVEMENT | index : ' +
    //     this.data.sequence_index +
    //     ' | img : ' +
    //     this.data.current_img.index
    // );
    this.data.add_movement(d);
    // console.log(
    //   'finish MOVEMENT | index : ' +
    //     this.data.sequence_index +
    //     ' | img : ' +
    //     this.data.current_img.index
    // );
  },

  /////////////////////////////////////////////////////////TOUCH HANDLES////////

  handleStart: function(e) {
    //e.preventDefault();
    openSmoothing(false);
    var touch = getTouch(e);
    myApp.swipe.origin = new Vec(touch.x, touch.y);
  },
  handleEnd: function(e) {
    openSmoothing(true);
    if (myApp.swipe.state == _MOVEMENT) {
      placeImage(_MAIN, new Vec(0, 0));
    }

    myApp.swipe.offset = new Vec(0, 0);
    myApp.swipe.state = _WAITING;
    myApp.swipe.direction = 0;
  },
  handleCancel: function(e) {},
  handleMove: function(e) {
    var touch = getTouch(e);
    var A = myApp;

    if (A.swipe.state == _WAITING) {
      //check if the touch movement is bigger than the "ignore" buffer"
      if (Math.abs(A.swipe.origin.x - touch.x) > A.swipe.buffer1) {
        if (A.swipe.origin.x > touch.x) A.swipe.direction = _LEFT;
        if (A.swipe.origin.x < touch.x) A.swipe.direction = _RIGHT;
        A.swipe.origin = new Vec(touch.x, touch.y);
        A.swipe.state = _MOVEMENT;
      } else if (Math.abs(A.swipe.origin.y - touch.y) > A.swipe.buffer1) {
        if (A.swipe.origin.y > touch.y) A.swipe.direction = _DOWN;
        if (A.swipe.origin.y < touch.y) A.swipe.direction = _UP;
        A.swipe.origin = new Vec(touch.x, touch.y);
        A.swipe.state = _MOVEMENT;
      }
    } else if (A.swipe.state == _MOVEMENT) {
      //actually move the image along the touch and check if the swipe should be fired
      placeImage(_MAIN, A.swipe.offset);

      if (A.swipe.direction == _DOWN || A.swipe.direction == _UP) {
        A.swipe.offset.y = A.swipe.origin.y - touch.y;
        if (Math.abs(A.swipe.offset.y) > A.swipe.buffer2) {
          A.swipe.state = _WAITING;
          if (A.swipe.offset.y > 0) A.doSwipe(_UP);
          else A.doSwipe(_DOWN);
        }
      } else if (A.swipe.direction == _RIGHT || A.swipe.direction == _LEFT) {
        A.swipe.offset.x = A.swipe.origin.x - touch.x;
        if (Math.abs(A.swipe.offset.x) > A.swipe.buffer2) {
          A.swipe.state = _WAITING;
          if (A.swipe.offset.x > 0) A.doSwipe(_LEFT);
          else A.doSwipe(_RIGHT);
        }
      }
    } else {
      A.swipe.offset.y = A.swipe.origin.y - touch.y;
    }
  },
};

myApp = new App();
//SWIPE DISABLED
//document.addEventListener('touchstart', myApp.handleStart, false);
//document.addEventListener('touchend', myApp.handleEnd, false);
//document.addEventListener('touchcancel', myApp.handleCancel, false);
//document.addEventListener('touchmove', myApp.handleMove, false);



document.addEventListener("touchstart", function(){}, true);
controllRatio('#d_spacer');

console.log('READY');
// console.log('---------------------------');

//////
