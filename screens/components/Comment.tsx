import React from 'react';
import {Text, View, Image, TouchableOpacity, TextInput, FlatList, ScrollView, StyleSheet} from 'react-native';

import ContextData from '../context/AuthContext';
import axios from 'axios';

const Comment = ({props}: any) => {
  // context data
  const {data}: any = React.useContext(ContextData);
  const [comment, setComment] = React.useState("");

  const sendComment = async () => {
    // discarding comment if there is present in TextInput
    if(comment == "" || comment.length == 0) return null;
    
    const res = await axios.post(`http://192.168.43.148:8080/comment`, {
      postId: props.data._id, comment, author: props.author
    });
    console.log(res.data);
  };

  return (
    <>
      <Text style={{fontSize: 22}} ></Text>
        
      <ScrollView>
        {/* post details */}
        <View style={styles.post}>
          <View style={{flexDirection: 'row', paddingVertical: 15}} >
            <Image style={{width: 20, height: 20}} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
            <Text> {props.creator} </Text>
          </View>
          <View>
            <Text>{props.data.postBody} </Text>
          </View>
        </View>
        {/* <View>
          {
            props.data.postImage ?
              <Image resizeMode="contain" style={{width: '100%', height: 450}} source={{uri: props.data.postImage }} />:
              null
          }
        </View> */}

        {/* comment box */}
        <View>
          <TextInput
            style={styles.commentinput}
            value={comment}
            onChangeText={(value) => setComment(value) }
            multiline={true}
            placeholder="write a comment"
          />
          <TouchableOpacity onPress={() => {
            if(!data.isLoggedIn){ 
              alert("Please Login First!"); return ;}
              sendComment();
              setComment(""); // resetting comment box to blank
            }}> 
            <Text style={styles.commentButton} > Comment </Text>
          </TouchableOpacity>
  
          {/* a horizontal line separator */}
          <View style={styles.horizontalSeparator} ></View>
        </View>
      
        {/*  comments related to this post */}
        <View style={{margin: 15}} >
          <FlatList
            data={props.comments}
            keyExtractor={(item) => item._id }
            renderItem={({item}) => {
              return <Text style={styles.comment}>{item.comment}</Text> ;
            }}
          />          
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  commentinput: {
    borderWidth: 1, borderColor: 'grey', margin: 15, borderRadius: 3, padding: 3, fontSize: 12
  },
  post: {
    padding: 15, backgroundColor: 'rgba(0, 0, 255, 0.1)'
  },
  comment:{
    backgroundColor: 'rgba(0, 0, 255, 0.1)', borderRadius: 5, padding: 8, marginVertical: 8,  width: '85%'
  },
  commentButton: {
    fontWeight: 'bold', borderRadius: 3, padding: 10, textAlign: 'center', backgroundColor: 'rgba(0, 0, 255, 0.1)', marginHorizontal: 15
  },
  horizontalSeparator: {
    margin: 15, marginTop: 25, marginBottom: 0, height: 1, borderColor: 'lightgrey', borderWidth: 0.5
  }
})

export default Comment;