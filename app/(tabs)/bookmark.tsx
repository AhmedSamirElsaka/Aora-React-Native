import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { EmptyState, SearchInput, VideoCard } from "@/components";
import { useLocalSearchParams } from "expo-router";
import {
  getLatestPosts,
  getUserSavedVideos,
  searchPosts,
} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Post } from "./home";
import { useGlobalContext } from "@/context/GlobalProvider";

const Bookmark = () => {
  const { user }: any = useGlobalContext();

  console.log(user, "user");
  const { data: posts, refetch }: { data: Post[]; refetch: () => void } =
    useAppwrite(() => getUserSavedVideos(user.asccountId));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={"item.users.username"}
            avatar={user.avatar}
            allowSave={false}
            prompt={item.prompt}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4 pt-8">
              <Text className="font-pmedium text-gray-100 text-3xl text-">
                Saved Videos
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={""} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({});
