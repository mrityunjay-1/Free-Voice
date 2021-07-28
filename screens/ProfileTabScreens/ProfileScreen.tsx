import React from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

import Post from '../components/Post';

// context
import ContextData from '../context/AuthContext';

const ProfileScreen = ({navigation}: any) => {
  // useContext - verifying that user is logged in or not
  const {data, signOut}: any = React.useContext(ContextData);
  
  const [userPostData, setUserPostData] = React.useState({});
  
  const fetchUserData = async () => {
    console.log("fetched user data");
   
    try{
      const res = await axios({
        url: data.api_link + "/get_user",
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + data.token
        }
      });
  
      // console.log(res.data);
      setUserPostData(res.data);
    }catch(e){
      console.log(e.message);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUserData();
    })
    
    return unsubscribe;
  });
  
  return (
    <>
      <Text style={{fontSize: 22}}></Text>
    
      {
      data.isLoggedIn   
      ?
        <FlatList 
          ListHeaderComponent={<>
            <View style={{flexDirection: 'row', padding: 25, alignItems: 'flex-end' }} >
              <Image source={{uri: 'https://storage.googleapis.com/free-voice-images/profile.png'}} style={{width: 80, height: 80, borderRadius: 50}} />
              <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}> { userPostData.name } </Text>
              </View>
            </View>
            {/* settings */}
            <Text onPress={() => navigation.navigate("Settings")} style={styles.settings}>Settings</Text>
            <Text style={{ margin: 15, fontWeight: 'bold'}}>My Posts</Text>
          </>}

          data={userPostData.posts}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            let comments = userPostData.comments.filter((comment: any) => comment.post === item._id)
            return <Post
                    creator={userPostData.name}
                    time="time"
                    author={item.author}
                    data={item}
                    comments={comments}
                    onCloseCommentModalCallFetchData={() => fetchUserData()}
                    liked={ data.isLoggedIn ? item.likers.includes(data._id) ? true : false : false}
              />;
          }}
        />
      :
        <Text style={{padding: 15, textAlign: 'center'}}> Please Login </Text>
      }

    </>
  );
};

const styles = StyleSheet.create({
  settings: {
    textAlign: 'center', padding: 10, margin: 15, borderColor: 'black', borderWidth: 1, borderRadius: 5
  }
});

export default ProfileScreen;