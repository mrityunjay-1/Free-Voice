import React, { useState, useEffect, useContext } from 'react';
import {Text, View, FlatList, ToastAndroid} from 'react-native';
import axios from 'axios';

import ContextData from '../context/AuthContext';

import Post from '../components/Post';

const TrendingScreen = () => {

  // state
  const {data}: any = useContext(ContextData);
  const [trendingData, setTrendingData] = useState([]);

  // getting trending data
  const fetch_trending_posts = async () => {
    try{
      const res = await fetch(data.api_link + "/trending_posts");
      setTrendingData(await res.json());
    }catch(e){
      console.log(e);
      ToastAndroid.show(e, ToastAndroid.SHORT);
    }
  }
  
  useEffect(() => {
    fetch_trending_posts();
  }, []);

  return (
  <>
    <Text style={{fontSize: 24}}> </Text>

    <Text style={{padding: 15, fontSize: 24}} > Treanding </Text>

    <FlatList
      data={trendingData}
      onRefresh={fetch_trending_posts}
      refreshing={false}
      keyExtractor={(item) => item._id }
      renderItem={({item}) => {
        return (
          <Post
            data={item}
            author={item.author._id}
            creator={item.author.name}
            comments={item.comments}
            onCloseCommentModalCallFetchData={() => fetch_trending_posts()}
            cb_refresh={fetch_trending_posts}
            liked={ data.isLoggedIn ? item.likers.includes(data._id) ? true : false : false}
          />
        );
      }}
    />
  
  </>
  );
};

export default TrendingScreen;