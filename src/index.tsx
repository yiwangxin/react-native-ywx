import Ywx, { Environment, type Result } from './NativeYwx';

// ---------------- 初始化 ----------------

/**
 * 初始化 SDK
 * @param clientId 厂商 ID
 * @param environment 环境枚举
 * @param customUrl 自定义域名
 */
export function initialize(
  clientId: string,
  environment: Environment,
  customUrl?: string
): void {
  return Ywx.initialize(clientId, environment, customUrl);
}

/**
 * 设置导航栏样式
 * @param tintColor 字体颜色（例如 processColor('#FFF000') as number）
 * @param backgroundColor 背景颜色（例如 processColor('#FFFFFF') as number）
 */
export function setNavigationBarStyle(
  tintColor: number,
  backgroundColor: number
): void {
  return Ywx.setNavigationBarStyle(tintColor, backgroundColor);
}

// ---------------- 证书相关 ----------------

/**
 * 本地是否存在证书
 * @param phone 手机号
 */
export function hasCertificate(phone?: string): boolean {
  return Ywx.hasCertificate(phone);
}

/**
 * 下载证书
 * @param phone 手机号
 * @param firmId 子厂商id
 * @returns Promise 包含 status/message/data
 */
export function downloadCertificate(
  phone: string,
  firmId?: string
): Promise<Result> {
  return Ywx.downloadCertificate(phone, firmId);
}

/**
 * 更新证书
 * @param firmId 子厂商id
 * @returns Promise 包含 status/message/data
 */
export function updateCertificate(firmId?: string): Promise<Result> {
  return Ywx.updateCertificate(firmId);
}

/**
 * 重置证书 PIN
 * @param firmId 子厂商id
 * @returns Promise 包含 status/message/data
 */
export function resetCertificatePin(firmId?: string): Promise<Result> {
  return Ywx.resetCertificatePin(firmId);
}

/**
 * 证书详情
 * @param firmId 子厂商id
 * @returns Promise 包含 status/message/data
 */
export function showCertificateDetail(firmId?: string): Promise<Result> {
  return Ywx.showCertificateDetail(firmId);
}

/**
 * 移除本地证书
 */
export function clearCertificate(): boolean {
  return Ywx.clearCertificate();
}

/**
 * 获取用户信息
 * @returns Promise 包含 status/message/data
 */
export function getUserInfo(): Promise<Result> {
  return Ywx.getUserInfo();
}

// ---------------- 签章相关 ----------------

/**
 * 获取签章图片 Base64
 */
export function getSignatureBase64(): string | undefined {
  return Ywx.getSignatureBase64();
}

/**
 * 配置签章
 * @param firmIds 子厂商id列表
 * @returns Promise 包含 status/message/data
 */
export function drawStamp(firmIds?: string[]): Promise<Result> {
  return Ywx.drawStamp(firmIds);
}

// ---------------- 签名相关 ----------------

/**
 * 签名
 * @param uniqueIds 签名数据的uniqueId列表
 * @param firmId 子厂商id
 * @returns Promise 包含 status/message/data
 */
export function sign(uniqueIds: string[], firmId?: string): Promise<Result> {
  return Ywx.sign(uniqueIds, firmId);
}

/**
 * 协同签名
 * @param uniqueIds 签名数据的uniqueId列表
 * @returns Promise 包含 status/message/data
 */
export function teamSign(uniqueIds: string[]): Promise<Result> {
  return Ywx.teamSign(uniqueIds);
}

/**
 * 开始 Oauth 登录
 * @param uuid uuid
 * @param grantOpenId 授权人id
 * @param grantUserName 授权人名称
 * @returns Promise 包含 status/message/data
 */
export function startOauthLogin(
  uuid: string,
  grantOpenId?: string,
  grantUserName?: string
): Promise<Result> {
  return Ywx.startOauthLogin(uuid, grantOpenId, grantUserName);
}

// ---------------- 二维码相关 ----------------

/**
 * 对二维码信息进行识别处理
 * @param qrString 二维码字符串信息
 * @param handleGrantOauth 是否处理授权登录
 * @returns Promise 包含 status/message/data
 */
export function handleQrCode(
  qrString: string,
  handleGrantOauth?: boolean
): Promise<Result> {
  return Ywx.handleQrCode(qrString, handleGrantOauth);
}

// ---------------- 自动签 ----------------

/**
 * 开启自动签名
 * @param sysTag 开启自动签名的系统标识名（需和服务端保持一致）
 * @param firmId 子厂商id
 * @returns Promise 包含 status/message/data
 */
export function startAutoSign(
  sysTag: string,
  firmId?: string
): Promise<Result> {
  return Ywx.startAutoSign(sysTag, firmId);
}

/**
 * 关闭自动签名
 * @param sysTag 开启自动签名的系统标识名（需和服务端保持一致）
 * @param firmId 子厂商id
 * @returns Promise 包含 status/message/data
 */
export function stopAutoSign(sysTag: string, firmId?: string): Promise<Result> {
  return Ywx.stopAutoSign(sysTag, firmId);
}

/**
 * 获取自动签信息
 * @returns Promise 包含 status/message/data
 */
export function getAutoSignInfo(): Promise<Result> {
  return Ywx.getAutoSignInfo();
}

// ---------------- 免密 ----------------

/**
 * 开启免密签名
 * @param days 单位天（1-60）
 * @returns Promise 包含 status/message/data
 */
export function enablePinExemption(days: number): Promise<Result> {
  return Ywx.enablePinExemption(days);
}

/**
 * 关闭免密签名
 */
export function clearPin(): void {
  return Ywx.clearPin();
}

/**
 * 当前是否处于免密状态
 */
export function isPinExempt(): boolean {
  return Ywx.isPinExempt();
}

// ---------------- 生物识别 ----------------

/**
 * 开启生物识别
 * @returns Promise 包含 status/message/data
 */
export function enableBiometricAuth(): Promise<Result> {
  return Ywx.enableBiometricAuth();
}

/**
 * 关闭生物识别
 * @returns Promise 包含 status/message/data
 */
export function disableBiometricAuth(): Promise<Result> {
  return Ywx.disableBiometricAuth();
}

/**
 * 是否已开启生物识别
 */
export function isBiometricAuthEnabled(): boolean {
  return Ywx.isBiometricAuthEnabled();
}

// ---------------- 授权签名 ----------------

/**
 * 开启授权签名
 * @param firmId 子厂商id
 * @param grantedUserId 指定授权用户的id
 * @param hours 单位小时
 * @returns Promise 包含 status/message/data
 */
export function grantSignature(
  firmId: string,
  grantedUserId: string,
  hours: number
): Promise<Result> {
  return Ywx.grantSignature(firmId, grantedUserId, hours);
}

/**
 * 关闭授权签名
 * @param firmId 子厂商id
 * @param grantedUserId 指定授权用户的id
 * @returns Promise 包含 status/message/data
 */
export function revokeSignature(
  firmId: string,
  grantUniqueId: string
): Promise<Result> {
  return Ywx.revokeSignature(firmId, grantUniqueId);
}

// ---------------- 配置相关 ----------------

/**
 * 当前环境
 */
export function getCurrentEnvironment(): Environment {
  return Ywx.getCurrentEnvironment();
}

/**
 * 当前环境 URL
 */
export function getCurrentEnvironmentUrl(): string {
  return Ywx.getCurrentEnvironmentUrl();
}

/**
 * SDK 版本号
 */
export function getVersion(): string {
  return Ywx.getVersion();
}

/**
 * 当前语言
 */
export function getCurrentLanguage(): string {
  return Ywx.getCurrentLanguage();
}

/**
 * 用户 openId
 */
export function getOpenId(): string | undefined {
  return Ywx.getOpenId();
}

/**
 * 修改界面语言
 * @param language 语言字符串 zh-Hans 中文 en 英文
 */
export function changeLanguage(language: string): void {
  return Ywx.changeLanguage(language);
}

/**
 * 显示 PIN 输入页面
 * @returns Promise 包含 status/message/data
 */
export function showPinInput(): Promise<Result> {
  return Ywx.showPinInput();
}

export { Environment } from './NativeYwx';
