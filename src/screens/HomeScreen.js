import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Image,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import axios from "axios";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState("Beef");
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    async function getCategories() {
        await axios
            .get("http://themealdb.com/api/json/v1/1/categories.php")
            .then((response) => {
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.log("Error: " + error.message);
            });
    }

    async function getRecipes(category = "Beef") {
        await axios
            .get(`http://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then((response) => {
                setMeals(response.data.meals);
            })
            .catch((error) => {
                console.log("Error: " + error.message);
            });
    }

    const handleChangeCategory = category => {
      setActiveCategory(category);
      getRecipes(category)
      setMeals([])
    }

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle={"light-content"} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6 pt-5"
            >
                <View className="flex-row justify-between items-center mb-2 mx-4">
                    <Image
                        source={require("../../assets/image/avatar.png")}
                        style={{ width: hp(5), height: hp(5.5) }}
                    />
                    <BellIcon size={hp(4)} color="gray" />
                </View>

                <View className="mx-4 space-y-2 mb-2">
                    <Text
                        style={{ fontSize: hp(1.7) }}
                        className="text-neutral-600"
                    >
                        Hello, Ajinkya!
                    </Text>
                    <View>
                        <Text
                            style={{ fontSize: hp(3.8) }}
                            className="font-semibold text-neutral-600"
                        >
                            Make your own food,
                        </Text>
                    </View>
                    <Text
                        style={{ fontSize: hp(3.8) }}
                        className="font-semibold text-neutral-600"
                    >
                        stay at <Text className="text-amber-400">home</Text>
                    </Text>
                </View>

                <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput
                        placeholder="Search any recipe"
                        placeholderTextColor={"gray"}
                        style={{ fontSize: hp(1.7) }}
                        className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    />
                    <View className="bg-white rounded-full p-3">
                        <MagnifyingGlassIcon
                            size={hp(2.5)}
                            strokeWidth={3}
                            color="gray"
                        />
                    </View>
                </View>

                <View>
                    {categories && (
                        <Categories
                            categories={categories}
                            activeCategory={activeCategory}
                            handleChangeCategory={handleChangeCategory}
                        />
                    )}
                </View>

                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>
            </ScrollView>
        </View>
    );
}
