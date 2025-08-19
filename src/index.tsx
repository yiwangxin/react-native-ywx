import Ywx, { Environment, type Result } from './NativeYwx';

/**
 * 初始化 SDK
 * @param clientId 厂商 ID
 * @param environment 环境枚举
 */
export function initialize(clientId: string, environment: Environment): void {
  return Ywx.initialize(clientId, environment);
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

/**
 * 本地是否存在证书
 */
export function hasCertificate(): boolean {
  return Ywx.hasCertificate();
}

/**
 * 指定手机号是否存在证书
 */
export function hasCertificateForPhone(phone: string): boolean {
  return Ywx.hasCertificateForPhone(phone);
}

/**
 * 下载证书
 * @param phone 手机号
 * @returns Promise 包含 status/message/data
 */
export function downloadCertificate(phone: string): Promise<Result> {
  return Ywx.downloadCertificate(phone);
}

/**
 * 更新证书
 * @returns Promise 包含 status/message/data
 */
export function updateCertificate(): Promise<Result> {
  return Ywx.updateCertificate();
}

export { Environment } from './NativeYwx';
