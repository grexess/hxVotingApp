import '../helper/coverarts.js';

// Listen to incoming HTTP requests (can only be used on the server).
apiversion = "apiV1";

/* Get randomly evergreens covers */
WebApp.connectHandlers.use('/' + apiversion + '/getEvergreenCovers', (req, res, next) => {
    var aURL = {};
    while ( Object.keys(aURL).length != 5) {
        aURL = getRandomTopHitURLs(aURL);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.end(JSON.stringify(aURL));
});

/* Get randomly onehitwonder covers */
WebApp.connectHandlers.use('/' + apiversion + '/getOneHitWonderCovers', (req, res, next) => {
    var aURL = {};
    while ( Object.keys(aURL).length != 5) {
        aURL = getOneHitWonderURLs(aURL);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.end(JSON.stringify(aURL));
});
/* 

function getRandomTopHitURLs(songObjects) {

    var record = data[getRandomInt(0, data.length - 3)];
    var song = record.songs[getRandomInt(0, 10)];

    return checkSongCover(record.year, song, songObjects);
}

function getOneHitWonderURLs(songObjects) {
    
var hit = oneHitWonders[getRandomInt(0, oneHitWonders.length - 1)];
    
    var year = Object.keys(hit)[0];
    var pos = hit[year];  
    
    var yearData = data.filter(obj => {
        return obj.year === year
      });
    return checkSongCover(year, yearData[0].songs[pos], songObjects);
}

function checkSongCover(year, song, songObjects){

    var coverURL;

    if (song && song.songID) {
        coverURL = getSongCoverURL(song.songID);
        if(coverURL){
            var songObject = new Object();
            songObject.coverurl = coverURL;
            songObject.interpret = song.interpret;
            songObject.title = song.title;
            songObjects[year] = songObject;
        }   
    }
    return songObjects;
}

function getSongCoverURL(songID) {

    var url = "https://coverartarchive.org/release-group/" + songID;
    try {
        var result = HTTP.call('GET', url, {
            headers: {
                "user-agent": "ChartsExplorer/0.0.1 ( admin@chartsexplorer.app )",
                "Accept": "application/json"
            }
        });
        var url = result.data.images[0].thumbnails.large;
        return url.replace("http:","https:");
    } catch (err) {
        return null;
    }
}
 */
