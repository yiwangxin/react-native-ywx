import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export enum Environment {
  Public = 0, // 生产环境
  Szyx = 1, // 医信环境
  Test = 2, // 集成环境
  Beta = 3, // 测试环境
  Dev = 4, // 开发环境
  Custom = 5, // 自定义域名环境
}

export interface Result {
  status: string; // 状态码
  message: string; // 状态信息
  data: unknown; // 数据
}

export interface Spec extends TurboModule {
  // ---------------- 初始化 ----------------

  /**
   * 初始化 SDK
   * @param clientId 厂商 ID
   * @param environment 环境枚举
   * @param customUrl 自定义域名
   */
  initialize(
    clientId: string,
    environment: Environment,
    customUrl?: string
  ): void;

  /**
   * 设置导航栏样式
   * @param tintColor 字体颜色（例如 processColor('#FFF000') as number）
   * @param backgroundColor 背景颜色（例如 processColor('#FFFFFF') as number）
   */
  setNavigationBarStyle(tintColor: number, backgroundColor: number): void;

  // ---------------- 证书相关 ----------------

  /**
   * 本地证书是否存在
   * @param phone 手机号
   */
  hasCertificate(phone?: string): boolean;

  /**
   * 下载证书
   * @param phone 手机号
   * @param firmId 子厂商id
   * @returns Promise 包含 status/message/data
   */
  downloadCertificate(phone: string, firmId?: string): Promise<Result>;

  /**
   * 更新证书
   * @param firmId 子厂商id
   * @returns Promise 包含 status/message/data
   */
  updateCertificate(firmId?: string): Promise<Result>;

  /**
   * 重置证书 PIN
   * @param firmId 子厂商id
   * @returns Promise 包含 status/message/data
   */
  resetCertificatePin(firmId?: string): Promise<Result>;

  /**
   * 证书详情
   * @param firmId 子厂商id
   * @returns Promise 包含 status/message/data
   */
  showCertificateDetail(firmId?: string): Promise<Result>;

  /**
   * 移除本地证书
   */
  clearCertificate(): boolean;

  /**
   * 获取用户信息
   * @returns Promise 包含 status/message/data
   */
  getUserInfo(): Promise<Result>;

  // ---------------- 签章相关 ----------------

  /**
   * 获取签章图片 Base64
   */
  getSignatureBase64(): string;

  /**
   * 配置签章
   * @param firmIds 子厂商id列表
   * @returns Promise 包含 status/message/data
   */
  drawStamp(firmIds?: string[]): Promise<Result>;

  // ---------------- 签名相关 ----------------

  /**
   * 签名
   * @param uniqueIds 签名数据的uniqueId列表
   * @param firmId 子厂商id
   * @returns Promise 包含 status/message/data
   */
  sign(uniqueIds: string[], firmId?: string): Promise<Result>;

  /**
   * 协同签名
   * @param uniqueIds 签名数据的uniqueId列表
   * @returns Promise 包含 status/message/data
   */
  teamSign(uniqueIds: string[]): Promise<Result>;

  /**
   * 开始 Oauth 登录
   * @param uuid uuid
   * @param grantOpenId 授权人id
   * @param grantUserName 授权人名称
   * @returns Promise 包含 status/message/data
   */
  startOauthLogin(
    uuid: string,
    grantOpenId?: string,
    grantUserName?: string
  ): Promise<Result>;

  // ---------------- 二维码相关 ----------------

  /**
   * 对二维码信息进行识别处理
   * @param qrString 二维码字符串信息
   * @param handleGrantOauth 是否处理授权登录
   * @returns Promise 包含 status/message/data
   */
  handleQrCode(qrString: string, handleGrantOauth?: boolean): Promise<Result>;

  // ---------------- 自动签 ----------------

  /**
   * 开启自动签名
   * @param sysTag 开启自动签名的系统标识名（需和服务端保持一致）
   * @param firmId 子厂商id
   * @returns Promise 包含 status/message/data
   */
  startAutoSign(sysTag: string, firmId?: string): Promise<Result>;

  /**
   * 关闭自动签名
   * @param sysTag 开启自动签名的系统标识名（需和服务端保持一致）
   * @param firmId 子厂商id
   * @returns Promise 包含 status/message/data
   */
  stopAutoSign(sysTag: string, firmId?: string): Promise<Result>;

  /**
   * 获取自动签信息
   * @returns Promise 包含 status/message/data
   */
  getAutoSignInfo(): Promise<Result>;

  // ---------------- 免密 ----------------

  /**
   * 开启免密签名
   * @param days 单位天（1-60）
   * @returns Promise 包含 status/message/data
   */
  enablePinExemption(days: number): Promise<Result>;

  /**
   * 关闭免密签名
   */
  clearPin(): void;

  /**
   * 当前是否处于免密状态
   */
  isPinExempt(): boolean;

  // ---------------- 生物识别 ----------------

  /**
   * 开启生物识别
   * @returns Promise 包含 status/message/data
   */
  enableBiometricAuth(): Promise<Result>;

  /**
   * 关闭生物识别
   * @returns Promise 包含 status/message/data
   */
  disableBiometricAuth(): Promise<Result>;

  /**
   * 是否已开启生物识别
   */
  isBiometricAuthEnabled(): boolean;

  // ---------------- 授权签名 ----------------

  /**
   * 开启授权签名
   * @param firmId 子厂商id
   * @param grantedUserId 指定授权用户的id
   * @param hours 单位小时
   * @returns Promise 包含 status/message/data
   */
  grantSignature(
    firmId: string,
    grantedUserId: string,
    hours: number
  ): Promise<Result>;

  /**
   * 关闭授权签名
   * @param firmId 子厂商id
   * @param grantedUserId 指定授权用户的id
   * @returns Promise 包含 status/message/data
   */
  revokeSignature(firmId: string, grantUniqueId: string): Promise<Result>;

  // ---------------- 配置相关 ----------------

  /**
   * 当前环境
   */
  getCurrentEnvironment(): Environment;

  /**
   * 当前环境 URL
   */
  getCurrentEnvironmentUrl(): string;

  /**
   * SDK 版本号
   */
  getVersion(): string;

  /**
   * 当前语言
   */
  getCurrentLanguage(): string;

  /**
   * 用户 openId
   */
  getOpenId(): string | undefined;

  /**
   * 修改界面语言
   * @param language 语言字符串 zh-Hans 中文 en 英文
   */
  changeLanguage(language: string): void;

  /**
   * 显示 PIN 输入页面
   * @returns Promise 包含 status/message/data
   */
  showPinInput(): Promise<Result>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Ywx');
