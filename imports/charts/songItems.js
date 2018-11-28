import './songItems.html';
/* import subtemplates */
import './covers/coverselection.js';

import {
    Charts
  } from '../collections/charts.js';

Template.songItems.onCreated(function () {
    //MiniMongo already loaded in parent template
});

Template.songItems.helpers({
    songs() {
        var data = Charts.findOne({year:  Session.get( "currentYear" )});
        if(data){
        return data.songs;
        }
    },

    showImageOverlay: function(){
        return Session.get('imageOverlay');
      }
});

Template.songItems.events({

    'click .openOverlay'(event, instance) {
        Session.set('currentSong', event.currentTarget.dataset.song - 1);
        Session.set('imageOverlay', true);

        getCovers();

    },

});

function getCovers() {

    var currentSong = Session.get("currentSong");
    var year = Session.get("currentYear");

    var songs = Charts.findOne({ year: year }).songs;
    var song = { title: songs[currentSong].title, interpret: songs[currentSong].interpret };


    var url = "https://itunes.apple.com/search?term=" + encodeURI(song.interpret) + "%20" + encodeURI(song.title) + "&limit=25";
    HTTP.call('GET', url, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
            if (response.statusCode === 200) {
                if (response && response.data && response.data.results.length > 0) {

                    Session.set('previewURL', response.data.results[0].previewUrl);

                    var aImgUrl = [];

                    response.data.results.forEach(function (url) {
                        if (!aImgUrl.includes(url.artworkUrl100)) {
                            aImgUrl.push(url.artworkUrl100);
                        }
                    });
                    Session.set('coverImages', aImgUrl);
                }
            }
        }
    });
}
