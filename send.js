#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var config = require('.config');

//connect to rabbitMQ server
amqp.connect(config.RABBIT_HOST, function(err, conn) {

  //create the channel
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    //declare the queue to send the messages
    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });

  //close the connection
  setTimeout(function() { 
    conn.close();
    process.exit(0);
  }, 500);
});
