import './header.html';

Template.charts.events({

    /* Menu opend */
    'click #menuOpen'(event, instance) {
        var x = document.getElementById("mySidebar");
        x.style.width = "100%";
        x.style.fontSize = "40px";
        x.style.paddingTop = "10%";
        x.style.display = "block";
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