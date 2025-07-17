import { View, Text } from 'react-native'
import {useLocalSearchParams} from "expo-router"
import { useState,useEffect } from 'react'
import {useUser} from "@clerk/clerk-expo"

    const RecipeDetailScreen = () => {

    const {id:recipeId} = useLocalSearchParams()
    const {recipe,setRecipe} = useSatate(null)
    const {loading,setLoading} = useState(true)
    const {isSaved,setIsSaved} = useState(false)
    const {isSaving, setIsSaving} = useState(false)

    const {user} = useUser();
    const userId = user?.id ;

    useEffect(()=>{
        const checkIfSaved = async () => {
            try {
              const response = await fetch(`${API_URL}/api/favorites/${userId}`);
              const favorites = await response.json();
              const isRecipeSaved = favorites.some((fav) => fav.recipeId === parseInt(recipeId));
              setIsSaved(isRecipeSaved);
            } catch (error) {
              console.error("Error checking if recipe is saved:", error);
            }
          };
      

    },[])







  return (
    <View>
      <Text>RecipeDetailScreen</Text>
    </View>
  )
}

export default RecipeDetailScreen