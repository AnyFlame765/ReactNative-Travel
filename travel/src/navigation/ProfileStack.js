import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen';


const Stack = createNativeStackNavigator();


export default function ProfileStack() {
  return (
   <Stack.Navigator>
        <Stack.Screen 
        name='profileS'
        component={ScreendePerfil}
        options={{title:'Perfil'}}
        />
         
   </Stack.Navigator>
  )
}