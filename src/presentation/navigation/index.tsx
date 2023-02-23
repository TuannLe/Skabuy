import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function index() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}
