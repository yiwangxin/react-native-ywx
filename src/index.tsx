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
 * 下载证书
 * @param phone 手机号
 * @returns Promise 包含 status/message/data
 */
export function downloadCertificate(phone: string): Promise<Result> {
  return Ywx.downloadCertificate(phone);
}

export { Environment } from './NativeYwx';
