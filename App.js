import * as React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';

import * as Font from 'expo-font';
import HomePage from './pages/HomePage';
import FromPage from './pages/FromPage';
import ToPage from './pages/ToPage';
import QuantityPage from './pages/QuantityPage';
import JourneysPage from './pages/JourneysPage';
import DetailsPage from './pages/DetailsPage';
import ConfirmationPage from './pages/ConfirmationPage';
import CustomSearchConfirmationPage from './pages/CustomSearchConfirmationPage';
import PaymentPage from './pages/PaymentPage';
import FinishPage from './pages/FinishPage';

import JourneyButtons from './components/JourneyButtons'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import store from "./redux/store";

let fontLoaded = false;

const HomeStack = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
          elevation:0
        },
        headerTitleStyle: {
          // fontFamily: (fontLoaded) ? 'varela-round' : 'roboto'
        },
        // headerLeft: ({ focused, tinColor }) => (
        //   <MenuButton navigation={navigation}></MenuButton>
        // ),
        headerTintColor: 'black',
        title: 'goPamoja!'
      }
    }
  },
  From: {
    screen: FromPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
        },
        headerTintColor: 'black',
        title: 'From'
      }
    }
  },
  To: {
    screen: ToPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
        },
        headerTintColor: 'black',
        title: 'To'
      }
    }
  },
  Quantity: {
    screen: QuantityPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
        },
        headerTintColor: 'black',
        title: 'Quantity'
      }
    }
  },
  Journeys: {
    screen: JourneysPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerRight: (
          <JourneyButtons navigation={navigation}></JourneyButtons>
        ),
        headerStyle: {
          backgroundColor: '#ffcb37',
          elevation:0
        },
        headerTintColor: 'black',
        title: 'Journeys'
      }
    }
  },
  Details: {
    screen: DetailsPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
        },
        headerTintColor: 'black',
        title: 'Details'
      }
    }
  },
  Confirmation: {
    screen: ConfirmationPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
        },
        headerTintColor: 'black',
        title: 'Confirmation'
      }
    }
  },
  Payment: {
    screen: PaymentPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
        },
        headerTintColor: 'black',
        title: 'Payment'
      }
    }
  },
  Finish: {
    screen: FinishPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
        },
        headerTintColor: 'black',
        title: 'Finish'
      }
    }
  },
  CustomSearchConfirmation: {
    screen: CustomSearchConfirmationPage,
    navigationOptions: ({navigation}) =>  {
      return {
        headerStyle: {
          backgroundColor: '#ffcb37',
        },
        headerTintColor: 'black',
        title: 'Confirmation'
      }
    }
  },
});

//For React Navigation Version 2+
//export default App;
//For React Navigation Version 3+
let Navigation = createAppContainer(HomeStack);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
