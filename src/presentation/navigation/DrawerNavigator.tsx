import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ROUTER } from '../constants';
import BottomNavigator from './BottomNavigator';
import { AllProductScreen, ProfileScreen } from '../screen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name={ROUTER.HOME_TAB} component={BottomNavigator} />
            <Drawer.Screen name={ROUTER.ALL_PRODUCTS_SCREEN} component={AllProductScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;