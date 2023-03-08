import { StyleSheet, View } from 'react-native'
import React from 'react'
import {Avatar, Text} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import { getAuth, updateProfile } from 'firebase/auth'
import {getStorage, ref, uploadBytes, getDownloadURL}from "firebase/storage"

export default function ProfileInfo() {
    const {uid, photoURL, displayname, email} = getAuth().currentUser;
    console.log(uid)

    const changePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[3,4]
        });
        if(!result.canceled)uploadPhoto(result.uri)
    }

    const uploadPhoto = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob(); //base 643

        const storage= getStorage();
        const refStorage = ref(storage, `imgProfile/${uid}`)
        uploadBytes(refStorage, blob).then((snapShot) => {
            // console.log(snapShot.metadata)
            updatePhoto(snapShot.metadata.fullPath)
        })
    };

    const updatePhoto = (imgPath) => {
        console.log(imgPath)
    }

  return (
    <View style={styles.viewPhoto}>
      <Avatar
        size="large"
        rounded= {true}
        icon={{type:"material", name:"person"}}
        containerStyle={styles.avatar}
      >
        <Avatar.Accessory size={25} onPress={changePhoto}>

        </Avatar.Accessory>
      </Avatar>
      <View>
        <Text style={styles.nameUser}>{displayname || "Usuario"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    viewPhoto:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor:"#f2f2f2"
    },
    avatar: {
        marginRight: 20,
        backgroundColor: "#0D5BD7"
    },
    nameUser:{
        fontWeight: "bold",
        paddingBottom: 2
    }
})