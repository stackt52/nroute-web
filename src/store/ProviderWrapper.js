'use client';

import PropTypes from 'prop-types';


// map styles
// import 'mapbox-gl/dist/mapbox-gl.css';

// third-party
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// project-import
import Locales from 'components/ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import Snackbar from 'components/ui-component/extended/Snackbar';
import RTLLayout from 'components/ui-component/RTLLayout';
import Notistack from 'components/ui-component/third-party/Notistack';

import { store} from 'store';
import ThemeCustomization from 'themes';
import { persister } from './index';

import {ConfigProvider} from 'contexts/ConfigContext';

import {JWTProvider as AuthProvider} from 'contexts/JWTContext';
import AppDialog from "../components/dialog/AppDialog";
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
// import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';

export default function ProviderWrapper({children}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persister}>
                    <ConfigProvider>
                        <ThemeCustomization>
                            <RTLLayout>
                                <Locales>
                                    <NavigationScroll>
                                        <AuthProvider>
                                            <Notistack>
                                                <AppDialog/>
                                                <Snackbar/>
                                                {children}
                                            </Notistack>
                                        </AuthProvider>
                                    </NavigationScroll>
                                </Locales>
                            </RTLLayout>
                        </ThemeCustomization>
                    </ConfigProvider>
                </PersistGate>
            </Provider>
        </LocalizationProvider>
    );
}

ProviderWrapper.propTypes = {
    children: PropTypes.node
};


