// A script which listens for events generated by the ProxyListenerLogEventPublisher.
// You can change this to listen for events generated by any other event publisher

var consumer;

function install(helper) {
  var ConsumerClass = Java.extend(Java.type("org.zaproxy.zap.eventBus.EventConsumer"));
  consumer = new ConsumerClass({
    eventReceived: function(event) { 
      // Print in one statement to prevent threads interleaving
      var target = '---';
      if (event.getTarget()) {
        target = event.getTarget().getDisplayName();
      }
      print(
        'Event received: \n' +
        '  Publisher: ' + event.getPublisher().getPublisherName() + '\n' +
        '  Type:      ' + event.getEventType() + '\n' +
        '  Target:    ' + target + '\n' +
        '  Params:    ' + event.getParameters());
    }
  });

  org.zaproxy.zap.ZAP.getEventBus().registerConsumer(consumer, 
    "org.parosproxy.paros.extension.history.ProxyListenerLogEventPublisher");
}

function uninstall(helper) {
  org.zaproxy.zap.ZAP.getEventBus().unregisterConsumer(consumer);
}
