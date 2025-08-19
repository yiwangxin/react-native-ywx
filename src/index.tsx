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

export { Environment } from './NativeYwx';
