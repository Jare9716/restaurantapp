
import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NuevaOrden from './Views/NuevaOrden';
import Menu from './Views/Menu';
import DetallePlatillo from './Views/DetallePlatillo';
import FormularioPlatillo from './Views/FormularioPlatillo';
import ProgresoPedido from './Views/ProgresoPedido';
import ResumenPedido from './Views/ResumenPedido';

//Components
import BotonResumen from './components/ui/BotonResumen';

//Importar state del context
import FirebaseState from './context/firebase/firebaseState';
import PedidosState from './context/pedidos/pedidosState';

const Stack = createStackNavigator()

const App = () => {
  return (
    <>
      <FirebaseState>
          <PedidosState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle:{
                  backgroundColor: '#FFDA00'
                },
                headerTitleStyle:{
                  fontWeight: 'bold'
                },
                headerTintColor: '#000'
                  
              }}
            >
              <Stack.Screen
                name='NuevaOrden'
                component={NuevaOrden}
                options={{
                  title: 'Nueva Orden'
                }}
              />
              <Stack.Screen
                name='Menu'
                component={Menu}
                options={{
                  title: 'Menú',
                  headerRight: props => <BotonResumen/>
                }}
              />
              <Stack.Screen
                name='DetallePlatillo'
                component={DetallePlatillo}
                options={{
                  title: 'Detalle Del Platillo'
                }}
              />
              <Stack.Screen
                name='FormularioPlatillo'
                component={FormularioPlatillo}
                options={{
                  title: 'Formulario Del Platillo'
                }}
              />
              <Stack.Screen
                name='ProgresoPedido'
                component={ProgresoPedido}
                options={{
                  title: 'Progreso Del Pedido'
                }}
              />
              <Stack.Screen
                name='ResumenPedido'
                component={ResumenPedido}
                options={{
                  title: 'Resumen Del Pedido'
                }}
              />          
            </Stack.Navigator>
          </NavigationContainer>
          </PedidosState>
      </FirebaseState>
    </>
  );
};

export default App;
