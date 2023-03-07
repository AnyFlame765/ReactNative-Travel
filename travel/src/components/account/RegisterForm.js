import { StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import { Input, Button, Icon } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { async } from "@firebase/util";
import Toast from 'react-native-toast-message'
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm() {
  const navigation = useNavigation();
  const [password, setpassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email no válido").required("Email requerido"),
      password: Yup.string().required("Se requiere contraseña"),
      repeatPassword: Yup.string()
        .required("Contraseña obligatoria")
        .oneOf([Yup.ref("password")], "Conraseñas no coinciden"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try{
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        // navigation.navigate("indexs")
         
      }catch(error){
        Toast.show({
          type: "error",
          position:"top",
          text1: "Error al registrar",
          text2: "El Email ya esta en uso",
          visibilityTime: 4000,
        autoHide: 400,
        topOffset: 30,
        bottomOffset: 40,
        });
      }
    },
  });

  const showPass = () => {
    setpassword(!password);
  };

  const showRepeatPassword = () => {
    setRepeatPassword(!repeatPassword)
  };
  return (
    <View styles={styles.viewForm}>
      <Input
        placeholder="Correo"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />

      <Input
        placeholder="Contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={password ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
          
          />
        }
        onPress={showPass}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Input
        placeholder="Repiter contraseña"
        secureTextEntry={repeatPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={repeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
         
          />
        }
        onPress={showRepeatPassword}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />

      <Button
        title={"Registar"}
        containerStyle={styles.containerBtn}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  icon: {
    color: "#c1c1c1",
  },
  containerBtn: {
    width: "95%",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#0D5BD7",
  },
});
