import './charts.html';

/*import login templates */
import '../login/login.js';
import '../login/custom.js';
import '../login/customInput.js';
import '../login/customSubmit.js';

/* Import Template Scripts */
import './header.js';
import './songItems.js';
import './votingItems.js';
import './yearSelection.js';

Template['override-at_form'].replaces('atForm');
Template['override-atTextInput'].replaces('atTextInput');
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');


Template.charts.onCreated(function () {

    //Load MiniMongo
    Meteor.subscribe('charts');
    Meteor.subscribe('votings');

    Session.set("votingCount", "0");
    Session.set("currentYear", "2017");
    Session.set("imageOverlay", false);
    Session.set("showVotings", false);
});

Template.charts.helpers({

    showVotings: function() {
        return Session.get("showVotings");
    },
});


