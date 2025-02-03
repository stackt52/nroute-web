// third-party
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import dialogReducer from './slices/dialog';
import localLocationReducer from './slices/localLocation';
import miscellaneousReducer from './slices/miscellaneous';
import costCenterReducer from './slices/costCenter';
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import travelAuthorizationReducer from './slices/travelAuthorization';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    dialog: dialogReducer,
    localLocation: localLocationReducer,
    miscellaneous: miscellaneousReducer,
    costCenter: costCenterReducer,
    travelAuthorization: travelAuthorizationReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban: kanbanReducer,
    customer: customerReducer,
    contact: contactReducer,
    product: productReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    user: userReducer
});

export default reducer;

