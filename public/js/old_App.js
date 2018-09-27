var W = window.innerWidth; //$(window).width();
var H = window.innerHeight; //$(window).height();
var CENTER = new Vec(W / 2, H / 2);

var App = function() {
  this.i_main = $('#main');
  this.i_up = $('#up');
  this.i_right = $('#right');
  this.i_down = $('#down');
  this.i_left = $('#left');

  this.t_up = $('#t_up');
  this.t_right = $('#t_right');
  this.t_down = $('#t_down');
  this.t_left = $('#t_left');

  this.center;
  this.up;
  this.right;
  this.down;
  this.left;

  this.sw_origin = undefined;
  this.sw_toll1 = 10;
  this.sw_toll2 = 100;
  this.sw_state = 0; //up1, down2, left3, right4
  this.sw_launch = false;
  this.sw_offset = new Vec(0, 0);

  this.d_w = W * 0.8; //this.i_main.outerWidth();
  this.d_h = H * 0.85; //this.i_main.outerHeight();

  this.data = new database();
  this.data.imgs = INPUT;

  this.data.conform();
  this.data.select_first_url();

  this.setup();
  this.update_tags();
  this.update_imgs();
  this.update();
};

App.prototype = {
  update: function() {
    if (this.sw_state == 0) {
      if (this.sw_offset.x != 0) {
        this.sw_offset.x *= 0.8;
        if (Math.abs(this.sw_offset.x) < 2) this.sw_offset.x = 0;
        myApp.place(myApp.i_main, myApp.center.subtract(myApp.sw_offset));
      }
      if (this.sw_offset.y != 0) {
        this.sw_offset.y *= 0.8;
        if (Math.abs(this.sw_offset.y) < 2) this.sw_offset.y = 0;
        myApp.place(myApp.i_main, myApp.center.subtract(myApp.sw_offset));
      }
    } else if (this.sw_launch) {
      if (this.sw_state == 1) {
      } else if (this.sw_state == 2) {
      } else if (this.sw_state == 3) {
      } else if (this.sw_state == 4) {
      }
    }

    requestAnimationFrame(this.update.bind(this));
  },

  setup: function() {
    this.center = new Vec(W / 2 - this.d_w / 2, H / 2 - this.d_h / 2);

    this.up = this.center.add(new Vec(0, H));
    this.right = this.center.add(new Vec(W, 0));
    this.down = this.center.add(new Vec(0, -H));
    this.left = this.center.add(new Vec(-W, 0));

    this.place(this.i_main, this.center);
    this.place(this.i_up, this.up);
    this.place(this.i_right, this.right);
    this.place(this.i_down, this.down);
    this.place(this.i_left, this.left);

    var margin = 18;

    this.place(
      this.t_up,
      CENTER.add(
        new Vec(
          -this.t_up.outerWidth() / 2,
          -this.t_up.outerHeight() / 2 - H / 2 + margin
        )
      )
    );

    this.place(
      this.t_right,
      CENTER.add(
        new Vec(
          this.d_w / 2 + margin - this.t_right.outerWidth() / 2,
          -this.t_right.outerHeight() / 2
        )
      )
    );

    this.place(
      this.t_down,
      CENTER.add(
        new Vec(
          -this.t_down.outerWidth() / 2,
          -this.t_down.outerHeight() / 2 + H / 2 - margin
        )
      )
    );
    this.place(
      this.t_left,
      CENTER.add(
        new Vec(
          -this.d_w / 2 - margin - this.t_left.outerWidth() / 2,
          -this.t_left.outerHeight() / 2
        )
      )
    );
  },

  place: function(img, v) {
    img.css('top', v.y + 'px');
    img.css('left', v.x + 'px');
  },

  update_tags: function() {
    var t = this.data.current_img.tags;
    this.t_up.html(caps(t[0]));
    this.t_left.html(caps(t[1]));
    this.t_down.html(caps(t[2]));
    this.t_right.html(caps(t[3]));
  },

  update_imgs: function() {
    var t = this.data.current_img.tags;
    this.i_up.attr('src', this.data.new_by_tag(t[0]));
    this.i_left.attr('src', this.data.new_by_tag(t[1]));
    this.i_down.attr('src', this.data.new_by_tag(t[2]));
    this.i_right.attr('src', this.data.new_by_tag(t[3]));
  },

  handleStart: function(e) {
    //e.preventDefault();
    var t = e.changedTouches[0];
    myApp.sw_origin = new Vec(t.pageX, t.pageY);
  },
  handleEnd: function(e) {
    myApp.sw_state = 0;
  },
  handleCancel: function(e) {},
  handleMove: function(e) {
    var t = e.changedTouches[0];

    if (myApp.sw_state <= 0) {
      if (Math.abs(myApp.sw_origin.x - t.pageX) > myApp.sw_toll1) {
        if (myApp.sw_origin.x > t.pageX) myApp.sw_state = 4;
        if (myApp.sw_origin.x < t.pageX) myApp.sw_state = 3;
        myApp.sw_origin = new Vec(t.pageX, t.pageY);
      } else if (Math.abs(myApp.sw_origin.y - t.pageY) > myApp.sw_toll1) {
        if (myApp.sw_origin.y > t.pageY) myApp.sw_state = 1;
        if (myApp.sw_origin.y < t.pageY) myApp.sw_state = 2;
        myApp.sw_origin = new Vec(t.pageX, t.pageY);
      }
    } else if (myApp.sw_launch == true) {
      myApp.place(myApp.i_main, myApp.center.subtract(myApp.sw_offset));

      if (myApp.sw_state == 1 || myApp.sw_state == 2) {
        myApp.sw_offset.y = myApp.sw_origin.y - t.pageY;
        if (Math.abs(myApp.sw_offset.y) > myApp.sw_toll2)
          myApp.sw_launch = true;
      } else if (myApp.sw_state == 3 || myApp.sw_state == 4) {
        myApp.sw_offset.x = myApp.sw_origin.x - t.pageX;
        if (Math.abs(myApp.sw_offset.x) > myApp.sw_toll2)
          myApp.sw_launch = true;
      }
    } else {
      myApp.sw_offset.y = myApp.sw_origin.y - t.pageY;
    }
  },
};

myApp = new App();

document.addEventListener('touchstart', myApp.handleStart, false);
document.addEventListener('touchend', myApp.handleEnd, false);
document.addEventListener('touchcancel', myApp.handleCancel, false);
document.addEventListener('touchmove', myApp.handleMove, false);
console.log('READY');

//////
