import './charts.html';


/* Import Template Scripts */
import './header.js';
import './songItems.js';
import './votingItems.js';
import './yearSelection.js';

import './search/search.js';

Template.charts.onCreated(function () {

    //Load MiniMongo
    Meteor.subscribe('charts');
    Meteor.subscribe('votings');

    Session.set("votingCount", "0");
    Session.set("currentYear", "2017");
    Session.set("imageOverlay", false);
    Session.set("showVotings", false);
    Session.set("showSearch", false);
});

Template.charts.helpers({

    showVotings: function () {
        return Session.get("showVotings");
    },

    showSearch:
    function () {
        return Session.get("showSearch");
    },
});


