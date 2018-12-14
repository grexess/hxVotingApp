
/* Import Template Scripts */
import '../imports/charts/header.js';
import '../imports/charts/charts.js';
import '../imports/charts/search/search.js';

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