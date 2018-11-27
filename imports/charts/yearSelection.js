import './yearSelection.html';

import {
    Charts
} from '../collections/charts.js';

Template.yearSelection.helpers({
    charts() {
        return Charts.find({}, { sort: { year: 'desc' } });
    },

    currentYear() {
        return Session.get("currentYear");
    },

    votingCount() {
        return Session.get("votingCount");
    },
});

Template.yearSelection.events({

    'click .selectYear'(event, instance) {
        toggleYearSelection();
    },

    'click .flex-item'(event) {
        event.preventDefault();

        Session.set("currentYear", event.currentTarget.dataset.year)
        /* if (Meteor.user()) {
            $('#toggleBtn')[0].checked = false;
        } */
        $('.flex-menu').hide();

    },
});

function toggleYearSelection() {
    $(".flex-menu").slideToggle(700);
    if ($("#ySel").hasClass('fa-angle-double-down')) {
        $("#ySel").addClass('fa-angle-double-up').removeClass('fa-angle-double-down');
    } else {
        $("#ySel").addClass('fa-angle-double-down').removeClass('fa-angle-double-up');
    }
}

