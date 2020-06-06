import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import instagramReducer from './instagram/instagram.reducer';
import youtubeReducer from './youtube/youtube.reducer';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['cart'],
};

const rootReducer = combineReducers({
  user: userReducer,
  instagram: instagramReducer,
  youtube: youtubeReducer,
});

export default persistReducer(persistConfig, rootReducer);
