var restify = require('restify');
var builder = require('botbuilder');
var ssml = require('./ssml');
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
   // appId: '665ee9c35790405184b3c4bdfc3a524a',
   // appPassword: 'yvj8jZnYunA1coSf8KyuV4r'
	appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
  //  session.send("You said: %s", session.message.text);
	//session.send(test(1));
	//Call my own API - process the question and get the result back

// Add an InputHint to let Cortana know to expect user input
session.say('Hi there', 'Hi, what’s your name?', {
    inputHint: builder.InputHint.expectingInput
});
    

});



//function test( i)
//{
	//var q=['I am fine','I am good','Thank you']
	//return q[i];

//}
/*

// Sends greeting message when the bot is first added to a conversation
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                var reply = new builder.Message()
                    .address(message.address)
                    .text('Hi! I am SpeechToText Bot. I can understand the content of any audio and convert it to text. Try sending me a wav file.');
                bot.send(reply);
            }
        });
    }
});*/
