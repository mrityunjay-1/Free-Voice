import React, { useState, useContext } from 'react';
import {Text,View, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

import ContextData from '../context/AuthContext';



const SearchBar = (props: any) => {
  const {data}: any = useContext(ContextData);

  const [ search_keyword, set_search_keyword ] = useState("");


  const fetchOnEndEditing = async () => {
    console.log("fetchOnEndEditing called");
    
    try{
      const res = await axios.post(data.api_link + "/get_users_list", {search_keyword});
      // sending data back to my origininal SearchScreen component
      props.users(res.data);
    }catch(e){
      console.log(e);
    }
  }

  
  return (
    <>
      <Text style={{fontSize: 22}} ></Text>
      <View style={{ width: '100%', padding: 10, backgroundColor: 'rgba(0, 0, 255, 0.1)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
        <Text style={{width: '15%'}} > <AntDesign name="search1" size={24} /> </Text>

        <TextInput
          value={search_keyword}
          onChangeText={(value) => set_search_keyword(value) }
          style={{width: '85%'}}
          onEndEditing={fetchOnEndEditing}
          placeholder="Search here"
        />

      </View>
      <Text style={{margin: 15}}>Search result:</Text>
    </>
  );
}

const SearchScreen = () => {
  const [ users_list, set_users_list] = useState([]);

  return (
    <>
      <SearchBar users={(data: any) => set_users_list(data)} />
      
      { users_list.length == 0 ? <Text style={{textAlign: 'center'}}> Nothing in here! </Text> :
         <FlatList
          data={users_list}
          keyExtractor={(item) => item._id }
          renderItem={({item}) => {
            return  <TouchableOpacity onPress={() => console.log("user's profile") }>
                <View style={{backgroundColor: 'rgba(0, 255, 0, 0.1)', flexDirection: 'row', alignItems: 'center', padding: 10}}>
                  <AntDesign name="user" size={20} style={{width: 40}} />
                  <Text> {item.name} </Text>
                </View>
              </TouchableOpacity>
            ;
          }}
        />

      }
        
    </>
  );
};

export default SearchScreen;