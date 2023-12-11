/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */


import { Provider } from "react-redux";
import { store } from "../store";
import MainSgaComponent from "./mainsagacomponent";
 

const MainReduxSagaProviderComponent =()=>{
   return (
       <Provider store={store}>
           <MainSgaComponent />
       </Provider>
   );
};


export default MainReduxSagaProviderComponent;