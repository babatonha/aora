import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { icons } from '@/constants/icons'

export interface Props {
    title: string
    value: string
    placeholder?: string
    handleChangeText: (text: string) => void
    otherStyles?: string;
    keyboardType?: string;
}

const FormField = (props: Props) => {
  const { title, value, placeholder, handleChangeText, otherStyles, keyboardType, } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <ThemedView className={`space-y-2 ${otherStyles}`}>
      <ThemedText className='text-base text-gray-100 font-pmedium'>{title}</ThemedText>
      
      <ThemedView className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </ThemedView>

      
    </ThemedView>
  )
}

export default FormField