var request = require('request');
var url = [];
// console.log(music);
    // console.log(`https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery191024142115448801627_1557849394311&hash=${e}`);
    request(`https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery191024142115448801627_1557849394311&hash=C726C14611F18C9410C5ED2BEF770DFD&album_id=960327&dfid=33ZSoF1qc2RL0DBkTZ04e4I1&mid=0a22327763ee2f9deef843ca4c48f226&platid=4&_=1557849394312`, function (err, res, body) {
    //var e=/(?<=\()\S+(?=\))/;
    console.log(body);
    console.log((body.toString()).match(/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/));   
    // if (body) {
    //         url.push(JSON.parse(body).data.play_url);
    //     }
    })

// console.log(url);