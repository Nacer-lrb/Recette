import {StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import { Image } from "expo-image"
import {Link} from "expo-router"


export default function Index() {
  return (
    <View style={styles.container} >
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
      <Image 
        source={{
          uri:"https://images.unsplash.com/photo-1751906602589-74cbe72d08b1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }}
        style={{
          width: 200,
          height: 200
        }}
      />
      <TouchableOpacity>
        <Text>
          click me ...........
        </Text>
      </TouchableOpacity>

      <Link href={"/about"}> visit about </Link>

    </View>
  );
}
const styles = StyleSheet.create(
  {
    container:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  
    },
    text : {
      color : "blue",
      fontSize: 40
    }


  }
)

 
