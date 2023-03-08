import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../components/account/LoginForm";

export default function LoginSreen() {
  const navigation = useNavigation();
  console.log(navigation);
  const irAResgistro = () => {
    navigation.navigate("registerS");
  };
  return (
    <View>
      <Image
        source={require("../../assets/img/Spiderman.png")}
        style={styles.logo}
      />

      <View style={styles.contentForm}>
        <LoginForm />
        <Text style={styles.text}>
          ¿Aun no tienes cuenta?
           <Text style={styles.textBtn} onPress={irAResgistro}>{" "}Registrate</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
  },
  contentForm:{
    marginHorizontal: 30
  },
  text:{
    marginTop:15,
    marginHorizontal: 10
  },
  textBtn:{
    fontWeight: 'bold',
    color: '#0D5BD7'
  }
});
