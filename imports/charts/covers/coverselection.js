import './coverselection.html';
import { Images } from '../../collections/images';

var myIndex, timer;

Template.coverselection.onRendered(function(){
    myIndex = 0;
    carousel();
})

Template.coverselection.events({

    'click .zPlus'() {
        plusDivs(-1);
    },

    'click .zCurrentDiv'(event) {
        currentDiv(event.currentTarget.dataset.target);
    },

    'ended #previewAudio'() {
        Session.set('isPlaying', false);
        $('#playPreview').removeClass('fa-pause');
        $('#playPreview').addClass('fa-play');
    },

    'click #closeImgModal'(event, instance) {
        Session.set('imageOverlay', false);
        //Session.set('title', false);
        //Session.set('interpret', false);
        //Session.set('coverImages', []);
        //Session.set('previewURL', false);
        clearTimeout(timer);
    },

    'click #playPreview'() {

        if (!Session.get('isPlaying')) {
            document.getElementById('previewAudio').play();
            Session.set('isPlaying', true);
            $('#playIcn').removeClass('fa-play');
            $('#playIcn').addClass('fa-pause');
        } else {
            document.getElementById('previewAudio').pause();
            Session.set('isPlaying', false);
            $('#playIcn').removeClass('fa-pause');
            $('#playIcn').addClass('fa-play');
        }

    }
})

Template.coverselection.helpers({

    title: function () {
        return Session.get('title');
    },

    artist: function () {

        var img = Images.findOne({ "name": Session.get("currentYear") + "-" + Session.get("currentSong") + ".jpg" });

        if (img) {
            return img.artist;
         } else {
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
        }
    },

    interpret: function () {
        return Session.get('interpret');
    },

    coverUrl: function () {
        return Session.get('coverImages');
    },

    previewURL: function () {
        return Session.get('previewURL');
    },
});

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 0}    
    x[myIndex].style.display = "block";  
    timer = setTimeout(carousel, 2000); // Change image every 2 seconds
  }
