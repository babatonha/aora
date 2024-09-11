import { View, Text } from "react-native";

export interface Props{
    title: any;
    subtitle?: string;
    containerStyles?: string;
    titleStyles?: string;
}

const InfoBox = (prop: Props) => {
  const { title, subtitle, containerStyles, titleStyles } = prop;
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;