import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import PrimaryInput from "../components/ui/PrimaryInput";
import { GlobalStyles } from "../constants/styles";
import PrimaryButton from "../components/ui/PrimaryButton";
import Loading from "../components/ui/Loading";
import { loginApi, signUpApi, loginWithGoogle } from "../api/auth";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { AuthStore } from "../store/authContext";

const Authentication = () => {
  const navigation = useNavigation();
  const { login, isAuthenticated } = AuthStore();

  const [isAuthentication, setIsAuthentication] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [valueInput, setValueInput] = useState({
    email: "",
    password: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isLogin ? "Login" : "Sign up",
      headerTitleAlign: "center",
    });
  }, [navigation, isLogin]);

  function handleInputValue(name, e) {
    const cpState = { ...valueInput };
    cpState[name] = e;
    setValueInput(cpState);
  }

  const clearInputValue = () => {
    setValueInput({
      email: "",
      password: "",
    });
  };

  const handleConfirm = async () => {
    if (!valueInput.email.includes("@") || valueInput.password.length < 6) {
      Alert.alert("Invalid input!", "Please check your input values");
    } else {
      setIsAuthentication(true);
      if (!isLogin) {
        try {
          await signUpApi(valueInput.email, valueInput.password);
          clearInputValue();
          setIsLogin(true);
        } catch (err) {
          console.log(err);
          setErrorMessage("Could not create user - please try again!");
        }
      } else {
        try {
          const data = await loginApi(valueInput.email, valueInput.password);
          const result = {
            email: data.email,
            name: data.name,
            photo: data?.photo,
            token: data.idToken,
          };
          login(result);
          clearInputValue();
          navigation.navigate("DrawNavigation", { screen: "DrawNavigation" });
        } catch (err) {
          // isAuthenticated(false);
          setErrorMessage(
            "Could not login with this account - please try again!"
          );
        }
      }
      setIsAuthentication(false);
    }
  };

  // const handleLoginWithGoogle = async () => {
  //   const userInfo = await loginWithGoogle();
  //   const result = {
  //     email: userInfo.user.email,
  //     name: userInfo.user.name,
  //     photo: userInfo.user?.photo,
  //     token: userInfo.idToken,
  //   };
  //   login(result);
  //   navigation.navigate("DrawNavigation", { screen: "DrawNavigation" });
  // };

  if (errorMessage) {
    return (
      <ErrorOverlay
        message={errorMessage}
        onPress={() => {
          setErrorMessage(null);
        }}
      />
    );
  }

  if (isAuthentication) {
    return <Loading message={!isLogin ? "Creating user..." : "Logging..."} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/pig.png")} style={styles.image} />
      </View>
      <View style={styles.inputRow}>
        <PrimaryInput
          label={"Email"}
          textInputConfig={{
            onChangeText: handleInputValue.bind(this, "email"),
            keyboardType: "email-address",
          }}
          style={styles.rowInput}
          value={valueInput.email}
          isLogin={true}
        />
      </View>
      <View style={styles.inputRow}>
        <PrimaryInput
          label={"Password"}
          textInputConfig={{
            onChangeText: handleInputValue.bind(this, "password"),
            // keyboardType: "visible-password",
            secureTextEntry: true,
          }}
          style={styles.rowInput}
          value={valueInput.password}
          isLogin={true}
        />
      </View>
      <View style={styles.containerButton}>
        <PrimaryButton
          onPress={handleConfirm}
          style={styles.button}
          mode={"flat"}
          colorText={"login"}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </PrimaryButton>
      </View>
      <View>
        <Pressable
          onPress={() => {
            setIsLogin(!isLogin);
          }}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={styles.buttonRedirect}>
            {isLogin ? "Create a new user" : "Log in instead"}
          </Text>
        </Pressable>
      </View>
      <Text style={{ color: GlobalStyles.colors.primary50 }}>Or</Text>
      {/* <Pressable onPress={handleLoginWithGoogle} style={{ marginVertical: 20 }}>
        <GoogleSigninButton />
      </Pressable> */}
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary200,
    flex: 1,
    // justifyContent: "center",
    paddingTop: 80,
    alignItems: "center",
    // marginTop: 20,
    paddingHorizontal: 20,
  },
  rowInput: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  containerButton: {
    backgroundColor: GlobalStyles.colors.error500,
    width: "97%",
    borderRadius: 8,
    marginTop: 12,
  },
  buttonRedirect: {
    color: "white",
    marginTop: 12,
    fontSize: 16,
    marginVertical: 4,
  },
  pressed: {
    opacity: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    height: 100,
    width: 100,
  },
});
