import React from 'react';
import {Text, View, TouchableOpacity, FlatList, Modal, StyleSheet} from 'react-native';

// icons
import {Entypo, FontAwesome, Feather} from '@expo/vector-icons';
import ContextData from '../context/AuthContext';
import Post from '../components/Post';

const FeedScreen = ({navigation}: any) => {
  // contextData
  const {data}: any = React.useContext(ContextData);

  // states
  const [feed, setFeed] = React.useState([]);


  // fetching data from my server
  const fetchData = async () => {
    console.log("feed data fetched.");
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

      <FlatList
        ListHeaderComponent={
          <View style={styles.toptabs}>
            <TouchableOpacity style={styles.childs} onPress={fetchData} >
              <Text style={{textAlign: 'center'}} ><FontAwesome name="refresh" size={16} />  Refresh </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.childs} onPress={() => navigation.navigate("Trending")} >
              <Text style={{textAlign: 'center'}} ><Feather name="trending-up" size={16} />  Trending </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.childs} onPress={() => navigation.navigate("NewPostScreen")} >
              <Text style={{textAlign: 'center'}}><Entypo name="new-message" size={16} />  New Post </Text>
            </TouchableOpacity>
          </View>
        }
        
        refreshing={false}
        onRefresh={fetchData}
        data={feed}
        keyExtractor={(item) => item._id}
        // onEndReached={() => {console.log("fetching more because user reached to end")}}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => {
          // console.log(data._id);
          return (
            <Post
              data={item}
              author={item.author._id}
              creator={item.author.name}
              comments={item.comments}
              onCloseCommentModalCallFetchData={() => fetchData()}
              liked={ data.isLoggedIn ? item.likers.includes(data._id) ? true : false : false}
            />
          );
        }}
      />
    </>
  );
};


const styles = StyleSheet.create({
  toptabs: {
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: 'grey',
    backgroundColor: 'rgba(0, 0, 255, 0.1)',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  childs: {
    width: '33.3%',
    borderRightWidth: 0.2,
    borderColor: 'grey'
  }
});

export default FeedScreen;