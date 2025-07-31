import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export enum Environment {
  Public = 0, // 生产环境
  Test = 1, // 集成环境
  Beta = 2, // 测试环境
  Dev = 3, // 开发环境
}

export interface Result {
  status: string; // 状态码
  message: string; // 状态信息
  data: unknown; // 数据
}

export interface Spec extends TurboModule {
  /**
   * 初始化 SDK
   * @param clientId 厂商 ID
   * @param environment 环境枚举
   */
  initialize(clientId: string, environment: Environment): void;

  /**
   * 设置导航栏样式
   * @param tintColor 字体颜色（例如 processColor('#FFF000') as number）
   * @param backgroundColor 背景颜色（例如 processColor('#FFFFFF') as number）
   */
  setNavigationBarStyle(tintColor: number, backgroundColor: number): void;

  /**
   * 下载证书
   * @param phone 手机号
   * @returns Promise 包含 status/message/data
   */
  downloadCertificate(phone: string): Promise<Result>;

  /**
   * 更新证书
   * @returns Promise 包含 status/message/data
   */
  updateCertificate(): Promise<Result>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Ywx');
