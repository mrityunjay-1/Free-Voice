import React, {useContext} from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';

import ContextData from '../context/AuthContext';
import Comment from './Comment';

import axios from 'axios';


const Post = (props: any) => {

  const { data }: any = useContext(ContextData);
  const [modalVisibility, setModalVisibility] = React.useState(false);
  

  // liking a comment 
  const likePost = async () => {
    // is user logged in
    if(!data.isLoggedIn){ alert("Please Log In !"); return null; }
  
    // post id
    const res = await axios({
      method: "POST",
      url: data.api_link + '/like_post',
      data: { postId: props.data._id },
      headers: {"Authorization": "Bearer "+ data.token}
    });
    
    console.log(res.data);
  }

  return (
    <>
      {/* comments */}
      <Modal
        animationType="fade"
        visible={modalVisibility}
        onRequestClose={() => { setModalVisibility(false); props.onCloseCommentModalCallFetchData(); }}
        // props.onCloseCommentModalCallFetchData() isliye hai taki jab mai comment modal closse 
        // karu to new data fetch ho jaye and UI got refreshed with brand new data
        statusBarTranslucent={true}
        presentationStyle="formSheet" 
      >
        <Comment props={props} />
      </Modal>

      <View style={{backgroundColor: 'white', marginTop: 8, elevation: 5}} >
        
        {/* header */}
        <View style={{flexDirection: 'row', margin: 10}} >
          <Image style={{width: 20, height: 20}} source={{uri: 'https://storage.googleapis.com/free-voice-images/profile.png'}} />
          <Text> {props.creator} </Text>
          {/* <Text> {props.data.createdAt} </Text> */}
        </View>
        
        {/* body */}
        <View>
          <Text style={{padding: 10}}> {props.data.postBody} </Text>
          {
            props.data.postImage ?
              <Image resizeMode="contain" style={{width: '100%', height: 350}} source={{uri: props.data.postImage }} />:
              null
          }
        </View>
      
        {/* Footer */}
        <View>
          <View style={{borderTopWidth: 0.2, borderColor: 'grey', height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
            <TouchableOpacity style={styles.button} onPress={() => likePost()} ><Text style={{textAlign: 'center', fontSize: 12 }}> Like ({props.data.totalLikes}) </Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisibility(true)} ><Text style={{textAlign: 'center', fontSize: 12 }} > comment </Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} ><Text style={{textAlign: 'center', fontSize: 12 }}> share </Text></TouchableOpacity>
          </View>
        </View>
      </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '33.3%', borderRightWidth: 0.2, borderColor: 'grey'
  }
})

export default Post;