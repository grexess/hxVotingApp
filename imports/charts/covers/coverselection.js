import './coverselection.html';

import {
    Charts
} from '../../collections/charts.js';

Template.coverselection.events({

    'click #closeImgModal'(event, instance) {
        Session.set('imageOverlay', false);
    },

    'click #playPreview'() {

        var myAudio = document.getElementById('previewAudio');

        if (myAudio.paused == false) {
            myAudio.pause();
            $('#playPreview').removeClass('fa-pause');
            $('#playPreview').addClass('fa-play');
        } else {
            myAudio.play();
            $('#playPreview').removeClass('fa-play');
            $('#playPreview').addClass('fa-pause');
        }
    }
})

Template.coverselection.helpers({

    coverUrl: function () {
        return Session.get('coverImages');
    },

    previewURL: function () {
        return Session.get('previewURL');
    },
});


