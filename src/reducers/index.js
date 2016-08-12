import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  chat: chatReducer,
});

export default rootReducer;
