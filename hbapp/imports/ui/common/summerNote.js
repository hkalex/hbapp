import { Template } from 'meteor/templating';

/* eslint-disable meteor/no-template-lifecycle-assignments */
Template.summerNoteTemplate.rendered = function() {
  var options = this.data.atts;

  let p = $.summernote.options.modules.videoDialog;
  let C = function(context) {
    p.call(this,context)
    this.context = context;
    let origCreateVideoNode = this.createVideoNode;
    this.createVideoNode = function(url) {
      let result = origCreateVideoNode(url);
      if (!result) {
        // check QQ
        var qqRE;
        var vid;
        if(/vid=/.test(url)){
          qqRE = /vid=(\w+)/;
          let r = url.match(qqRE);
          vid = r && r[1];
        }else{
          qqRE = /(\/\/v\.qq\.com\/x\/cover(\/\w+)?\/(\w+)\.html)/;
          let r = url.match(qqRE);
          vid = r && r[3];
        }
        var $video;
        $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
            .attr('frameborder', 0)
            .attr('height', '270')
            .attr('width', '480')
            .attr('src', 'http://v.qq.com/iframe/player.html?vid='+vid+'&amp;amp;width=480&amp;amp;height=270&amp;amp;auto=0');
        $video.addClass('note-video-clip');
        return $video[0];
      } else {
        return result;
      }
    };
  };
  C.prototype = Object.create(p);
  C.prototype.constructor = C;
  $.summernote.options.modules.videoDialog = C;

  this.$('.summernote').summernote(options);
  
  $('[data-original-title=Picture],[data-original-title=Video]').on('click', function() {
    setTimeout(function(){
      $('div.modal-backdrop').remove();
    },0);
  });
};
/* eslint-enable meteor/no-template-lifecycle-assignments */

Template.summerNoteTemplate.helpers({
  dataSchemaKey: function() {
    return this.atts['data-schema-key'];
  }
});
