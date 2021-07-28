import React from 'react';
import {Text, View, ScrollView, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ContextData from '../context/AuthContext';


const Setting = (props) => {  
  return (
    <Pressable onPress={props.cb_onpress}>
      <View style={{ borderColor: 'grey', borderBottomWidth: 1, display: 'flex', flexDirection: 'row', width: '100%',padding: 15, alignItems: 'center', backgroundColor: 'rgba(0, 0, 255, 0.1)'}}>
        <Text style={{width: '10%'}}> {props.icon} </Text>
        <Text style={{width: '90%'}}> {props.name} </Text>
      </View>
    </Pressable>
  );
}

const ProfileSettingsScreen = () => {
  const {signOut}: any = React.useContext(ContextData);

  return (
    <>
      {/* <Setting name="My Profile" /> */}
      {/* <Setting name="Delete Account" /> */}
      
      <Setting
        name="Logout"
        icon={<AntDesign name="logout" size={20} />} 
        cb_onpress={() => signOut() }
      />



    </>
  );
};

export default ProfileSettingsScreen;