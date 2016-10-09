const $ = global.$;

String.prototype.supplant = function (o) {
  return this.replace(
    /{([^{}]*)}/g,
    function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};

$(function() {
  global.getResource( 'videos', data => {
    console.log(data);

    var items = [],
        itemTpl = '<div class="column column-33 item"><a href="{url}">' +
          '<figure><img src="images/video-thumb.jpg"><span class="user-label"><i class="icon-sprites avatar"></i>Usuario HorusApp</span></figure>' +
          '<figcaption><strong class="title">{title}</strong><span class="location">{location}</span><span class="visualizations"><i class="icon fa fa-eye "></i> 2334</span></figcaption>' +
          '</a></div>';

    data.forEach(item => {
      items.push(itemTpl.supplant({
         url : item.url,
         title : item.title,
         location : item.location
      }));
    });

    items = items.join('');

    console.log(items);

    $('.videos').append(items);
  } );
});
