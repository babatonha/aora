import { images } from "@/constants/images";
import {  Image } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { router } from "expo-router";
import CustomButton from "./CustomButton";

export interface Props {
    title: string;
    subtitle: string;
}

const EmptyState = (props: Props) => {
    const { title, subtitle } = props;

    return (
      <ThemedView className="flex justify-center items-center px-4">
        <Image
          source={images.empty}
          resizeMode="contain"
          className="w-[270px] h-[216px]"
        />
  
        <ThemedText className="text-sm font-pmedium text-gray-100">{title}</ThemedText>
        <ThemedText className="text-xl text-center font-psemibold text-white mt-2">
          {subtitle}
        </ThemedText>
  
        <CustomButton
          title="Back to Explore"
          handlePress={() => router.push("/home")}
          containerStyles="w-full my-5"
        />
      </ThemedView>
    )
}

export default EmptyState;
