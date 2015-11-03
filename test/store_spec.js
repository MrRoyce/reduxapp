/*
 * We should be able to make a store,
 * read its initial state, dispatch action,
 * and witness the changed state:
 *
 */

import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();  // Make the store
    expect(store.getState()).to.equal(Map());  //Check intial state

    store.dispatch({
      type    : 'SET_ENTRIES',
      entries : ['Trainspotting', '28 Days Later']
    });  // Dispatch an action to the store

    expect(store.getState()).to.equal(fromJS({
      entries : ['Trainspotting', '28 Days Later']
    })); // Check state after dispatching SET_ENTRIES action
  });

});
