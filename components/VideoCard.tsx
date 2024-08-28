import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";

import { icons } from "../constants";
import { createVideoPost, SaveVideoToUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const VideoCard = ({
  title,
  creator,
  avatar,
  thumbnail,
  video,
  allowSave,
  prompt,
}: any) => {
  const [play, setPlay] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { user }: any = useGlobalContext();

  const [form, setForm] = useState({
    title,
    videoUrl: video,
    thumbnailUrl: thumbnail,
    prompt,
  });

  const addVideoToBookmark = async () => {
    if (
      form.prompt === "" ||
      form.title === "" ||
      !form.thumbnailUrl ||
      !form.videoUrl ||
      !form.prompt
    ) {
      return Alert.alert("Please provide all fields");
    }

    try {
      await SaveVideoToUser({
        ...form,
        userId: user.asccountId,
      });

      Alert.alert("Success", "Post uploaded successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2 items-end  z-10">
          <TouchableOpacity onPress={() => setClicked(!clicked)}>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {allowSave && clicked ? (
            <TouchableOpacity
              className="flex-row bg-[#232533] p-4 rounded-md space-x-2 mt-2 -mb-12"
              activeOpacity={0.7}
              onPress={addVideoToBookmark}
            >
              <Image
                source={icons.bookmark}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-white">save</Text>
            </TouchableOpacity>
          ) : (
            ""
          )}
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
