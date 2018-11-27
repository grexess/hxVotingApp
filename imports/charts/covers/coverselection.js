import './coverselection.html';

Template.coverselection.events({

    'click .close'(event, instance) {
        document.getElementById('styledModal').close();
    },
})