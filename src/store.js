/*
 * Create Redux state contanier (store)
 */

import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore () {
  return createStore(reducer);
}
