import React, { useContext, useState } from 'react';
import { Button, Image, ScrollView, Text, TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import hide from "../assets/hide.png"
import viewButton from "../assets/view.png"
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../firebase"
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Contexts/UserContext';

const DriverSignup = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [view, setView] = useState(false);
  const navigation = useNavigation();
  const { DRIVER, SETDRIVER } = useContext(UserContext);

  const signup = async () => {
    if (username && password && phone) {
      try {
        await addDoc(collection(db, 'drivers'), {
          username: username,
          password: password,
          phone: phone,
          name: name,
        });
        alert('Created Profile Successfully');

        SETDRIVER({
          username: username,
          password: password,
          phone: phone,
          name: name,

        })
        navigation.navigate('DriverPanel')

      } catch (error) {
        alert('Something went wrong');
      }
    }
  };

  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Driver SignUp</Text>

      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
          <TextInput
            style={{
              paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10
            }}
            onChangeText={setUsername}
            value={username}
            placeholder={'Enter username'}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
          <TextInput
            style={{
              paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10
            }}
            onChangeText={setName}
            value={name}
            placeholder={'Enter name'}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
          <TextInput
            style={{
              paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10
            }}
            onChangeText={setPhone}
            value={phone}
            placeholder={'Enter phone'}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <TextInput
            secureTextEntry={view ? false : true}
            style={{
              paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10, borderColor: '#d8dce3', borderWidth: 1
            }}
            onChangeText={setPassword}
            value={password}
            placeholder={'Password'}
            autoCorrect={false}
            autoCapitalize='none'
          />
          <TouchableOpacity style={{ position: 'absolute', zIndex: 10, marginLeft: 220 }} onPress={() => { view ? setView(false) : setView(true) }}>
            {view ?
              <Image
                source={viewButton}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
              :
              <Image
                source={hide}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            }
          </TouchableOpacity>
        </View>
        <Pressable style={{ marginLeft: 120, marginTop: 10 }}>
          <Text style={{ color: 'gray', fontSize: 14 }}>Forgot Password?</Text>
        </Pressable>
        <TouchableOpacity style={{ marginTop: 30 }} onPress={signup}>
          <View style={{
            borderColor: 'black',
            borderWidth: 2,
            width: 200,
            height: 50,
            borderRadius: 15,
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: 'black'
          }}>
            <Text style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold'
            }} >Signup</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>


  )
}

export default DriverSignup