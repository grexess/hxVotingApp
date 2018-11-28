import './charts.html';

/* Import Template Scripts */
import './header.js';
import '../login/login.js';
import './songItems.js';
import './yearSelection.js';


Template.charts.onCreated(function () {

    //Load MiniMongo
    Meteor.subscribe('charts');
    Session.set("votingCount", "0");
    Session.set("currentYear", "2017");
    Session.set("imageOverlay", false);
});


