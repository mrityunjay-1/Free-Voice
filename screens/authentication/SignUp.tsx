import React, {useState, useContext} from 'react';
import {TextInput, Text, View, TouchableOpacity, ScrollView} from 'react-native';

import { styles } from './SignIn';
import ContextData from '../context/AuthContext';

const SignUp = ({navigation}: any) => {
  const {signUp}: any = useContext(ContextData);
  
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // validating data
  const validateAndSignUp = () => {
    if(name == "" || email == "" || userId == "" || password == "" || confirmPassword == ""){
      alert("something went wrong!");
      return null;
    }
  
    if(password !== confirmPassword){
      alert("password does match!");
      return null;
    }
    
    signUp({name, email, userId, password, cb: () => {navigation.navigate("SignIn")}});
  }

  return (
    <>
      <ScrollView>
        {/* <CredComp view="mainView" text="texts" /> */}

        <View style={styles.mainView}>
          <Text style={styles.texts}>Name </Text>
          <TextInput
            placeholder="name"
            style={styles.textinput}
            value={name}
            onChangeText={(value) => setName(value) }
          />
        </View>

        <View style={styles.mainView}>
          <Text style={styles.texts}>Email </Text>
          <TextInput
            placeholder="ex: abc123@email.com"
            style={styles.textinput}
            value={email}
            onChangeText={(value) => setEmail(value) }
          />
        </View>

        <View style={styles.mainView}>
          <Text style={styles.texts}>Create User Id </Text>
          <TextInput
            placeholder="ex: mrityunjay_1"
            style={styles.textinput}
            value={userId}
            onChangeText={(value) => setUserId(value) }
          />
        </View>

        <View style={styles.mainView}>
          <Text style={styles.texts}>Create Password </Text>
          <TextInput
            placeholder="password"
            style={styles.textinput}
            value={password}
            onChangeText={(value) => setPassword(value) }
            secureTextEntry={true}
          />
        </View>

        <View style={styles.mainView}>
          <Text style={styles.texts}>Confirm Password </Text>
          <TextInput
            style={styles.textinput}
            placeholder="confirm password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value) }
            secureTextEntry={true}
          />
        </View>
      
        <TouchableOpacity onPress={validateAndSignUp}>
          <Text style={styles.signinbutton}> Sign Up </Text>
        </TouchableOpacity>
    
        <Text style={styles.button2} onPress={() => navigation.navigate("SignUp")}>Already have account ? sign in here</Text>
        
      </ScrollView>
    </>
  );
};



// const CredComp = (props: any) => {
//   return (
//     <>
//       <View style={styles[props.view]}>
//         <Text style={styles[props.text]}>Name </Text>
//         <TextInput
//           placeholder={props.placeholder}
//           style={styles.textinput}
//           // value={name}
//           // onChangeText={(value) => setName(value) }
//         />
//       </View>
//     </>
//   );
// }


export default SignUp;