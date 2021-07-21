import React from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import axios from 'axios';

import Post from './components/Post';

// context
import ContextData from './context/AuthContext';

const ProfileScreen = ({navigation}: any) => {
  // useContext - verifying that user is logged in or not
  const {data, signOut}: any = React.useContext(ContextData);
  
  const [userPostData, setUserPostData] = React.useState({});
  
  const fetchUserData = async () => {
    console.log("fetched user data");
    try{
      const res = await axios({
        url: 'http://192.168.43.148:8080/get_user/',
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
    
      {data.isLoggedIn ?
        <FlatList 
          ListHeaderComponent={<>
            <View style={{flexDirection: 'row', padding: 25, alignItems: 'flex-end' }} >
              <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={{width: 80, height: 80, borderRadius: 50}} />
              <View>
                <Text style={{ fontSize: 24 }}> { userPostData.name } </Text>
              </View>
            </View>
            {/* signOut */}
            <Text onPress={signOut} style={{padding: 10, margin: 15, borderColor: 'black', borderWidth: 1}}>Logout</Text>
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
              />;
          }}
        />
      :
        <Text> Please Login </Text>
      }

    </>
  );
};

export default ProfileScreen;