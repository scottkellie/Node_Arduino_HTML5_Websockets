var fs = require('fs')
, http = require('http')
, five = require('johnny-five'), board
    , __ = require('fn')
, socketio = require('socket.io');


var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(fs.readFileSync(__dirname + '/index.html'));

}).listen(8888, function () {
    //create johnny-five arduino connection

    board = new five.Board();

    board.on("ready", function () {
        console.log('Board connected'),
        lcd1 = new five.LCD({ pins: [12, 11, 5, 4, 3, 2] }),
        // in8 = new five.Sensor({pin:"A8",freq:25}),
		led13 = new five.Led(13),
            console.log('led created'),
        lcd1.on("ready", function () {
            // creates a heart!
            // lcd1.clear(),
            lcd1.createChar(0x07,
                [0x00, 0x0a, 0x1f, 0x1f, 0x0e, 0x04, 0x00, 0x00]);

            lcd1.print('initialised');
        });
        console.log('Listening at: http://localhost:8888');

        var io = require('socket.io').listen(8889);

        socketio.listen(server).on('connection', function (socket) {

            socket.on('command', function (msg) {
                console.log(msg);
            });
            socket.on('message', function (msg) {
                /*var myString =
                    ['<div id="someId">',
                        'some content<br />',
                        '<a href="#someRef">someRefTxt</a>',
                        '</div>'
                    ].join('\n');*/
                var inmsg = msg.toString();
                var queryData = msg.parse(msg);

                date = new Date(),
	 dateNow = Date.now(),
        timeValH = date.getHours(),
        timeValM = date.getMinutes(),
        timeValS = date.getSeconds(),
        dateTime = (timeValH + '.' + timeValM + '.' + timeValS),
        lcd1.cursor();
                lcd1.blink();
                lcd1.setCursor = (2);
        setTimeout(function () {
            lcd1.clear().print(dateTime);
            console.log(dateTime);
        }, 600);
                led13.strobe(inmsg),
                //  lcd1.setCursor(1,1),
                // lcd1.print(inmsg);
console.log('Led strobing at ' + inmsg + 'ms');
                console.log('Message Received: ', inmsg);

                //lcd1.clear().print(dateTime);
                socket.broadcast.emit('message', inmsg);
            });
        });
    });
});
