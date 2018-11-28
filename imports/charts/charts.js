import './charts.html';

/*import login templates */
import '../login/login.js';
import '../login/custom.js';
import '../login/customInput.js';
import '../login/customSubmit.js';

/* Import Template Scripts */
import './header.js';
import './songItems.js';
import './yearSelection.js';

Template['override-at_form'].replaces('atForm');
Template['override-atTextInput'].replaces('atTextInput');
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');


Template.charts.onCreated(function () {

    //Load MiniMongo
    Meteor.subscribe('charts');
    Session.set("votingCount", "0");
    Session.set("currentYear", "2017");
    Session.set("imageOverlay", false);
});


