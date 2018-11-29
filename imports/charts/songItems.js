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
        var data = Charts.findOne({ year: Session.get("currentYear") });
        if (data) {
            return data.songs;
        }
    },

    showImageOverlay: function () {
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

    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        dataType:'jsonp',
        responseType:'application/json',
        xhrFields: {
          withCredentials: false
        },
        success: function(data) {
            
  
            var aImgUrl = [];

            data.results.forEach(function (url) {
                if (!aImgUrl.includes(url.artworkUrl100)) {
                    aImgUrl.push(url.artworkUrl100);
                }
            });
            Session.set('coverImages', aImgUrl);
            Session.set('previewURL', data.results[0].previewUrl);
        },
        error: function(error) {
            Session.set('coverImages', []);
        }
      });
}
