import './coverselection.html';

import {
    Charts
  } from '../../collections/charts.js';

Template.coverselection.events({

    'click .close'(event, instance) {
        Session.set('imageOverlay', false);
    },
})

Template.coverselection.helpers({
  
    imgUrl: function(){

        var currentSong = Session.get("currentSong");
        var year = Session.get("currentYear");

        var songs = Charts.findOne({year:  year}).songs;
        var song = {title: songs[currentSong].title,interpret:songs[currentSong].interpret};

        return  Meteor.call('getCovers', year, song);
      }
});

