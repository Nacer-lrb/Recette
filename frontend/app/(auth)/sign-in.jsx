import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import {useRouter} from "expo-router"
import { useState } from 'react';
import {useSignIn} from "@clerk/clerk-expo"
import {authStyles} from "../../assets/styles/ auth.styles"

const SignInScreen = () => {
  const  router = useRouter();


  const {signIn,setActive,isLoaded}=useSignIn();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);


  const handleSignIn = async ()=>{
    if(!email || !password){
      Alert.alert("Error","Please fill all fields")
      return
    }
    if (!isLoaded)return;
    
    setLoading(true)
    try{
      const signInAttempt = await signIn.create({
        identifier:email,
        password


      })
      if (signInAttempt.status === "complete"){
        await setActive({session:signInAttempt.createdSessionId})
      }else{
        Alert.alert("Error","sign in failed .Please try again")
        console.error(JSON.stringify(signInAttempt,null,2))


      }


    }catch(err){
      Alert.alert("Error",err.errors?.[0]?.message ||"sign in failed")
      console.error(JSON.stringify(signInAttempt,null,2))


    }finally{
      setLoading(false)

    }

  }
  return (
    <View style ={authStyles.container}>
      <KeyboardAvoidingView
          style={authStyles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
        contentContainerStyle={authStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
            source={require("../../assets/images/i1.png")}
            style ={authStyles.image}
            contentFit="contain"
            />



          </View>

        </ScrollView>


      </KeyboardAvoidingView>
    </View>
  )
}

export default SignInScreen;