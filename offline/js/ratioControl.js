function controllRatio(name) {
  if (name == undefined) {
    var src = $('#d_main')
      .children('.img_photo')
      .attr('src');

    var img = new Image();
    img.onload = function() {
      if (this.height < this.width) {
        // console.log('large');
        $('.img_photo').css({
          width: 'auto',
          height: '100%',
          'max-height': '60vw',
          'max-width': 'none',
        });
      } else {
        // console.log('tall');
        $('.photo')
          .children('.img_photo')
          .css({
            width: '100%',
            height: 'auto',
            'max-width': '60vh',
            'max-height': 'none',
          });
      }
    };
    img.src = src;
  } else {
    var src = $(name)
      .children('.img_photo')
      .attr('src');
    var elem = $(name);

    var img = new Image();
    img.onload = function() {
      if (this.height < this.width) {
        // console.log('large');
        $(name + '.img_photo').css({
          width: 'auto',
          height: '100%',
          'max-height': '60vw',
          'max-width': 'none',
        });
      } else {
        // console.log('tall');
        $(name)
          .children('.img_photo')
          .css({
            width: '100%',
            height: 'auto',
            'max-width': '60vh',
            'max-height': 'none',
          });
      }
    };
    img.src = src;
  }
}
