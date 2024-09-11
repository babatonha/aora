import { View, Text, SafeAreaView, ScrollView,Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { images } from '@/constants/images'
import { Link, router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })


  const submit = async() => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      //setUser(result);
      //setIsLogged(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
    <ScrollView>
      <ThemedView className="w-full flex justify-center px-4 my-6"
        style={{
          minHeight: Dimensions.get("window").height - 10,
        }}>
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[115px] h-[34px] "
        />

        <ThemedText className="text-2xl font-semibold mt-5 font-psemibold">
          Sign Up to Aora
        </ThemedText>

        <FormField
          title="Username"
          value={form.email}
          handleChangeText={(e: string) => setForm({ ...form, username: e })} 
          otherStyles="mt-7"
        />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7 mb-5"
            isLoading={isSubmitting}
          />

        <ThemedView className="flex justify-center pt-5 flex-row gap-2">
          <ThemedText className="text-lg text-gray-100 font-pregular">
            Have an account?
          </ThemedText>
          <Link
            href="/sign-in"
            className="text-lg font-psemibold text-secondary"
          >
            Sign in
          </Link>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  </SafeAreaView>
  )
}

export default SignUp