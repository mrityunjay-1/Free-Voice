import React, {useState, useContext} from 'react';
import {TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import ContextData from '../context/AuthContext';

const SignIn = ({navigation}: any) => {
  const {signIn}: any = useContext(ContextData);
  
  // state
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");


  // validating data
  const validateAndSend = () => {
    if(userId == "" || userId.includes("=") || userId.includes("'") || password == ""){
      alert("Please check your credentials !");
      return null;
    }
  
    signIn({userId, password});
  }


  return (
    <>
      <View style={styles.mainView} >
        <Text style={styles.texts}>User Id </Text>
        <TextInput 
          style={styles.textinput}
          value={userId}
          onChangeText={(value) => setUserId(value) }
          placeholder="user id"
        />
      </View>

      <View style={styles.mainView} >
        <Text style={styles.texts}>Password</Text>
        <TextInput
          style={styles.textinput}
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={validateAndSend}>
        <Text style={styles.signinbutton}> Sign In </Text>
      </TouchableOpacity>
      <Text style={styles.button2} onPress={() => navigation.navigate("SignUp")}>Don't have account? create one here</Text>
    </>
  );
};


const styles = StyleSheet.create({
  mainView: {
    paddingTop: 15,
    paddingHorizontal: 15
  },
  textinput: {
    borderColor: 'grey',
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  texts: {
    paddingVertical: 3,
  },
  signinbutton: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    margin: 15,
    padding: 8,
    borderRadius: 3
  },
  button2: {
    color: 'blue',
    textAlign: 'right',
    marginHorizontal: 15,
    marginVertical: 8
  }
});

export default SignIn;
export {styles};