import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/* Import Collections */
import {
  Votings
} from '../imports/collections/charts.js';

/* Import Template Scripts */
import '../imports/charts/charts.js';

import './main.html';


Accounts.onLogin(function (user) {
  if (user.type === "password") {
    $('#id01').hide();
  }
})