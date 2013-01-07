$(function() {
  function onMessage(messageEvent) {
    var height = (messageEvent.data.height+30) + 'px';
    console.log(height);
    // Once height message is received from QS, slide open the iframe
    $('#group_register').animate({
      'height' : height
    }, 200);
  }
  var windowProxy;
  window.onload=function(){
    // Create a proxy window to send to and receive
    // messages from the iFrame
    windowProxy = new Porthole.WindowProxy(
      '/assets/proxy.html', 'group_register');

    // Register an event handler to receive messages;
    windowProxy.addEventListener(onMessage);
  };

});
