var database = function(INPUT) {
  this.input = INPUT;//JSON.parse(INPUT);

  this.imgs = [];

  //create an ordered array of DataImg objects
  this.extract_input();
  this.by_tag = {};
  this.create_by_tag_catalogue();

  this.current_img = this.first_img();

  this.sequence_index = 0;
  this.sequence = {
    up: [],
    left: [],
    down: [],
    right: [],
  };
  this.tag_direction = {
    up: undefined,
    left: undefined,
    down: undefined,
    right: undefined,
  };
  this.old_direction = undefined;
  this.new_direction = undefined;
};

database.prototype = {
  extract_input: function() {
    var index = 0;

    for (var key in this.input) {
      var img = this.input[key];
      this.imgs.push(
        new DataImg({
          url: './img/collection/' + img.name,
          tags: img.tags,
          index: index,
        })
      );
      index++;
    }
  },

  create_by_tag_catalogue: function() {
    for (var i = 0; i < this.imgs.length; i++) {
      var img = this.imgs[i];
      for (var j = 0; j < img.tags.length; j++) {
        var tag = img.tags[j];
        if (this.by_tag[tag] !== undefined) {
          this.by_tag[tag].push(img);
        } else {
          this.by_tag[tag] = [];
          this.by_tag[tag].push(img);
        }
      }
    }
  },

  get_tags: function(fixed) {
    newDir = [];
    var directions = this.current_img.tags.slice();
    var to_keep;
    var to_place;

    if (fixed == _UP) {
      to_place = 0;
      to_keep = this.tag_direction.up;
      remove_elem(directions, directions.indexOf(to_keep));
    }
    if (fixed == _LEFT) {
      to_place = 1;
      to_keep = this.tag_direction.left;
      remove_elem(directions, directions.indexOf(to_keep));
    }
    if (fixed == _DOWN) {
      to_place = 2;
      to_keep = this.tag_direction.down;
      remove_elem(directions, directions.indexOf(to_keep));
    }
    if (fixed == _RIGHT) {
      to_place = 3;
      to_keep = this.tag_direction.right;
      remove_elem(directions, directions.indexOf(to_keep));
    }
    if (fixed == undefined) {
      to_place = Math.floor(Math.random() * 5);
      to_keep = random_elem(directions);
      remove_elem(directions, directions.indexOf(to_keep));
    }

    var i = random_index(directions);
    newDir.push(directions[i]);
    remove_elem(directions, i);

    i = random_index(directions);
    newDir.push(directions[i]);
    remove_elem(directions, i);

    newDir.push(directions[0]);

    insert_elem(newDir, to_place, to_keep);

    this.tag_direction = {
      up: newDir[0],
      left: newDir[1],
      down: newDir[2],
      right: newDir[3],
    };
    console.log("data tag UPDATED");
  },

  random_first_img: function() {
    return random_elem(this.imgs);
  },

  first_img: function() {

    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("img");
    c = parseInt(c);
    if(c === 0) c = 1;
    if(c > 109) c = 109;
    if(c) return this.imgs[parseInt(c)-1];
    else return this.random_first_img();
  },

  add_movement: function(dir) {
    this.new_direction = dir;

    if(this.old_direction != undefined && this.old_direction != this.new_direction){
      this.sequence_index = 0;
      // console.log("[!!!] change of direction index reset to (0)");
    }
    // else console.log("same dir - all good.");

    // console.log('looking at sequence (' + dir_name(dir) + ') and using index (' + this.sequence_index + ')');
    // console.log('that is -> ' + this.sequence[dir_name(dir)]);
    this.current_img = this.imgs[
      this.sequence[dir_name(dir)][this.sequence_index]
    ];

    this.sequence_index++;
    if (this.sequence[dir_name(dir)].length == this.sequence_index) {
      this.sequence_index = 0;
      // console.log('[!!!] sequence restarting from zero');
    }

    this.get_tags(this.new_direction);
    this.old_direction = this.new_direction;
  },

  setInitalImages: function() {
    this.get_tags();

    this.sequence.up = this.generate_sequence(_UP);
    this.sequence.left = this.generate_sequence(_LEFT);
    this.sequence.down = this.generate_sequence(_DOWN);
    this.sequence.right = this.generate_sequence(_RIGHT);

    this.sequence_index = 0;
    this.old_direction = undefined;
    this.new_direction = undefined;

    setImage(_DOWN, this.imgs[this.sequence.up[0]]);
    setImage(_RIGHT, this.imgs[this.sequence.left[0]]);
    setImage(_UP, this.imgs[this.sequence.down[0]]);
    setImage(_LEFT, this.imgs[this.sequence.right[0]]);
  },

  setNextImages: function() {

    var dirList = [_UP, _LEFT,_DOWN, _RIGHT];
    for (var i = 0; i < dirList.length; i++) {
      var d = dirList[i];
      var dn = dir_name(d);

      if(this.new_direction != d){
        this.sequence[dn] = this.generate_sequence(d);
        setImage(opposite_dir(d), this.imgs[this.sequence[dn][0]]);
      }
      else{
        // console.log("setting (" + this.sequence[dn][this.sequence_index] +") on (" + dn.toUpperCase()+")");
        setImage(opposite_dir(d), this.imgs[this.sequence[dn][this.sequence_index]]);
      }
    }
    // console.log('> loading new images on their places outside the screen');
    // var seq = this.sequence;
    // var nd = this.new_direction;
    //
    // if (
    //   this.previous_direction !== undefined &&
    //   nd != this.previous_direction
    // ) {
    //   this.sequence_index = 1;
    //   console.log('change of direction! index = 1');
    // }
    //
    // if (nd != _UP) {
    //   seq.up = this.generate_sequence(this.tag_direction.up);
    //   setImage(_DOWN, this.imgs[seq.up[0]]);
    // }
    //
    // if (nd != _LEFT) {
    //   seq.left = this.generate_sequence(this.tag_direction.left);
    //   setImage(_RIGHT, this.imgs[seq.left[0]]);
    // }
    //
    // if (nd != _DOWN) {
    //   seq.down = this.generate_sequence(this.tag_direction.down);
    //   setImage(_UP, this.imgs[seq.down[0]]);
    // }
    //
    // if (nd != _RIGHT) {
    //   seq.right = this.generate_sequence(this.tag_direction.right);
    //   setImage(_LEFT, this.imgs[seq.right[0]]);
    // }
    //
    // console.log('index : ' + this.sequence_index);
    // console.log('img : ' + this.current_img.index);
    // console.log('we went ' + (!nd ? 'undefined' : dir_name(nd).toUpperCase()));
    //
    // var nextimg;
    // var c_seq = seq[dir_name(nd)];
    //
    // if (nd !== undefined) {
    //   if (c_seq.length > this.sequence_index)
    //     nextimg = this.imgs[c_seq[this.sequence_index]].index;
    //   else nextimg = this.imgs[c_seq[0]].index;
    // }
    // console.log('next same-dir image : ' + nextimg);
    //
    // if (nd == _UP) {
    //   if (c_seq.length > this.sequence_index)
    //     setImage(opposite_dir(nd), this.imgs[c_seq[this.sequence_index]]);
    //   else setImage(opposite_dir(nd), this.imgs[c_seq[0]]);
    // }
    //
    // this.previous_direction = this.new_direction;
  },

  generate_sequence: function(dir) {
    var tag = this.tag_direction[dir_name(dir)];
    var s1 = this.by_tag[tag];
    var s2 = [];
    for (var i = 0; i < s1.length; i++) {
      s2.push(s1[i].index);
    }
    shuffle_elem(s2);
    // placeFirst(s2, this.current_img.index);
    placeLast(s2, this.current_img.index);
    if (s2.length == 1) s2.push(s2[0]);
    return s2;
  },
};

///////
///////
/////// DATA
///////
///////
//
// var INPUT = {
//   i1: {
//     name: 'img1.jpg',
//     tags: ['wall', 'politics', 'young designer', 'cartoon'],
//   },
//   i2: {
//     name: 'img2.jpg',
//     tags: ['urban', 'electronics', 'fun', 'dirty'],
//   },
//   i3: {
//     name: 'img3.jpg',
//     tags: ['chair', 'urban', 'design', 'dirty'],
//   },
//   i4: {
//     name: 'img4.jpg',
//     tags: ['chair', 'design', 'store', 'colorful'],
//   },
//   i5: {
//     name: 'img5.jpg',
//     tags: ['metro', 'screen', 'electronics', 'dirty'],
//   },
//   i6: {
//     name: 'img6.jpg',
//     tags: ['metro', 'design', 'ad', 'fun'],
//   },
//   i7: {
//     name: 'img7.jpg',
//     tags: ['fun', 'cartoon', 'ad', 'metro'],
//   },
//   i8: {
//     name: 'img8.jpg',
//     tags: ['electronics', 'surveilance', 'store', 'screen'],
//   },
//   i9: {
//     name: 'img9.jpg',
//     tags: ['electronics', 'store', 'fun', 'screen'],
//   },
//   i10: {
//     name: 'img10.jpg',
//     tags: ['design', 'art', 'wall', 'museum'],
//   },
// };
// INPUT = JSON.stringify(INPUT);
