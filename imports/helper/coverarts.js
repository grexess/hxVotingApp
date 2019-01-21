import {
    ChartswithID
} from '../collections/chartswithid.js'

//oneHitWonders = JSON.parse(Assets.getText("onehitwonder.json"));

getRandomTopHitURLs = function (songObjects) {

    var record = data[getRandomInt(0, data.length - 3)];
    var song = record.songs[getRandomInt(0, 10)];

    return checkSongCover(record.year, song, songObjects);
},


    getOneHitWonderURLs = function (songObjects) {

        var hit = oneHitWonders[getRandomInt(0, oneHitWonders.length - 1)];

        var year = Object.keys(hit)[0];
        var pos = hit[year];

        var yearData = data.filter(obj => {
            return obj.year === year
        });
        return checkSongCover(year, yearData[0].songs[pos], songObjects);
    }

checkSongCover = function (year, song, songObjects) {

    var coverURL;
    if (song && song.songID) {
        coverURL = getSongCoverURL(song.songID);
        if (coverURL) {
            var songObject = new Object();
            songObject.coverurl = coverURL;
            songObject.interpret = song.interpret;
            songObject.title = song.title;
            songObjects[year] = songObject;
        }
    }
    return songObjects;
}

getSongCoverURL = function (songID) {

    var url = "https://coverartarchive.org/release-group/" + songID;
    try {
        var result = HTTP.call('GET', url, {
            headers: {
                "user-agent": "ChartsExplorer/0.0.1 ( admin@chartsexplorer.app )",
                "Accept": "application/json"
            }
        });
        var url = result.data.images[0].thumbnails.large;
        return url.replace("http:", "https:");
    } catch (err) {
        return null;
    }
}

getRandomTopHitURL = function (data) {
    var sObj = {};
    var record = data[getRandomInt(0, data.length - 3)];
    var song = record.songs[getRandomInt(0, 10)];
    return checkSongCover(record.year, song, sObj);
}
