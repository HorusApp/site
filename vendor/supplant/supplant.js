/**
* supplant() does variable substitution on the string. It scans through the string looking for
* expressions enclosed in { } braces. If an expression is found, use it as a key on the object,
* and if the key has a string value or number value, it is substituted for the bracket expression
* and it repeats.
*
* Written by Douglas Crockford
* http://www.crockford.com/
*/
String.prototype.supplant = function (o) {
  return this.replace(
    /{([^{}]*)}/g,
    function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};

//
// Example 1 basic usage
//
linkTpl = '<a href="{url}" class="{class}">{lable}</a>';

links = linkTpl.supplant({
  url : 'http://example.com',
  class : 'lnk',
    lable : 'Link Bezeichnung'
});

//
// Example 2 more advanced usage
//
var items = [],
    listItemTpl = '<li><a href="{url}" class="{class}">{lable}</a></li>';

for (i=0;i<20;i++) {
    items.push(listItemTpl.supplant({
       url : 'http://example.com',
       class : 'lnk',
       lable : 'Link Bezeichnung'
    }));
}
// Join items e.g. to insert into DOM
items = items.join('');
