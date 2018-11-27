import './songItems.html';

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
