// third-party
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useAppDispatch, useSelector as useAppSelector} from 'react-redux';
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {persistStore, persistReducer} from 'redux-persist';
import React from 'react';
import ReactDOM from 'react-dom';

// project imports
import rootReducer from "./reducer";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

const pReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: pReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false, immutableCheck: false})
});

const persister = persistStore(store);

const {dispatch} = store;

const useDispatch = useAppDispatch;
const useSelector = useAppSelector;

export {store, persister, dispatch, useSelector, useDispatch};


