import { usePlayer } from "@/providers/PlayerProvider";
import { AntDesign } from "@expo/vector-icons";
import { useAudioPlayerStatus } from "expo-audio";
import { Image, Pressable, Text, View } from "react-native";

export default function FloatingPlayer() {
  const { player, book } = usePlayer();
  const playerStatus = useAudioPlayerStatus(player);

  if (!book) return null;

  return (
    // <Link href="/player" asChild>
    <Pressable className="flex-row gap-4 items-center bg-slate-900 p-2">
      <Image
        source={{ uri: book.thumbnail_url }}
        className="w-16 aspect-square rounded-md"
      />
      <View className="gap-1 flex-1">
        <Text className="text-2xl font-bold text-gray-100">{book.title}</Text>
        <Text className="text-gray-400">{book.author}</Text>
      </View>
      <AntDesign
        onPress={() => (playerStatus.playing ? player.pause() : player.play())}
        name={
          playerStatus.isBuffering
            ? "USB"
            : playerStatus.playing
            ? "pause"
            : "playcircleo"
        }
        size={24}
        color="gainsboro"
      />
    </Pressable>
    // </Link>
  );
}
