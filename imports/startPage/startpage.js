import './startpage.html';

import {
    Charts
} from '../collections/charts.js';

import {
    ChartswithID
} from '../collections/chartswithid';

import '../helper/coverarts.js';

Template.StartPage.onCreated(function () {

    Meteor.subscribe('chartswithid');

    Session.set("evUrl", "https://coverartarchive.org/release/489c31c1-6cfd-3ee9-9bb9-41371b4b9305/19827984533-500.jpg");
    Session.set("ohUrl", "https://coverartarchive.org/release/a988ad98-c801-4889-a059-42b20efe1e2b/17606500749-500.jpg");
    Session.set("epUrl", getStaticPicture());

    Meteor.setTimeout(function () {
        Meteor.setInterval(function () {
            let songArray = Session.get("randomSongs");
            songArray.shift();
            songArray[2] = getRandomSong();
            Session.set("randomSongs", songArray);
        }, 3000);
        Meteor.setInterval(function () {
            Session.set("epUrl", getStaticPicture());
        }, 5000);
        Meteor.setInterval(function () {
            getEvergreenPicture();
        }, 8000);
    }, 4000);

    Meteor.setTimeout(function () {
        Meteor.setInterval(function () {
            getOneHitWonderPicture();
        }, 8000);
    }, 8000);

});

Template.StartPage.helpers({

    evurl() {
        return Session.get("evUrl");
    },

    ohurl() {
        return Session.get("ohUrl");
    },

    epurl() {
        return Session.get("epUrl");
    },

    songtile() {

        if (!Session.get("randomSongs") || !Session.get("randomSongs")[0].pos) {
            songArray = [];
            for (var i = 0; i < 3; i++) {
                songArray[i] = getRandomSong();
            }
            Session.set("randomSongs", songArray);
            console.log("init");
        }

        return Session.get("randomSongs");
    }
});

function getRandomSong() {

    let iYearCount, year, songsOfYear, pos, song, randomSong = null;
    try {
        randomSong = new Object();
        iYearCount = Charts.find().count();
        year = getRandomInt(1930, 1930 + iYearCount) + "";
        songsOfYear = Charts.findOne({ "year": year }, { fields: { "songs": 1 } });
        pos = getRandomInt(0, songsOfYear.songs.length - 1);
        song = songsOfYear.songs[pos];
        randomSong.title = song.title;
        randomSong.interpret = song.interpret;
        randomSong.year = year;
        randomSong.pos = (pos + 1);
    } catch (err) {
        console.log("return null for" + iYearCount + " | " + year + " | " + pos);
    }
    return randomSong;
}

function getEvergreenPicture() {

    var data = ChartswithID.find().fetch();

    var songObject;

    var record = data[getRandomInt(0, data.length - 3)];
    var song = record.songs[getRandomInt(0, 10)];

    if (song && song.songID) {

        var url = "https://coverartarchive.org/release-group/" + song.songID;

        HTTP.call('GET', url, {}, function (error, response) {
            if (error) {
                getEvergreenPicture();
            } else {
                var url = response.data.images[0].thumbnails.large;
                songObject = new Object();
                songObject.coverurl = url.replace("http:", "https:");
                songObject.interpret = song.interpret;
                songObject.title = song.title;
                songObject.year = record.year;
                Session.set("evUrl", songObject.coverurl);
            }
        });
    } else {
        getEvergreenPicture();
    }
}

function getOneHitWonderPicture() {

    var data = ChartswithID.find().fetch();
    var hit = oneHitWonders[getRandomInt(0, oneHitWonders.length - 1)];

    var year = Object.keys(hit)[0];
    var pos = hit[year];

    var yearData = data.filter(obj => {
        return obj.year === year
    });

    var song = yearData[0].songs[pos];

    if (song && song.songID) {

        var url = "https://coverartarchive.org/release-group/" + song.songID;

        HTTP.call('GET', url, {}, function (error, response) {
            if (error) {
                getOneHitWonderPicture();
            } else {
                var url = response.data.images[0].thumbnails.large;
                songObject = new Object();
                songObject.coverurl = url.replace("http:", "https:");
                songObject.interpret = song.interpret;
                songObject.title = song.title;
                songObject.year = year;
                Session.set("ohUrl", songObject.coverurl);
            }
        });
    } else {
        getOneHitWonderPicture();
    }
}
