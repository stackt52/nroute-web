'use client';

import PropTypes from 'prop-types';
import {createContext, useState, useContext} from 'react';

// project import
import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

// initial state
const initialState = {
    ...defaultConfig,
    onChangeMenuOrientation: () => {
    },
    onChangeMiniDrawer: () => {
    },
    onChangeMode: () => {
    },
    onChangePresetColor: () => {
    },
    onChangeLocale: () => {
    },
    onChangeDirection: () => {
    },
    onChangeContainer: () => {
    },
    onChangeFontFamily: () => {
    },
    onChangeBorderRadius: () => {
    },
    onChangeOutlinedField: () => {
    },
    onReset: () => {
    }
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

export const useConfig = () => useContext(ConfigContext);

function ConfigProvider({children}) {
    const [themeMode, setThemeMode] = useState("light")

    const toggleThemeMode = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const [config, setConfig] = useLocalStorage('berry-config-next-js', {
        menuOrientation: initialState.menuOrientation,
        miniDrawer: initialState.miniDrawer,
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        mode: initialState.mode,
        presetColor: initialState.presetColor,
        i18n: initialState.i18n,
        themeDirection: initialState.themeDirection
    });

    const onChangeMenuOrientation = (menuOrientation) => {
        setConfig({
            ...config,
            menuOrientation
        });
    };

    const onChangeMiniDrawer = (miniDrawer) => {
        setConfig({
            ...config,
            miniDrawer
        });
    };

    const onChangeMode = (mode) => {
        setConfig({
            ...config,
            mode
        });
    };

    const onChangePresetColor = (presetColor) => {
        setConfig({
            ...config,
            presetColor
        });
    };

    const onChangeLocale = (i18n) => {
        setConfig({
            ...config,
            i18n
        });
    };

    const onChangeDirection = (themeDirection) => {
        setConfig({
            ...config,
            themeDirection
        });
    };

    const onChangeContainer = (container) => {
        setConfig({
            ...config,
            container
        });
    };

    const onChangeFontFamily = (fontFamily) => {
        setConfig({
            ...config,
            fontFamily
        });
    };

    const onChangeBorderRadius = (event, newValue) => {
        setConfig({
            ...config,
            borderRadius: newValue
        });
    };

    const onChangeOutlinedField = (outlinedFilled) => {
        setConfig({
            ...config,
            outlinedFilled
        });
    };

    const onReset = () => {
        setConfig({...defaultConfig});
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeMenuOrientation,
                onChangeMiniDrawer,
                onChangeMode,
                onChangePresetColor,
                onChangeLocale,
                onChangeDirection,
                onChangeContainer,
                onChangeFontFamily,
                onChangeBorderRadius,
                onChangeOutlinedField,
                onReset,
                themeMode,
                toggleThemeMode
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}

ConfigProvider.propTypes = {
    children: PropTypes.node
};

export {ConfigProvider, ConfigContext};
