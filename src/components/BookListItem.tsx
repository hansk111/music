import { usePlayer } from "@/providers/PlayerProvider";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type Book = {
  id: string;
  title: string;
  author: string;
  audio_url: string;
  thumbnail_url: string;
};

type BookListItemProps = {
  book: Book;
};

export default function BookListItem({ book }: BookListItemProps) {
  const { setBook } = usePlayer();

  return (
    <Link href="/(protected)/player" asChild>
      <Pressable
        onPress={() => setBook(book)}
        className="flex-row gap-4 items-center"
      >
        <Image
          source={{ uri: book.thumbnail_url }}
          className="w-16 aspect-square rounded-md"
        />
        <View className="gap-1 flex-1">
          <Text className="text-2xl font-bold text-gray-100">{book.title}</Text>
          <Text className="text-gray-400">{book.author}</Text>
        </View>
        <AntDesign name="playcircleo" size={24} color="gainsboro" />
      </Pressable>
    </Link>
  );
}
