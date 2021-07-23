import React, {useReducer, createContext} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ContextData = createContext({});

const reducer = (state: any, action: any) => {
  const state2 = {...state};
  switch(action.type){
    case "signedIn":
      // saving token to expo-secure-store

      state2.isLoggedIn = true,
      state2.name = action.payload.name;
      state2.userId = action.payload.userId;
      state2.avatar = action.payload.avatar;
      state2.token = action.payload.token;
      return state2;
    
    case "signout":
      state2.isLoggedIn = false;
      return {name: "", userId: "" , avatar: "", isLoggedIn: false};
    
    default:
      return state;
  }
}


const AuthContext = ({children}: any) => {
  const api_link = process.env.NODE_ENV == "development" ? "http://192.168.43.148:8080" : "https://nodeapp-320304.df.r.appspot.com";
  const state1 = {name: "", userId: "" , avatar: "", isLoggedIn: false, api_link}

  const [data, dispatch] = useReducer(reducer, state1);

  
  const signIn = async ({userId, password}: any) => {
    try{
      const res = await axios.post(api_link + "/signin",  {userId, password});
      if(res.status == 200 && res.data.message == "okay"){

        // saving locally
        await SecureStore.setItemAsync("token", res.data.token);
        await SecureStore.setItemAsync("name", res.data.name);
        await SecureStore.setItemAsync("userId", res.data.uid);
        !res.data.avatar ? await SecureStore.setItemAsync('avatar', ""): await SecureStore.setItemAsync("avatar", res.data.avatar);

        
        // this is safe place to update my central data state
        dispatch({type: 'signedIn', payload: res.data});
      }
    }catch(e){
      console.log("error = ", e);
      alert("somethign went wrong!");
    }
  }
    
  const signUp = async ({name, email, userId, password, cb}: any) => {
    try{
      const res = await axios.post(api_link + "/create", {name, email, userId, password});
      if(res.status == 200 && res.data.message == "okay"){
        // this is safe place to update my central data state
        cb();
      }
    }catch(e){
      console.log(e);
      alert("somethign went wrong!");
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('name');
    await SecureStore.deleteItemAsync('userId');
    await SecureStore.deleteItemAsync('avatar');

    dispatch({type: 'signout'});
  } 
  
  const launchApp = async () => {
    // console.log("launch app");
    // getting local data
    const token = await SecureStore.getItemAsync('token');
    const name = await SecureStore.getItemAsync('name');
    const userId = await SecureStore.getItemAsync('userId');
    const avatar = await SecureStore.getItemAsync('avatar');

    // console.log(token, name, userId, avatar);    

    if(!token || !name || !userId ){
      return null;
    }
    dispatch({type: 'signedIn', payload: {token, name, userId, avatar}});
  };

  return (
    <ContextData.Provider value={{data, signIn, signUp, signOut, launchApp}}>
      {children}
    </ContextData.Provider>
  );
};

export default ContextData;
export { AuthContext };