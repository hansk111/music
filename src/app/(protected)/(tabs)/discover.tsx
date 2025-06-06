import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";


import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';


export default function Discover() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongUri, setCurrentSongUri] = useState(null);
  const [currentSongName, setCurrentSongName] = useState('재생할 MP3를 선택하세요.');
  const [mp3Files, setMp3Files] = useState([]);


  const player = useAudioPlayer(currentSongUri);
  const playerStatus = useAudioPlayerStatus(player);

  const pickAudio = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg', // MP3 파일만 필터링
        copyToCacheDirectory: false, // Android에서 임시 파일로 복사하여 접근 용이
        multiple: true,
      });

      if (!result.canceled) {
        const selectedMp3s = result.assets
          .filter(asset => asset.mimeType === 'audio/mpeg' || asset.uri.endsWith('.mp3'))
          .map(asset => ({
            name: asset.name,
            uri: asset.uri,
            size: asset.size,
          }));
        setMp3Files(selectedMp3s);
        console.log('선택된 MP3 파일들:', selectedMp3s);
        setCurrentSongUri(selectedMp3s[0].uri)

      } else {
        console.log('파일 선택이 취소되었습니다.');
        setMp3Files([]); // 선택 취소 시 목록 비우기
      }
    } catch (error) {
      console.error('MP3 파일 선택 중 오류 발생:', err);
      Alert.alert('오류', 'MP3 파일을 선택하는 중 오류가 발생했습니다.');
    }
  };


  return (
    <View className="flex-1 justify-center items-center p-4 gap-4">
      <Text className="text-white text-2xl font-bold text-center">MP3 파일 목록 가져오기</Text>
      <Button title="MP3 파일 선택" onPress={pickAudio} />
      <Text className="text-white text-2xl font-bold text-center">선택된 MP3 파일:</Text>
      <ScrollView className="flex-1">
        {mp3Files.length > 0 ? (
          mp3Files.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <Text className="text-white text-xl font-bold ">이름: {file.name}</Text>
              {/* <Text className="text-white font-bold ">URI: {file.uri}</Text>
              <Text className="text-white font-bold">크기: {file.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '알 수 없음'}</Text> */}
            </View>
          ))
        ) : (
          <Text>선택된 MP3 파일이 없습니다.</Text>
        )}
      </ScrollView>
      
      <View style={styles.controls}>
        <Button
          title={isPlaying ? '일시 정지' : '재생'}
           onPress={() =>
              playerStatus.playing ? player.pause() : player.play()
            }
          disabled={!currentSongUri}
        />
        <Button
          title="정지"
          onPress={() => player.pause()}
          disabled={!currentSongUri || !isPlaying}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  currentSong: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 30,
    width: '80%',
    justifyContent: 'space-around',
  },
});