import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/api";
import { favoritesStyles } from "../../assets/styles/favorites.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import RecipeCard from "../../components/RecipeCard";
import NoFavoritesFound from "../../components/NoFavoritesFound";
import LoadingSpinner from "../../components/LoadingSpinner";

const FavoritesScreen = () => {
  const {signOut} =useClerk()
  const {user}= useUser()
  const {favotiteRecipes,setFavoriteRevipes} =useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const loadFavorites = async() =>{
      try{
  const responce = await fetch(`${API_URL}/api/favorites/${user.id}`)
  if(!responce.ok) throw new Error("Failed to fetch favorites")

    const favorites = await responce.json();

      // transform the data to match the RecipeCard component's expected format
      const transformedFavorites = favorites.map((favorite) => ({
        ...favorite,
        id: favorite.recipeId,
      }));

    setFavoriteRevipes(transformedFavorites)

      } catch (error) {
        console.log("Error loading favorites", error);
        Alert.alert("Error", "Failed to load favorites");
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();

  },[user.id]);


  return (
    <View>
      <Text>FavoritesScreen</Text>
    </View>
  )
}

export default FavoritesScreen