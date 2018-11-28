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

  'getCovers'(year, song) {}

})
