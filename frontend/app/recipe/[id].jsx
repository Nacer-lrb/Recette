import { View, Text,ScrollView,TouchableOpacity} from 'react-native'
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {useUser} from "@clerk/clerk-expo"
import {MealAPI} from "../../services/mealAPI"
import LoadingSpinner from "../../components/LoadingSpinner";
import { API_URL } from "../../constants/api";
import { recipeDetailStyles } from "../../assets/styles/recipe-detail.styles";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
    const RecipeDetailScreen = () => {
      const router = useRouter()

    const {id:recipeId} = useLocalSearchParams()
   
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
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


          const loadRecipeDetail = async () => {
            setLoading(true);
            try {
              const mealData = await MealAPI.getMealById(recipeId);
              if (mealData) {
                const transformedRecipe = MealAPI.transformMealData(mealData);
      
                const recipeWithVideo = {
                  ...transformedRecipe,
                  youtubeUrl: mealData.strYoutube || null,
                };
      
      
                setRecipe(recipeWithVideo);
              }
      
            }
      
            catch(error){
              console.error("Error loading recipe detail:", error);
      
            }finally{
      
              setLoading(false)
            }
      
            
          }
      
      checkIfSaved()
      loadRecipeDetail()
      

    },[recipeId, userId]);
   
    const getYouTubeEmbedUrl = (url) => {
      // example url: https://www.youtube.com/watch?v=mTvlmY4vCug
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    };

    const handleToggleSave = async () => {
      setIsSaving(true);
  
      try {
        if (isSaved) {
          // remove from favorites
          const response = await fetch(`${API_URL}/api/favorites/${userId}/${recipeId}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to remove recipe");
  
          setIsSaved(false);
        } else {
          // add to favorites
          const response = await fetch(`${API_URL}/api/favorites`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              recipeId: parseInt(recipeId),
              title: recipe.title,
              image: recipe.image,
              cookTime: recipe.cookTime,
              servings: recipe.servings,
            }),
          });
  
          if (!response.ok) throw new Error("Failed to save recipe");
          setIsSaved(true);
        }
      } catch (error) {
        console.error("Error toggling recipe save:", error);
        Alert.alert("Error", `Something went wrong. Please try again.`);


      } finally {
        setIsSaving(false);
      }
    };
  
    if (loading) return <LoadingSpinner message="Loading recipe details..." />;



  return (
    <View style={recipeDetailStyles.container}>
      <ScrollView>
      <View style={recipeDetailStyles.headerContainer}>
      <View style={recipeDetailStyles.imageContainer}>
      <Image
              source={{ uri: recipe.image }}
              style={recipeDetailStyles.headerImage}
              contentFit="cover"
            />
          </View>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
            style={recipeDetailStyles.gradientOverlay}
          />
           <View style={recipeDetailStyles.floatingButtons}>
            <TouchableOpacity
              style={recipeDetailStyles.floatingButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
            

          </View>

        </View>

      </ScrollView>
     
    </View>
  )
}

export default RecipeDetailScreen