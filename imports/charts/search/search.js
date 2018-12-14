import './search.html';

import {
    Charts
} from '../../collections/charts.js';

Template.search.onCreated = function () {
    Meteor.subscribe('charts');
    Session.set('searchResult', []);
    //this.data.search = new ReactiveVar([]);
};

Template.search.helpers({
    searchresults: function () {
        return Session.get('searchResult');
    }
});

Template.search.events({

    /* Search */
    /*     'click #triggerSearch': function (event) {
            event.preventDefault();
            doSearch($('#search').val());
        }, */
    'keyup #search': function (event) {

        if ($('#search').val().length > 2) {
            event.preventDefault();
            doSearch($('#search').val());
        }
    },

    /* play song */
    'click .playPreview': function (event) {
        event.preventDefault();
        let song = event.currentTarget.dataset.target;
        getPreviewURL(song);
        var url = Session.get('previewURL');
        var audio = $('audio[data-target="' + song + '"]')[0];
        $(audio).attr('src', url);

        if(!Session.get('isPlaying')){
            audio.play();
            Session.set('isPlaying', true);
            $(event.currentTarget).removeClass('fa-play');
            $(event.currentTarget).addClass('fa-pause');
           }else{
            audio.pause();
            Session.set('isPlaying', false);
            $(event.currentTarget).removeClass('fa-pause');
            $(event.currentTarget).addClass('fa-play');
           }
    },

    'click #closeSearch': function (){
        FlowRouter.go("/");
    }

})

function getPreviewURL(song) {

    var url = "https://itunes.apple.com/search?term=" + encodeURI(song) + "&limit=1";

    $.ajax({
        type: 'GET',
        async: false,
        url: url,
        contentType: 'application/json',
        dataType: 'jsonp',
        responseType: 'application/json',
        xhrFields: {
            withCredentials: false
        },
        success: function (data) {
            Session.set('previewURL', data.results[0].previewUrl);
        },
        error: function (error) {
            console.log('E400');
        }
    });
}

function doSearch(searchFor) {
    var getAll = [];
    var searchResult = Charts.find({
        $or: [{
            "songs.interpret": {
                $regex: new RegExp(searchFor, "i")
            }
        }, {
            "songs.title": {
                $regex: new RegExp(searchFor, "i")
            }
        }]
    }).fetch();

    var songsOfYear;
    searchResult.forEach(function (year) {
        var currYear = year.year;
        songsOfYear = Charts.findOne({ "_id": year._id }, { fields: { "songs": 1, "_id": 0 } });
        let result = songsOfYear.songs.filter(function (song) {
            return (song.interpret.toUpperCase().includes(searchFor.toUpperCase()) || song.title.toUpperCase().includes(searchFor.toUpperCase()));
        });
        result.forEach(function (song) {
            song.year = currYear;
        });
        //merge array
        while (result.length) {
            getAll.push(result.shift())
        }
    });
    Session.set('searchResult', getAll);
}