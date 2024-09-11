import { View, Text } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const BookMark = () => {
  return (
    <ThemedView className="flex-1 items-center justify-center">
    <ThemedText className="text-3xl font-pblack">Bookmark!</ThemedText>
  </ThemedView>
  )
}

export default BookMark