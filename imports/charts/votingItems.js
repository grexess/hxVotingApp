import './votingItems.html';

import { Votings } from '../collections/votings';
import { Charts } from '../collections/charts.js';

Template.votingItems.helpers({

    votingItems() {

        Meteor.call('getVotingItems', Session.get("currentYear"), function (err, response) {

            var votings = response;
            
            votings.sort((a, b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));

            $.each(votings, function (idx, value) {
                value.place = idx +1 ;
            });
            Session.set("votingItems", response);
        });
        return Session.get('votingItems');
    }
});
