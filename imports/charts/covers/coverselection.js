import './coverselection.html';

Template.coverselection.events({

    'ended #previewAudio'() {
        Session.set('isPlaying', false);
        $('#playPreview').removeClass('fa-pause');
        $('#playPreview').addClass('fa-play');
    },

    'click #closeImgModal'(event, instance) {
        Session.set('imageOverlay', false);
    },

    'click #playPreview'() {

       if(!Session.get('isPlaying')){
        document.getElementById('previewAudio').play();
        Session.set('isPlaying', true);
        $('#playPreview').removeClass('fa-play');
        $('#playPreview').addClass('fa-pause');
       }else{
        document.getElementById('previewAudio').pause();
        Session.set('isPlaying', false);
        $('#playPreview').removeClass('fa-pause');
        $('#playPreview').addClass('fa-play');
       }

    }
})

Template.coverselection.helpers({

    title: function () {
        return Session.get('title');
    },

    interpret:  function () {
        return Session.get('interpret');
    },

    coverUrl: function () {
        return Session.get('coverImages');
    },

    previewURL: function () {
        return Session.get('previewURL');
    },
});
