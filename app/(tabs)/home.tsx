import { View, Text , FlatList, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { Models } from 'react-native-appwrite'
import VideoCard from '@/components/VideoCard'


const Home = () => {
  const {data: posts, refetch} = useAppwrite(() => getAllPosts());
  const {data: latestPosts,} = useAppwrite(() => getLatestPosts());
  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };



  const list = posts?.map((post: Models.Document) => {
    return {
      id: post.$id,
      title: post.title,
      thumbnail: post.thumbnail,
      video: post.video,
      creator: post.creator,
      avatar: post.creator.avatar
    }
  });

  return (

    <SafeAreaView>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
            <ThemedView className="flex my-6 px-4 space-y-6">
              <ThemedView className="flex justify-between items-start flex-row mb-6">
              <ThemedView>
              <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  View Tonha
                </Text>
              </ThemedView>

              <ThemedView className="mt-1.5">
                <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                
              </ThemedView>
              </ThemedView>

              <SearchInput />

              <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts} />
            </View>

            </ThemedView>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        
      />

    </SafeAreaView>

  )
}

export default Home