import React, {useContext} from 'react';
import {Text, View, ScrollView, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

import ContextData from '../context/AuthContext';

const width = Dimensions.get("window").width;


const NewPostScreen = ({navigation}) => {

  const {data}: any = useContext(ContextData);
  const [postBody, setPostBody] = React.useState("");
  const [image, set_image]: any = React.useState({});
  


  // creating post and sending it to my node server
  
  // adding image
  const selectImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync();
    // console.log(image);
    set_image(image);
  }
  


  const createPost = async () => {
    if(!image.uri && (postBody === "" || postBody.length === 0)) 
    { 
      alert("Please Write something or add an image !");
      return null; 
    }

    if(image.uri && !image.uri.match(/jpg|png/g)){
      alert("Please Upload jpg or png format images only !");
      return null;
    }
  
    const formData = new FormData();
    if(!image.uri){
      formData.append("postBody", postBody);
    }else{
      formData.append("postBody", postBody);
      formData.append("postImage", {
        uri: image.uri,
        type: image.uri.includes(".png") ? 'image/png' : 'image/jpeg',
        name: "image" + "." + image.uri.includes(".png") ? "png" : "jpg"
      });
    }
  
    const res = await axios({
      url: data.api_link + "/create_post",
      method: "post",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + data.token
      }
    });
    
    setPostBody("");
    set_image({});
    alert("New Post Added!");
  }



  // checking for user login
  React.useEffect(() => {
    if(!data.isLoggedIn){
      alert("Please Log In");
      navigation.navigate("My Profile");
    }
  }, []);




  return (
    <>
      <Text style={{fontSize: 22}} ></Text>

      <ScrollView>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22, padding: 10}}> Create New Post </Text>
        <Text onPress={selectImage} style={{margin: 15,textAlign: 'center', padding: 10, borderColor: 'grey', borderWidth: 1}}> Add Image  + </Text>
        
        {/* <Text style={{marginHorizontal: 15}}>Post Preview </Text> */}
        

        <TextInput
          value={postBody}
          onChangeText={(value) => setPostBody(value)}
          style={{borderRadius: 3, borderColor: 'grey', borderBottomWidth: 1, margin: 15 }}
          multiline={true}
          placeholder="write something here!"
        />

        {
          image.uri
          ?
            <Image source={{uri: image.uri}} style={{ margin: 15, width: width - 30, height: 350}} resizeMode="contain" />
          :
          null
        }

        <TouchableOpacity onPress={createPost}>
          <Text style={{borderRadius: 3, margin: 15, padding: 10, textAlign: 'center', fontWeight: 'bold', color: 'white', backgroundColor: 'blue'}}> Post </Text>
        </TouchableOpacity>

      </ScrollView>
    </>
  );
};

export default NewPostScreen;


// createPost function in "line no - 28" is main function for NewPost Screen
// one challenge that i faced here is
// what if user don't want to upload any image but want to post some text data
// so in order to solve this problem i created separate formData.

//  1. for only text post
//  2. for both text and image post
//  

// ofcourse a post will not be created unless and untill you have to write something in your post