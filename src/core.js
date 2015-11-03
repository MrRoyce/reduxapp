/*
 * Core application functions
 */

'use strict';

import {List, Map} from 'immutable';

// Initial state is an empty map
export const INITIAL_STATE = Map();

/*
 * Utility function to Get the winners
 */
function getWinners (myVote) {

  if (!myVote) return [];

  const [a, b] = myVote.get('pair'),
        aVotes = myVote.getIn(['tally', a], 0),
        bVotes = myVote.getIn(['tally', b], 0);

  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

/*
 * Set the entries into the state
 */
export function setEntries (state, entries) {
  return state.set('entries', List(entries));
}

export function next (state) {

  const entries = state.get('entries')
    .concat(getWinners(state.get('vote')));

  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
      return state.merge({
        vote    : Map({pair : entries.take(2)}),
        entries : entries.skip(2)
      });
  }
}

/*
* Using updateIn makes this pleasingly succinct.
* What the code expresses is "reach into the nested
* data structure path ['vote', 'tally', 'Trainspotting'],
* and apply this function there.
* If there are keys missing along the path,
* create new Maps in their place.
* If the value at the end is missing, initialize it with 0".
 */
export function vote (voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}
