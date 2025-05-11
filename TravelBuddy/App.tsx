import React from 'react';
import StackWrapper from './Components/StackWrapper';
import { Auth0Provider } from 'react-native-auth0';

const App=()=>{
// const [switchState,setSwitchState]=useState(true);
return(
  
  <Auth0Provider
      domain={'dev-o63qrewp2pkenlpm.us.auth0.com'}
      clientId={'OwFuoyoUleiBAbScnFRLEy4955gVPs5h'}>
      <StackWrapper />
    </Auth0Provider>
);
}

export default App;


// //cd android     ./gradlew clean
// // ./gradlew assemblerelease



