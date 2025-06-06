import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const Profile = () => {
  const { signOut } = useAuth();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-2xl text-white">Profile</Text>
      <Button title="Sign Out" onPress={() => signOut()}></Button>
      <Link href="/(protected)/player">go to player</Link>
    </View>
  );
};

export default Profile;
