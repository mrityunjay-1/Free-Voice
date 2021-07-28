import React, {useContext} from 'react';
import { Text, View, Image, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

import ContextData from '../context/AuthContext';
import Comment from './Comment';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

const swidth = Dimensions.get("window").width;


const Post = (props: any) => {
  
  const { data }: any = useContext(ContextData);
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [size, setSize] = React.useState({width: swidth, height: 0});

  const [isLiked, setIsLiked] = React.useState(false);




  // function for liking the post
  const likePost = () => {

    if(!data.isLoggedIn) {
      alert("Please Login ! \n\nHow you can Login ? \n\n- On Landing Page down in the bottom you will see a 'My Profile' Tab click over there !");
      return false; 
    }
    
    if(isLiked){
      setIsLiked(false);
      
      // let's persist this response
      axios({
        method: "POST",
        url: data.api_link + "/dislike_post",
        data: {postId: props.data._id},
        headers: {
          "Authorization": "Bearer " + data.token
        }
      }).then(res => console.log(res.data))
        .catch(err => console.log(err));
  

    }else{
    
      axios({
        method: "POST",
        url: data.api_link + "/like_post",
        data: {postId: props.data._id},
        headers: {
          "Authorization": "Bearer " + data.token
        }
      }).then(res => console.log(res.data))
        .catch(err => console.log(err));
  
      setIsLiked(true);
    }
  }




//  1 quintrillion dollar concept
  React.useEffect(() => {
    setIsLiked(props.liked);
  }, [props.liked]);





  return (
    <>
      {/* comments modal */}
      <Modal
        animationType="slide"
        visible={modalVisibility}
        onRequestClose={() => { setModalVisibility(false); props.onCloseCommentModalCallFetchData(); }}
        // props.onCloseCommentModalCallFetchData() isliye hai taki jab mai comment modal closse 
        // karu to new data fetch ho jaye and UI got refreshed with brand new data
        statusBarTranslucent={true}
        presentationStyle="formSheet" 
      >
        <Comment props={props} />
      </Modal>


      {/* Main Post Component */}

      <View style={{backgroundColor: 'white', marginBottom: 8, elevation: 5}} >
        
        {/* header */}
        <View style={{flexDirection: 'row', margin: 10}} >
          <Image style={{width: 20, height: 20}} source={{uri: 'https://storage.googleapis.com/free-voice-images/profile.png'}} />
          <Text> {props.creator} </Text>
          {/* <Text> {props.data.createdAt} </Text> */}
        </View>
        
        {/* body */}
        <View>
          <Text style={{paddingHorizontal: 10, paddingBottom: 10}}> {props.data.postBody} </Text>
          
          <TouchableOpacity>
            {
              props.data.postImage ?
                <Image 
                  onLoad={(i) => {let {width, height} = i.nativeEvent.source; setSize({width: swidth, height: Math.ceil((swidth * height) / width)})}} 
                  resizeMode="contain"
                  style={{...size, paddingBottom: 3 }} 
                  source={{uri: props.data.postImage }} 
                /> :
                null
            }
          </TouchableOpacity>
        </View>
      
        {/* Footer */}
        <View>
          <View style={styles.footerView} >

            <TouchableOpacity style={styles.button} onPress={() => likePost()} >
              <Text style={{...styles.text}}> 
                {isLiked ? <AntDesign name="like1" size={24} color="blue" /> : "Like"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setModalVisibility(true)} >
              <Text style={{...styles.text }}> comment </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
              <Text style={{...styles.text }}> share </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '33.3%', borderRightWidth: 0.2, borderColor: 'grey'
  },
  footerView: {
    borderTopWidth: 0.2, borderColor: 'grey', height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' 
  },
  // footer text
  text: {
    textAlign: 'center', fontSize: 12
  }
})

export default Post;