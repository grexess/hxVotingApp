import { Meteor } from 'meteor/meteor';

import {
  Votings
} from '../imports/collections/charts.js';

import {
  Charts
} from '../imports/collections/charts.js';

Meteor.publish('charts', function () {
  return Charts.find();
});

Meteor.startup(() => {
  // code to run on server at startup

  /* Fill the charts collection if empty */
  if (Charts.find().count() === 0) {
    var data = JSON.parse(Assets.getText("top100.json"))

    Object.keys(data).forEach(function (year) {
      console.log(year);

      Charts.insert({
        year: year,
        songs: data[year],
      }, function (error, result) {
        if (error) console.log(error); //info about what went wrong
        if (result) {
          console.log('Charts created for: ' + year);
        }
      });
    })
  }

});

Meteor.methods({

  'getCovers'(year, song) {

    var fs = Npm.require('fs');

    var url = "https://itunes.apple.com/search?term=" + encodeURI(song.interpret) + "%20" + encodeURI(song.title) + "&limit=1";
    debugger;


    try {
      let iTunesResponse = HTTP.call('GET', url);

      if (iTunesResponse.statusCode === 200) {
        if (iTunesResponse && iTunesResponse.data && iTunesResponse.data.results[0] && iTunesResponse.data.results[0].artworkUrl100) {
          return iTunesResponse.data.results[0].artworkUrl100;
        }
      }
      return "/img/cd.png";
    }
    catch (err) {
      console.log(err);
      return "/img/cd.png";
    }
  }

})
