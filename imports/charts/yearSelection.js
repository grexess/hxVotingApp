import './yearSelection.html';

import {
    Charts
} from '../collections/charts.js';

Tracker.autorun(function () {
    var sessionVal1 = Session.get("votingCount");
    //var sessionVal21 = Session.get("showVotings");

    //$('#toggleBtn')[0].checked = Session.get("showVotings");

    toggleVotingButton();
});

Template.yearSelection.helpers({
    charts() {
        return Charts.find({}, { sort: { year: 'desc' } });
    },

    currentYear() {
        return Session.get("currentYear");
    },

    votingCount() {

        Meteor.call('getVotingCount', Session.get("currentYear"), function (err, response) {
            Session.set("votingCount", response);
        });
        return Session.get("votingCount");
    },

    showToggleButton() {
        return (Session.get("votingCount") > 0);
    }
});

Template.yearSelection.events({

    'click .selectYear'(event, instance) {

        toggleYearSelection();
    },

    'click .flex-item'(event) {
        event.preventDefault();

        Session.set("currentYear", event.currentTarget.dataset.year);
        if ($('#toggleBtn')[0]) {
            $('#toggleBtn')[0].checked = false;
        }
        Session.set("showVotings", false);

        /* if (Meteor.user()) {
            $('#toggleBtn')[0].checked = false;
        } */
        // $('.flex-menu').hide();
        toggleYearSelection();
    },

    'click #toggleBtn'(event, instance) {
        Session.set("showVotings", event.currentTarget.checked)
    }
});

function toggleVotingButton() {
    if (Session.get("votingCount") > 0) {

        //$('#toggleBtn').show();
        $('#toggleBtn').prop('disabled', false);
        $(".toggle--off").css("color", "#47a3da");
    } else {
        //$('#toggleBtn').hide();
        $("#toggleBtn").prop('disabled', true);
        $(".toggle--off").css("color", "#9E9E9E");
    }
}

function toggleYearSelection() {
    $(".flex-menu").slideToggle(700);
    if ($("#ySel").hasClass('fa-angle-double-down')) {
        $("#ySel").addClass('fa-angle-double-up').removeClass('fa-angle-double-down');
    } else {
        $("#ySel").addClass('fa-angle-double-down').removeClass('fa-angle-double-up');
    }
}

