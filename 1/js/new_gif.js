var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36921755-1']);
_gaq.push(['_trackPageview']);

$(window).on("hashchange", on_hash_change);

var current_filename = "";

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


function filename_only(url) {
  var rv = url.split(":")[2];
  rv = rv.replace(/_/g, " ");
  rv = rv.replace(".gif","");
  rv = rv.replace(/-/g, " ");
  rv = decodeURIComponent(rv);
  return rv;
}

function load_image_by_filename(filename) {
  //window.alert(filename);
  // http://jehiah.cz/a/guide-to-escape-sequences
  filename = filename.replace('&', "").replace('"', "").replace("'", "").replace('>', "") .replace('<', "") .replace(';', "")
  current_filename = filename;
  location.hash = filename;

  // http://stackoverflow.com/questions/4811172/is-it-possible-to-track-hash-links-like-pages-with-google-analytics
  _gaq.push(['_trackPageview', location.pathname + location.search  + location.hash]);

  var url = 'http://en.wikipedia.org/w/api.php?' +
            'action=query&prop=imageinfo' +
            '&format=json&iiprop=url' + 
            '&list=imageusage&iutitle=File:' +
          filename + 
      '&titles=File:' +
      filename +
      '&callback=?';
  $.getJSON(url, function(data) {
    var img_url = data.query.pages['-1'].imageinfo[0].url;
    var img_description_url = data.query.pages['-1'].imageinfo[0].descriptionurl;
    var img_name = filename_only(img_description_url);
    $("#gif").empty().append($("<img/>").attr("src", img_url));
    $("#title").empty().append($("<a/>").attr("href", img_description_url).append(img_name));
    $("#usage").empty();
    if(data.query.imageusage) {
      $.each(data.query.imageusage, function(index, value) {
    $("#usage").append('<li><a href="http://en.wikipedia.org/wiki/' + value.title + '">' + value.title + '</a></li>');
      });
    }
  });
}

function load_random_image() {
  $.getJSON("http://www.wikigifs.org/random?callback=?", function(data) {
    load_image_by_filename(data.image)
  });
}

function on_hash_change() {
  var hash_value = location.hash;
  hash_value = hash_value.replace('#', '');

  if(hash_value !== current_filename) {
    load_image_by_filename(hash_value);
  }
}

$(function() {
  $(document).keyup(function(evt) {
    if (evt.keyCode == 32) {
      load_random_image();
    }
  })
});

if(location.hash !== "") {
  on_hash_change();
} else {
  load_image_by_filename('Siteswap_3b_531.gif'); //Vite.gif //Siteswap_3b_531.gif
  //load_random_image();
}
