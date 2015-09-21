#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var config = require('.config');

//connect to rabbitMQ server
amqp.connect(config.RABBIT_HOST, function(err, conn) { 

  //create the channel
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    //set to queue to receive the messages
    ch.assertQueue(q, {durable: false});
    console.log('[*] Waiting for messages in %s. To exit press CTRL+C', q);
    
    //consume the queue (async)
    ch.consume(q, function(msg) {
      console.log('[x] Received %s', msg.content.toString());
    }, {noAck: true});
  });
});
