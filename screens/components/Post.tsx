import React, {useContext} from 'react';
import {Text, View, Image, TouchableOpacity, Modal, TextInput, FlatList, ScrollView} from 'react-native';

import ContextData from '../context/AuthContext';
import Comment from './Comment';

const Post = (props: any) => {
  const [modalVisibility, setModalVisibility] = React.useState(false);

  // liking a comment 
  const likePost = () => {
    
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
          <Image style={{width: 20, height: 20}} source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
          <Text> {props.creator} </Text>
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
            <TouchableOpacity style={{width: '33.3%', borderRightWidth: 0.2, borderColor: 'grey'}} onPress={() => likePost()} ><Text style={{textAlign: 'center', fontSize: 12 }}> Like </Text></TouchableOpacity>
            <TouchableOpacity style={{width: '33.3%', borderRightWidth: 0.2, borderColor: 'grey'}} onPress={() => setModalVisibility(true)} ><Text style={{textAlign: 'center', fontSize: 12 }} > comment </Text></TouchableOpacity>
            <TouchableOpacity style={{width: '33.4%', borderRightWidth: 0.2, borderColor: 'grey'}} ><Text style={{textAlign: 'center', fontSize: 12 }}> share </Text></TouchableOpacity>
          </View>
        </View>
      </View>
    
    </>
  );
}

export default Post;