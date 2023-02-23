import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoriteScreen from '../screen/FavoriteScreen';
import ProfileScreen from '../screen/ProfileScreen';
import BottomNavigator from './BottomNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name="Home" component={BottomNavigator} />
            <Drawer.Screen name="Favorite" component={FavoriteScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;