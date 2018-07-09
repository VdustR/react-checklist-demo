import { push } from 'connected-react-router';
import store from 'Src/store';

export default {
  push: str => store.dispatch(push(str)),
};
