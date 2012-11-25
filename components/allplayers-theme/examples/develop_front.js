$(function() {
  // HACK: Hide the third column on the public_wadl table
  $("#public_wadl td:nth-child(3)").hide();
  $("#public_wadl th:nth-child(3)").hide();
  $("#togglePublicAPIDescription").click(function(event){
    $("#public_wadl td:nth-child(3)").toggle();
    $("#public_wadl th:nth-child(3)").toggle();
    event.preventDefault();
  });

  // Since the api list is auto-gened - auto link to mapped help pages
  var url_doc_map = new Object;
  $('.sidebar-module ul li').each(function(index, value){
    var url = $('a' , value).attr('href');
    if (url != undefined) {
      var title = url.replace('.html', '');
      url_doc_map[title] = url;
    }
  });
  $("#public_wadl td:nth-child(1) a").each(function(index){
    var possibleURLObject = $(this);
    var possibleURL = possibleURLObject.text().substring(possibleURLObject.text().indexOf("api/v1/rest") + "api/v1/rest".length);
    jQuery.each(url_doc_map, function(key, value) {
      if (possibleURL.indexOf(key) === 1) {
        // We have a match to potential doc page: rewrite the href
        possibleURLObject.attr('href', "/" + value + "#" + possibleURL);
      }
    });
  });
});
