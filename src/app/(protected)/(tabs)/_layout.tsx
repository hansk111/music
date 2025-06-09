import FloatingPlayer from "@/components/FloatingPlayer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <>
          <FloatingPlayer />
          <BottomTabBar {...props} />
        </>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="mp3player"
        options={{
          title: "mp3_player",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder-open-sharp" size={size} color={color} />
          ),
          // headerShown: false,
        }}
      />
    </Tabs>
  );
}
