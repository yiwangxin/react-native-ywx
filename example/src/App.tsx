import { useState, type ReactNode } from 'react';
import {
  Text,
  StyleSheet,
  processColor,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Environment,
  initialize,
  downloadCertificate,
  setNavigationBarStyle,
  updateCertificate,
  hasCertificate,
  resetCertificatePin,
  showCertificateDetail,
  clearCertificate,
  getUserInfo,
  getSignatureBase64,
  drawStamp,
  getCurrentEnvironment,
  getCurrentEnvironmentUrl,
  getVersion,
  getCurrentLanguage,
  getOpenId,
  changeLanguage,
  showPinInput,
  getAutoSignInfo,
  enablePinExemption,
  clearPin,
  isPinExempt,
  enableBiometricAuth,
  disableBiometricAuth,
  isBiometricAuthEnabled,
  // sign,
  // teamSign,
  // startOauthLogin,
  // handleQrCode,
  // startAutoSign,
  // stopAutoSign,
  // grantSignature,
  // revokeSignature,
} from '@digitalyixin/react-native-ywx';
import Toast from 'react-native-toast-message';

export default function App() {
  const [cliendId, setCliendId] = useState('2015112716143758');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firmId, setFirmId] = useState('');
  const [specificPhone, setSpecificPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Section title="初始化">
          <TextInput
            style={styles.textInput}
            placeholder="请输入cliendId"
            value={cliendId}
            onChangeText={(value) => setCliendId(value)}
          />
          <Item
            title="初始化"
            description="初始化SDK"
            onPress={() => {
              if (cliendId.length === 0) {
                Toast.show({
                  type: 'error',
                  text2: '请输入clientId',
                });
                return;
              }
              initialize(cliendId, Environment.Dev);
              Toast.show({
                type: 'success',
                text1: '初始化完成',
              });
            }}
          />
          <Item
            title="设置导航栏样式"
            description="仅iOS生效。这里将导航栏字体设置为'#FFF000'"
            onPress={() => {
              if (Platform.OS === 'ios') {
                setNavigationBarStyle(
                  processColor('#FFF000') as number,
                  processColor('#FFFFFF') as number
                );
                Toast.show({
                  type: 'success',
                  text1: '设置完成',
                });
              }
            }}
          />
        </Section>
        <Section title="证书相关">
          <TextInput
            style={styles.textInput}
            placeholder="请输入手机号"
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="请输入firmId"
            value={firmId}
            onChangeText={(value) => setFirmId(value)}
          />
          <Item
            title="证书是否存在"
            description="输入指定手机号则查询指定手机号是否存在"
            onPress={() => {
              const res = hasCertificate(
                specificPhone.length > 0 ? specificPhone : undefined
              );
              Toast.show({
                type: 'info',
                text1: '证书是否存在',
                text2: `${res}`,
              });
            }}
          >
            <TextInput
              style={styles.textInput}
              placeholder="请输入指定的手机号"
              value={specificPhone}
              onChangeText={(value) => setSpecificPhone(value)}
            />
          </Item>
          <Item
            title="下载证书"
            onPress={() => {
              if (phoneNumber.length === 0) {
                Toast.show({
                  type: 'error',
                  text2: '请输入手机号',
                });
                return;
              }
              downloadCertificate(
                phoneNumber,
                firmId.length === 0 ? undefined : firmId
              )
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
          <Item
            title="更新证书"
            onPress={() => {
              updateCertificate(firmId.length === 0 ? undefined : firmId)
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
          <Item
            title="重置证书"
            onPress={() => {
              resetCertificatePin(firmId.length === 0 ? undefined : firmId)
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
          <Item
            title="证书详情"
            hideSeparator={true}
            onPress={() => {
              showCertificateDetail(firmId.length === 0 ? undefined : firmId)
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
          <Item
            title="清除证书"
            onPress={() => {
              clearCertificate();
              Toast.show({
                type: 'success',
                text2: '已清除证书',
              });
            }}
          />
          <Item
            title="获取用户信息"
            hideSeparator={true}
            onPress={() => {
              getUserInfo()
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
        </Section>
        <Section title="签章相关">
          <Item
            title="签章图片 base64"
            onPress={() => {
              const res = getSignatureBase64();
              Toast.show({
                type: 'success',
                text2: JSON.stringify(res),
              });
            }}
          />
          <Item
            title="配置签章"
            onPress={() => {
              drawStamp()
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
        </Section>
        <Section title="签名相关">
          <Item
            title="签名"
            onPress={() => {
              // TODO: todo
              Toast.show({ type: 'info', text1: '暂无示例' });
              // sign([], firmId)
              //   .then((res) => {
              //     console.log(res.status);
              //     console.log(res.message);
              //     console.log(res.data);
              //     Toast.show({
              //       type: 'success',
              //       text1: res.message,
              //       text2: JSON.stringify(res.data),
              //     });
              //   })
              //   .catch((e) => {
              //     Toast.show({
              //       type: 'error',
              //       text2: e.message,
              //     });
              //   });
            }}
          />
          <Item
            title="协同签名"
            description="医网信App专用"
            onPress={() => {
              // TODO: todo
              Toast.show({ type: 'info', text1: '暂无示例' });
              // teamSign([])
              //   .then((res) => {
              //     console.log(res.status);
              //     console.log(res.message);
              //     console.log(res.data);
              //     Toast.show({
              //       type: 'success',
              //       text1: res.message,
              //       text2: JSON.stringify(res.data),
              //     });
              //   })
              //   .catch((e) => {
              //     Toast.show({
              //       type: 'error',
              //       text2: e.message,
              //     });
              //   });
            }}
          />
          <Item
            title="开始Oauth登录"
            description="医网信App专用"
            hideSeparator={true}
            onPress={() => {
              // TODO: todo
              Toast.show({ type: 'info', text1: '暂无示例' });
              // startOauthLogin('')
              //   .then((res) => {
              //     console.log(res.status);
              //     console.log(res.message);
              //     console.log(res.data);
              //     Toast.show({
              //       type: 'success',
              //       text1: res.message,
              //       text2: JSON.stringify(res.data),
              //     });
              //   })
              //   .catch((e) => {
              //     Toast.show({
              //       type: 'error',
              //       text2: e.message,
              //     });
              //   });
            }}
          />
        </Section>
        <Section title="二维码相关">
          <Item
            title="处理二维码"
            onPress={() => {
              // TODO: todo
              Toast.show({ type: 'info', text1: '暂无示例' });
              // handleQrCode('')
              //   .then((res) => {
              //     console.log(res.status);
              //     console.log(res.message);
              //     console.log(res.data);
              //     Toast.show({
              //       type: 'success',
              //       text1: res.message,
              //       text2: JSON.stringify(res.data),
              //     });
              //   })
              //   .catch((e) => {
              //     Toast.show({
              //       type: 'error',
              //       text2: e.message,
              //     });
              //   });
            }}
          />
        </Section>
        <Section title="自动签">
          <Item
            title="开启自动签名"
            onPress={() => {
              // TODO: todo
              Toast.show({ type: 'info', text1: '暂无示例' });
              // startAutoSign('', firmId)
              //   .then((res) => {
              //     console.log(res.status);
              //     console.log(res.message);
              //     console.log(res.data);
              //     Toast.show({
              //       type: 'success',
              //       text1: res.message,
              //       text2: JSON.stringify(res.data),
              //     });
              //   })
              //   .catch((e) => {
              //     Toast.show({
              //       type: 'error',
              //       text2: e.message,
              //     });
              //   });
            }}
          />
          <Item
            title="关闭自动签名"
            onPress={() => {
              // TODO: todo
              Toast.show({ type: 'info', text1: '暂无示例' });
              // stopAutoSign('', firmId)
              //   .then((res) => {
              //     console.log(res.status);
              //     console.log(res.message);
              //     console.log(res.data);
              //     Toast.show({
              //       type: 'success',
              //       text1: res.message,
              //       text2: JSON.stringify(res.data),
              //     });
              //   })
              //   .catch((e) => {
              //     Toast.show({
              //       type: 'error',
              //       text2: e.message,
              //     });
              //   });
            }}
          />
          <Item
            title="获取自动签名信息"
            hideSeparator={true}
            onPress={() => {
              getAutoSignInfo()
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
        </Section>
        <Section title="免密">
          <Item
            title="开启免密签名"
            description="开启3天的免密"
            onPress={() => {
              enablePinExemption(3)
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
          <Item
            title="关闭免密签名"
            onPress={() => {
              clearPin();
              Toast.show({ type: 'success', text2: '关闭成功' });
            }}
          />
          <Item
            title="免密状态"
            hideSeparator={true}
            onPress={() => {
              const res = isPinExempt();
              Toast.show({
                type: 'success',
                text1: '免密状态',
                text2: JSON.stringify(res),
              });
            }}
          />
        </Section>
        <Section title="生物识别">
          <Item
            title="开启生物识别"
            onPress={() => {
              enableBiometricAuth()
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
          <Item
            title="关闭生物识别"
            onPress={() => {
              disableBiometricAuth()
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
          <Item
            title="生物识别状态"
            hideSeparator={true}
            onPress={() => {
              const res = isBiometricAuthEnabled();
              Toast.show({
                type: 'success',
                text1: '生物识别状态',
                text2: JSON.stringify(res),
              });
            }}
          />
        </Section>
        <Section title="授权签名">
          <Item
            title="开启授权签名"
            onPress={() => {
              // TODO: todo
              Toast.show({ type: 'info', text1: '暂无示例' });
              // grantSignature(firmId, '', 1)
              //   .then((res) => {
              //     console.log(res.status);
              //     console.log(res.message);
              //     console.log(res.data);
              //     Toast.show({
              //       type: 'success',
              //       text1: res.message,
              //       text2: JSON.stringify(res.data),
              //     });
              //   })
              //   .catch((e) => {
              //     Toast.show({
              //       type: 'error',
              //       text2: e.message,
              //     });
              //   });
            }}
          />
          <Item
            title="关闭授权签名"
            hideSeparator={true}
            onPress={() => {
              // TODO: todo
              Toast.show({ type: 'info', text1: '暂无示例' });
              // revokeSignature(firmId, '')
              //   .then((res) => {
              //     console.log(res.status);
              //     console.log(res.message);
              //     console.log(res.data);
              //     Toast.show({
              //       type: 'success',
              //       text1: res.message,
              //       text2: JSON.stringify(res.data),
              //     });
              //   })
              //   .catch((e) => {
              //     Toast.show({
              //       type: 'error',
              //       text2: e.message,
              //     });
              //   });
            }}
          />
        </Section>
        <Section title="配置信息">
          <Item
            title="当前环境"
            onPress={() => {
              const res = getCurrentEnvironment();
              Toast.show({
                type: 'success',
                text1: '当前环境',
                text2: JSON.stringify(res),
              });
            }}
          />
          <Item
            title="当前环境 url"
            onPress={() => {
              const res = getCurrentEnvironmentUrl();
              Toast.show({
                type: 'success',
                text1: '当前环境 url',
                text2: JSON.stringify(res),
              });
            }}
          />
          <Item
            title="SDK 版本号"
            onPress={() => {
              const res = getVersion();
              Toast.show({
                type: 'success',
                text1: 'SDK 版本号',
                text2: JSON.stringify(res),
              });
            }}
          />
          <Item
            title="当前语言"
            onPress={() => {
              const res = getCurrentLanguage();
              Toast.show({
                type: 'success',
                text1: '当前语言',
                text2: JSON.stringify(res),
              });
            }}
          />
          <Item
            title="用户 openId"
            onPress={() => {
              const res = getOpenId();
              Toast.show({
                type: 'success',
                text1: '用户 openId',
                text2: JSON.stringify(res),
              });
            }}
          />
          <Item
            title="修改界面语言"
            onPress={() => {
              changeLanguage('zh-Hans');
              Toast.show({
                type: 'success',
                text2: '修改为中文',
              });
            }}
          />
          <Item
            title="显示 PIN 输入页面"
            hideSeparator={true}
            onPress={() => {
              showPinInput()
                .then((res) => {
                  console.log(res.status);
                  console.log(res.message);
                  console.log(res.data);
                  Toast.show({
                    type: 'success',
                    text1: res.message,
                    text2: JSON.stringify(res.data),
                  });
                })
                .catch((e) => {
                  Toast.show({
                    type: 'error',
                    text2: e.message,
                  });
                });
            }}
          />
        </Section>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

function Section(props: { title: string; children?: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{props.title}</Text>
      {props.children && (
        <View style={styles.sectionContent}>{props.children}</View>
      )}
    </View>
  );
}

function Item(props: {
  title: string;
  description?: string;
  onPress?: () => void;
  hideSeparator?: boolean;
  children?: ReactNode;
}) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={() => {
          props.onPress && props.onPress();
        }}
      >
        <Text style={styles.itemTitle} numberOfLines={1}>
          {props.title}
        </Text>
        {props.description && (
          <Text style={styles.itemDescription}>{props.description}</Text>
        )}
      </TouchableOpacity>
      {props.children && (
        <View style={styles.itemChildren}>{props.children}</View>
      )}
      {props.hideSeparator !== true && <View style={styles.separator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  scroll: {},
  section: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 10,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },
  textInput: {
    minHeight: 50,
    padding: 10,
  },
  item: {},
  itemContent: {
    padding: 10,
    minHeight: 50,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemDescription: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#888888',
  },
  itemChildren: {
    margin: 10,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#EEEEEE',
    marginHorizontal: 0,
  },
});
