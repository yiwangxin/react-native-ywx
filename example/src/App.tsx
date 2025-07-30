import { Text, View, StyleSheet } from 'react-native';
import { Environment, initialize, downloadCertificate } from 'react-native-ywx';

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
