import { Text, View, StyleSheet, processColor, Platform } from 'react-native';
import {
  Environment,
  initialize,
  downloadCertificate,
  setNavigationBarStyle,
  updateCertificate,
} from 'react-native-ywx';

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          initialize('123', Environment.Dev);
        }}
      >
        初始化
      </Text>
      <Text> </Text>
      <Text
        onPress={() => {
          if (Platform.OS === 'ios') {
            setNavigationBarStyle(
              processColor('#FFF000') as number,
              processColor('#FFFFFF') as number
            );
          }
        }}
      >
        设置导航栏样式
      </Text>
      <Text> </Text>
      <Text
        onPress={() => {
          downloadCertificate('13012345678')
            .then((res) => {
              console.log(res.status);
              console.log(res.message);
              console.log(res.data);
            })
            .catch((e) => {
              console.log(e.message);
            });
        }}
      >
        下载证书
      </Text>
      <Text> </Text>
      <Text
        onPress={() => {
          updateCertificate()
            .then((res) => {
              console.log(res.status);
              console.log(res.message);
              console.log(res.data);
            })
            .catch((e) => {
              console.log(e.message);
            });
        }}
      >
        更新证书
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
