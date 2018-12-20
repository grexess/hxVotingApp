import '/imports/startup/both';

import { Meteor } from 'meteor/meteor';

import {
  Votings
} from '../imports/collections/votings';

import {
  Charts
} from '../imports/collections/charts.js';

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "../../../../../covers"})]
});

Meteor.publish('charts', function () {
  return Charts.find();
});

Meteor.publish('votings', function () {
  return Votings.find({ votedBy: Meteor.user().emails[0].address });
});


Votings.allow({
  'insert': function (userId, doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true;
  },
  'remove': function (userId, doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true;
  },
  'update': function (userId, doc) {
    /* user and doc checks ,
    return true to allow insert */
    return true;
  }
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

  'getVotingCount'(year) {
    var query = Votings.find({ [year]: { $exists: true } }, { fields: { [year]: 1, "votedBy": 1, "_id": 0 } }).fetch();
    return query.length;
  },


  'getVotingItems'(year) {

    var query = Votings.find({ [year]: { $exists: true } }, { fields: { [year]: 1, "votedBy": 1, "_id": 0 } }).fetch();
    var top100ofYear = Charts.findOne({ year: year }).songs;

    var results = {};

    var votCounter = {};
    //get each voting
    query.forEach(function (entry) {
      debugger;
      var voting = entry[year];
      //loop from top1 to top3
      (Object.keys(voting)).forEach(function (topX) {

        var votedSongOnX = voting[topX];

        //check images
        //var song = top100ofYear[votedSongOnX - 1];
        //var songImg = year + "-" + song.pos + ".jpg";
        /*  var img = Images.findOne({ "original.name": songImg });
 
         if (img) {
           song.img = "/covers/" + img.collectionName + '-' + img._id + '-' + img.original.name;
         } else {
           song.img = storeImage(year, song);
         } */

        if (votCounter.hasOwnProperty(votedSongOnX)) {
          votCounter[votedSongOnX].votings = votCounter[votedSongOnX].votings + 1;
        } else {
          votCounter[votedSongOnX] = { "votings": 1 };
        }

        if (results.hasOwnProperty(votedSongOnX)) {
          var addScore;
          switch (topX) {
            case "top1":
              addScore = results[votedSongOnX]["score"] + 5;
              break;
            case "top2":
              addScore = results[votedSongOnX]["score"] + 3;
              break;
            case "top3":
              addScore = results[votedSongOnX]["score"] + 1;
              break;
          }

          results[votedSongOnX]["score"] = addScore;

        } else {
          switch (topX) {
            case "top1":
              results[votedSongOnX] = { "score": 5, song: top100ofYear[votedSongOnX -1] };
              break;
            case "top2":
              results[votedSongOnX] = { "score": 3, song: top100ofYear[votedSongOnX -1] };
              break;
            case "top3":
              results[votedSongOnX] = { "score": 1, song: top100ofYear[votedSongOnX -1] };
              break;
          }
        }
      });
    });

    //add total song votings and voters
    var record, response = [];
    (Object.keys(results)).forEach(function (song) {
      record = { score: results[song].score, votings: votCounter[song].votings, chartpos: results[song].song.pos, title: results[song].song.title, interpret: results[song].song.interpret };
      response.push(record);
    }
    );
    return response;
  }

})
