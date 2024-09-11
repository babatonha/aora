import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import CustomButton from '@/components/CustomButton';
import { Redirect, router } from "expo-router";
import { useGlobalContext } from '@/context/GlobalProvider';



const Index = () => {
  const { isLogged, user, loading } = useGlobalContext();

  if(isLogged && !loading) {
    return <Redirect href="/(tabs)/home" />
  }

  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <ThemedView className='w-full justify-center items-center h-full px-4'>
            <Image 
                source={images.logo}
                className="w-[130px] h-[84px]"
                resizeMode='contain' 
            />
            <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <ThemedView className="relative mt-5">
            <ThemedText className="text-3xl font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <ThemedText className="text-secondary-200">Aora</ThemedText>
            </ThemedText>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </ThemedView>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

        </ThemedView>
   
       </ScrollView>  
    </SafeAreaView>
  )
}

export default Index