import './search.html';

triggerSearch


Template.header.events({

    /* Search */
    'click #triggerSearch'(event, instance) {

        var searchResult = Charts.find({ title: event.currentTarget });
    },
})