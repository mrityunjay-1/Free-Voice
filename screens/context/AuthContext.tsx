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
      state2.userId = action.payload.uid;
      state2.avatar = action.payload.avatar;
      state2.token = action.payload.token;
      state2._id = action.payload._id;
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
  
  // initial state for authentication
  const state1 = {name: "", userId: "" , avatar: "", _id: "", isLoggedIn: false, api_link}

  const [data, dispatch] = useReducer(reducer, state1);

  
  const signIn = async ({userId, password}: any) => {
    try{
      const res = await axios.post(api_link + "/signin",  {userId, password});
      if(res.status == 200 && res.data.message == "okay"){

        // saving locally
        await SecureStore.setItemAsync("token", res.data.token);
        await SecureStore.setItemAsync("name", res.data.name);
        await SecureStore.setItemAsync("uid", res.data.uid);
        await SecureStore.setItemAsync("_id", res.data._id);
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
    await SecureStore.deleteItemAsync('uid');
    await SecureStore.deleteItemAsync('avatar');
    await SecureStore.deleteItemAsync('_id');

    dispatch({type: 'signout'});
  } 
  
  const launchApp = async () => {
    // console.log("launch app");
    // getting local data
    const token = await SecureStore.getItemAsync('token');
    const name = await SecureStore.getItemAsync('name');
    const uid = await SecureStore.getItemAsync('uid');
    const avatar = await SecureStore.getItemAsync('avatar');
    const _id = await SecureStore.getItemAsync('_id');

    // console.log(token, name, userId, avatar);    

    if(!token || !name || !uid || !_id){
      return null;
    }
    dispatch({type: 'signedIn', payload: {token, name, uid, avatar, _id}});
  };

  return (
    <ContextData.Provider value={{data, signIn, signUp, signOut, launchApp}}>
      {children}
    </ContextData.Provider>
  );
};

export default ContextData;
export { AuthContext };