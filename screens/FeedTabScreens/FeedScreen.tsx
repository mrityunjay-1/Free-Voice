import React from 'react';
import { Text, View, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';

// icons
import { Entypo, FontAwesome, Feather } from '@expo/vector-icons';

import ContextData from '../context/AuthContext';

import Post from '../components/Post';
import NewPost from '../components/NewPost';

const FeedScreen = ({navigation}: any) => {
  // contextData
  const {data}: any = React.useContext(ContextData);

  // states
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [feed, setFeed] = React.useState([]);
  
  // fetching data from my server
  const fetchData = async () => {
    
    const response = await fetch(data.api_link + "/all_posts");
    setFeed(await response.json());
  
  }

  // whenever screen is focused then data fetching will be done
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });
    
    return unsubscribe;    
  });
  return (
    <>
      {/* New post */}
        <Modal statusBarTranslucent={true} onShow={() => { if(!data.isLoggedIn){navigation.navigate("My Profile"); setModalVisibility(false); } } } visible={modalVisibility} animationType="fade" onRequestClose={() => {setModalVisibility(false); fetchData(); }} > 
          <NewPost /> 
        </Modal> 

        <FlatList
          ListHeaderComponent={
            <View style={{ borderBottomWidth: 0.2, borderTopWidth: 0.2, borderColor: 'grey', backgroundColor: 'rgba(0, 0, 255, 0.1)', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <TouchableOpacity style={{width: '33.3%', borderRightWidth: 0.2, borderColor: 'grey'}} onPress={() => { fetchData(); console.log("refreshed"); }} >
                <Text style={{textAlign: 'center'}} ><FontAwesome name="refresh" size={16} />  Refresh </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{width: '33.3%', borderRightWidth: 0.2, borderColor: 'grey'}} onPress={() => navigation.navigate("Trending")} >
                <Text style={{textAlign: 'center'}} ><Feather name="trending-up" size={16} />  Trending </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{width: '33.4%', borderRightWidth: 0.2, borderColor: 'grey'}} onPress={() => setModalVisibility(true)} >
                <Text style={{textAlign: 'center'}}><Entypo name="new-message" size={16} />  New Post </Text>
              </TouchableOpacity>
            </View>
          }
    
          data={feed}
          keyExtractor={(item) => item._id }
          onEndReached={() => {console.log("reached to end")}}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => { return (
              <Post 
                data={item}
                author={item.author._id}
                creator={item.author.name}
                comments={item.comments}
                onCloseCommentModalCallFetchData={() => fetchData()}
              />
            );
          }}
        />
    </>
  );
};

export default FeedScreen;