import { Link } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { Image, StatusBar, Text, View } from "react-native";

export default function Index() {
  return (
    <View className=" flex-1 items-center justify-center bg-white">
      <Text>Aora!</Text>
      <ExpoStatusBar style="auto" />
      <Link href={"/home"} className="text-blue-500">
        Go to Home
      </Link>
    </View>
  );
}
