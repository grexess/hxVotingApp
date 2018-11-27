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
    }
});

Template.songItems.events({

    'click .openOverlay'(event, instance) {
        document.getElementById('styledModal').showModal();
    },

});
