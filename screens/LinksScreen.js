import React,{useState} from 'react';
import { StyleSheet,ActivityIndicator,ScrollView,Alert,View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryGradientArray } from '../components/utils/Colors';
import Input from '../components/Input';
import List from '../components/List';
import Header from '../components/Header';
import axios from 'axios'
import uuid from 'uuid/v1';

export default function LinksScreen() {

  const [inputValue, setinputValue] = useState('')
  const [Defenitions, setDefenitions] = useState([])
  const [Loading, setLoading] = useState(false)

  function newInputValue(value) {
    setinputValue(value);
  }
  function onDoneAddItem() {
    setLoading(true);
    setDefenitions([])
    const config = {
      method:'GET',
      url:`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${inputValue}?fields=definitions&strictMatch=false`,
      headers: {
        "Accept": "application/json",
        "app_id": "59836a1c",
        "app_key": "008bc987e080631a226c437fe7e015e4"
      }
    }
    axios(config).then((res)=>{
      setDefenitions(res.data.results[0].lexicalEntries[0].entries[0].senses)
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
      Alert.alert(
        'Unknwon word',
        'Word not found',
        [
          {text: 'Try Another word'},
        ],
        {cancelable: true},
      );
    })
  }
  return (
    <LinearGradient colors={primaryGradientArray} style={styles.container}>
      <View style={styles.centered}>
				<Header title={"Dictionary"} />
			</View>
      <Input 
          style ={styles.Input}
					inputValue={inputValue}
					onChangeText={newInputValue}
					onDoneAddItem={onDoneAddItem}
				/>

        <ScrollView style={styles.list} contentContainerStyle={{alignItems: 'center'}}>
          {
            !Loading?
            Defenitions.map((item)=>{
              console.log(item.definitions[0]);
              return(
                <List
                  key={uuid()}
                  text={item.definitions[0]}
                />
              )
            })
            :
            <ActivityIndicator size="large" color="white" />
          }
        </ScrollView>
    </LinearGradient>
  );
}

LinksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:25,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  centered:{
    alignItems: 'center'
  },
  list:{ 
    marginTop:50,
  },
  Input:{
    marginLeft:40,
  }
});
