import '/imports/startup/both';

/* Import Template Scripts */
import '../imports/charts/header.js';
import '../imports/charts/charts.js';
import '../imports/charts/search/search.js';

import '../imports/common/commonheader.js'
import '../imports/common/privacy.js'
import '../imports/common/impressum.js'
import '../imports/common/about.js'

import './main.html';


FlowRouter.route('/', {
  name: 'Go.home',
  action: function() {
    BlazeLayout.render('App_body', { top: "header", main: "charts" });
  }
});

FlowRouter.route('/search', {
  name: 'Search.open',
  action: function () {
      console.log('open Search panel');
      BlazeLayout.render("App_body", {
        top: "header", main: "search"
      });
  }
});

FlowRouter.route('/impressum', {
  name: 'Go.impressum',
  action: function() {
    BlazeLayout.render('App_body', { top: "commonheader", main: "impressum" });
  }
});

FlowRouter.route('/about', {
  name: 'Go.about',
  action: function() {
    BlazeLayout.render('App_body', { top: "commonheader", main: "about" });
  }
});

FlowRouter.route('/privacy', {
  name: 'Go.privacy',
  action: function() {
    BlazeLayout.render('App_body', { top: "commonheader", main: "privacy" });
  }
});