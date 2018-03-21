import { createStore, applyMiddleware, Store } from 'redux';
import { IStoreState } from '../types';
import rootReducer from '../reducers/rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import initialState from '../reducers/initialState';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'snake-ai',
  storage,
  stateReconciler: autoMergeLevel2
};

const peristedReducer = persistReducer(persistConfig, rootReducer);

export interface IConfiguredStore {
  store: Store<IStoreState>;
  persistor: Persistor;
}

export default (): IConfiguredStore => {
  const composeEnhancers = composeWithDevTools({});
  let store = createStore<IStoreState>(
      peristedReducer,
      initialState,
      composeEnhancers(applyMiddleware(    
      )),
    );
  let persistor = persistStore(store);
  return { store, persistor };
};
