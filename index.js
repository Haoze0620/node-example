var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'haoze',
    password: '12345',
    database: 'kugou'
});
connection.connect();


// connection.connect();

function getHTML() {
    return new Promise(function (resolve, reject) {
        request('https://www.kugou.com/yy/singer/home/3060.html', (err, res, body) => {
            // console.log(body)
            resolve(body);
            // var $ = cheerio.load(body);
            // var arr = $('.song_hid');
            // var body
            // arr.each((i, e) => {
            //     var author = $(e).attr('value').split('|')[0];
            //     var url = $(e).attr('value').split('|')[1];
            //     console.log(author)
            // });
        });
    })
}

function analysis(body) {
    return new Promise(function (resolve, reject) {
        var $ = cheerio.load(body);
        var name = [];
        var link = [];
        $('.song_hid').each(function (i, e) {
            name.push($(e).attr('value').split('|')[0]);
            link.push($(e).attr('value').split('|')[1]);
        })
        var music=[];
        for(i=0;i<name.length;i++){
            music.push({name:name[i],link:link[i]});
        }
        
        // var music=[name,link];
        // console.log(music);
        resolve(music);
    })
}

function getMP3(music) {
    return new Promise(function (resolve, reject) {
        var url = [];
        // console.log(music);
        music[1].forEach(function(e,i){
            // console.log(`https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery191024142115448801627_1557849394311&hash=${e}`);
            request(`https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery191024142115448801627_1557849394311&hash=${e}`, function (err, res, body) {
                if (body) {
                    url.push(JSON.parse(body).data.play_url);
                }
            })
        });
        var body=[music[0],url];
        resolve(body);

    })
}

function saveInfo(music) {
    console.log(music);
    // connection.connect();
    return new Promise(function (resolve, reject) {
        
        music.forEach(function(e){
            connection.query('INSERT INTO music SET ?', {
                author: e.name,
                url: e.link
            }, function (error, results, fields) {
                if (error) throw error;
                console.log(results);
            });
        })
        // connection.end();

    })
}

getHTML().then(analysis).then(saveInfo)