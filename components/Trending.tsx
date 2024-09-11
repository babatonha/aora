import React, { useState } from 'react'
import { FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Models } from 'react-native-appwrite';
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import { icons } from '@/constants/icons';


export interface Props{
  posts: Models.Document[];
}

export interface TendingItemProps{
  activeItem: string;
  item: Models.Document;
}

const zoomIn = {
  0: { opacity: 0, scale: 0.9 },
  1: { opacity: 1, scale: 1 },
};

const zoomOut = {
  0: { opacity: 1, scale: 1 },
  1: { opacity: 1, scale: 0.9 },
};

const TrendingItem = (props: TendingItemProps) => {
  const { activeItem, item } = props;
  const [play, setPlay] = useState(false);


  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomOut : zoomIn}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status:  AVPlaybackStatus) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};


const Trending = (props: Props) => {
  const { posts } = props;

  const [activeItem, setActiveItem] = useState(posts[0]);



  const viewableItemsChanged = ({ viewableItems } : any) => {
    
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
};

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem.$id} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0}}
    />
  );
}

export default Trending