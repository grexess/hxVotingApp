import './songItems.html';
/* import subtemplates */
import './covers/coverselection.js';

import {
    Charts
} from '../collections/charts.js';
import { Votings } from '../collections/votings';

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
    },

    setChecked(pos, top){

        var votingPerYear = Votings.findOne();
        if(votingPerYear[Session.get("currentYear")] && votingPerYear[Session.get("currentYear")][top] && votingPerYear[Session.get("currentYear")][top] === ""+pos){
            return true;
        }
        return false;
    },

     getColor(pos){

        return "";
        /* var votingPerYear = Votings.findOne();
        if(votingPerYear[Session.get("currentYear")] && votingPerYear[Session.get("currentYear")]["top1"] && votingPerYear[Session.get("currentYear")]["top1"] === ""+pos){
            return "gold";
        } */
    }
});

Template.songItems.events({

    'click .w3-radio'(event) {

        if (event.currentTarget.checked && !alreadyVotedCheck(event.currentTarget)) {

            var votingPerYear = Votings.find().fetch();

            if (votingPerYear.length === 0) {
                //user has not voted yet
                id = Votings.insert({
                    votedBy: Meteor.user().emails[0].address,
                    [Session.get("currentYear")]: { [event.currentTarget.name]: event.currentTarget.value },
                    createdAt: new Date()
                }, function (error, result) {
                    if (error) console.log(error); //info about what went wrong
                    if (result) {
                        buildVoteMessage(Session.get("currentYear"), event.currentTarget.value, event.currentTarget.name.substring(3, 4));
                    } //the _id of new object if successful);
                });
            } else {
                //user voted already
                //update or add place
                var setObject = {};
                setObject[Session.get("currentYear") + "." + event.currentTarget.name] = event.currentTarget.value;
                Votings.update({ _id: votingPerYear[0]._id }, { $set: setObject }, function (error, result) {
                    if (error) console.log(error); //info about what went wrong
                    if (result) {
                        buildVoteMessage(Session.get("currentYear"), event.currentTarget.value, event.currentTarget.name.substring(3, 4));
                    } //the _id of new object if successful);
                });
            }
        }
    },

    'click .openOverlay'(event, instance) {
        Session.set('currentSong', event.currentTarget.dataset.song - 1);
        Session.set('imageOverlay', true);

        getCovers();
    }

});

function alreadyVotedCheck(target) {


    if ($('.w3-radio[value="' + target.value + '"]:checked').length > 1) {
        Bert.alert('Diesen Song hast Du schon gevoted!', 'danger', 'fixed-top');
        target.checked = false;
        return true;
    }

    return false;

    //set previous checkbox
    //var valueStr = year + "-" + tops[year][event.currentTarget.name];
    //$('input[value="' + valueStr + '"][name="' + event.currentTarget.name + '"]')[0].checked = true;

}

function getCovers() {

    var currentSong = Session.get("currentSong");
    var year = Session.get("currentYear");

    var songs = Charts.findOne({ year: year }).songs;
    var song = { title: songs[currentSong].title, interpret: songs[currentSong].interpret };
    Session.set('title', songs[currentSong].title);
    Session.set('interpret', songs[currentSong].interpret);

    var url = "https://itunes.apple.com/search?term=" + encodeURI(song.interpret) + "%20" + encodeURI(song.title) + "&limit=25";

    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        dataType: 'jsonp',
        responseType: 'application/json',
        xhrFields: {
            withCredentials: false
        },
        success: function (data) {


            var aImgUrl = [];

            data.results.forEach(function (url) {
                if (!aImgUrl.includes(url.artworkUrl100)) {
                    aImgUrl.push(url.artworkUrl100);
                }
            });
            Session.set('coverImages', aImgUrl);
            Session.set('previewURL', data.results[0].previewUrl);
        },
        error: function (error) {
            Session.set('coverImages', []);
        }
    });
}

function buildVoteMessage(year, place, top) {

    var topOfYear = Charts.findOne({ year: year, });
    Bert.alert(topOfYear.songs[place - 1].interpret + " mit " + topOfYear.songs[place - 1].title + ' ist ' + year + ' Deine Nummer ' + top + '!', 'success', 'growl-top-right');
}
