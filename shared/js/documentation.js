// Init sidebar
$(function() {
  var activeItem,
      helpList = $('#js-sidebar .js-topic'),
      firstOccurance = true;

  // hide list items at startup
  if($('body.api') && window.location){
    var reg = /\/\/[^\/]+(\/.+)/g,
        docUrl = reg.exec(window.location.toString());
    if(docUrl){
      $('#js-sidebar .js-topic a').each(function(){
        var url = $(this).attr('href').toString();
        if(url.indexOf(docUrl[1]) >= 0 && url.length == docUrl[1].length){
          $(this).parent('li').addClass('disable');
          var parentTopic = $(this).parentsUntil('div.sidebar-module > ul').last();
          parentTopic.addClass('js-current');
          parentTopic.find('.js-expand-btn').toggleClass('collapsed expanded');
        }
      });
    }
  }

  $('#js-sidebar .js-topic').each(function(){
    if(($(this).find('.disable').length == 0 || firstOccurance == false) &&
    $(this).hasClass('js-current') != true){
      $(this).find('.js-guides').children().hide();
    } else {
      activeItem = $(this).index();
      firstOccurance = false;
    }
  });

  // Toggle style list. Expanded items stay
  // expanded when new items are clicked.
  $('#js-sidebar .js-toggle-list .js-expand-btn').click(function(){
    var clickedTopic = $(this).parents('.js-topic'),
        topicGuides  = clickedTopic.find('.js-guides li');
    $(this).toggleClass('collapsed expanded');
    topicGuides.toggle(100);
    return false;
  });

  // Accordion style list. Expanded items
  // collapse when new items are clicked.
  $('#js-sidebar .js-accordion-list .js-topic h3 a').click(function(){
    var clickedTopic = $(this).parents('.js-topic'),
        topicGuides = clickedTopic.find('.js-guides li');
    
    if(activeItem != clickedTopic.index()){
      if(helpList.eq(activeItem)){
        helpList.eq(activeItem).find('.js-guides li').toggle(100);
      }
      activeItem = clickedTopic.index();
      topicGuides.toggle(100);
    } else {
      activeItem = undefined;
      topicGuides.toggle(100);
    }

    return false;
  });

  $('.help-search .search-box').focus(function(){
    $(this).css('background-position','0px -25px');
  });

  $('.help-search .search-box').focusout(function(){
    if($(this).val() == ''){
      $(this).css('background-position','0px 0px');
    }
  });

  // Dynamic year for footer copyright
  var currentYear = (new Date).getFullYear();
  $("#year").text( (new Date).getFullYear() );

  // HACK: Hide the third column on the public_wadl table
  $("#public_wadl td:nth-child(3)").hide();
  $("#public_wadl th:nth-child(3)").hide();
  $("#togglePublicAPIDescription").click(function(event){
    $("#public_wadl td:nth-child(3)").toggle();
    $("#public_wadl th:nth-child(3)").toggle();
    event.preventDefault();
  });

  // "NEAT" HACK: Catch the links on the frontpage and link into their specific pages
  var url_doc_map = {
    "other": "general.html",
    "users": "users.html",
    "groups": "groups.html"
    // Add more here...
  };
  $("#public_wadl").click(function(event) {
    // TODO: Is this the proper selection from the delegated click event?
    var selectedURL = event.originalEvent.target.firstChild.data;
    if (selectedURL !== undefined) {
      // Default: just goto the general API info page
      // window.location = window.location.origin + window.location.pathname + url_doc_map["other"];
      // Search for defined info in the url map
      jQuery.each(url_doc_map, function(key, value) {
        if (new RegExp("/" + key + "/").exec(selectedURL) !== null) {
          window.location = window.location.origin + window.location.pathname + value;
        }
      });
      event.preventDefault();
    }
  });
});
