import './header.html';

/*import login templates */
import '../login/login.js';
import '../login/custom.js';
import '../login/customInput.js';
import '../login/customSubmit.js';

Template['override-at_form'].replaces('atForm');
Template['override-atTextInput'].replaces('atTextInput');
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');

Accounts.onLogin(function (user) {
    if (user.type === "password") {
      $('#id01').hide();
    }
  })

Template.header.helpers({

    userEmail: function (user) {
        if (user.emails && user.emails.length > 0) {
            return user.emails[0].address;
        }
        return 'no email';
    }
});

Template.header.events({

    /* Menu opend */
    'click #menuOpen'(event, instance) {
        var x = document.getElementById("mySidebar");
        x.style.width = "100%";
        x.style.fontSize = "40px";
        x.style.paddingTop = "10%";
        x.style.display = "block";
    },

    'click #searchOpen'(event, instance) {
        FlowRouter.go('Search.open', { });
    },

    /* Menu closed */
    'click #menuClose'(event, instance) {
        document.getElementById("mySidebar").style.display = "none";
    },

    /* LogOFF */
    'click #logoffBtn'(event, instance) {
        event.preventDefault();
        Meteor.logout();
        document.getElementById("mySidebar").style.display = "none";
    },
})