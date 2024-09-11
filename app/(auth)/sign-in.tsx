import { View, Text, SafeAreaView, ScrollView,Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { images } from '@/constants/images'
import { Link, router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
      await signIn(form.email, form.password).then((response) => {

        const result =  getCurrentUser();
        setUser(result);
        setIsLogged(true);
        router.replace("/home");
      }).catch((error) => {

        Alert.alert("Error", error.message);
      }).finally(() => {
        setSubmitting(false);
      })
  };

  return (
    <SafeAreaView className="h-full">
    <ScrollView>
      <ThemedView
        className="w-full flex justify-center h-full px-4 my-6"
        style={{
          minHeight: Dimensions.get("window").height - 10,
        }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[115px] h-[34px] "
        />

        <ThemedText className="text-2xl font-semibold mt-5 font-psemibold">
          Log in to Aora
        </ThemedText>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e: string) => setForm({ ...form, email: e })} 
          otherStyles="mt-7"
          keyboardType="email-address"
          />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e: string) => setForm({ ...form, password: e })} 
          otherStyles="mt-7"
          keyboardType="password"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 mb-5"
            isLoading={isSubmitting}
          />

        <ThemedView className="flex justify-center pt-5 flex-row gap-2">
          <ThemedText className="text-lg text-gray-100 font-pregular">
            Don't have an account?
          </ThemedText>
          <Link
            href="/sign-up"
            className="text-lg font-psemibold text-secondary"
          >
            Signup
          </Link>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  </SafeAreaView>
  )
}

export default SignIn