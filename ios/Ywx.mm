#import "Ywx.h"
#import <React/RCTConvert.h>
#import <YWXSignSDK/YWXSignSDK.h>

@implementation Ywx
RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeYwxSpecJSI>(params);
}

- (void)initialize:(nonnull NSString *)clientId environment:(double)environment {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    YWXEnvironment env;
    if (environment == 1) {
      env = YWXEnvironmentTest; // 集成环境
    } else if (environment == 2) {
      env = YWXEnvironmentBeta; // 测试环境
    } else if (environment == 3) {
      env = YWXEnvironmentDev; // 开发环境
    } else {
      env = YWXEnvironmentPublic; // 生产环境
    }
    
    [YWXSignManager.sharedManager startWithClientId:clientId environment:env];
  });
}

- (void)setNavigationBarStyle:(double)tintColor backgroundColor:(double)backgroundColor {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    UIColor *convertedTintColor = [RCTConvert UIColor:@(tintColor)];
    UIColor *convertedBackgroundColor = [RCTConvert UIColor:@(backgroundColor)];
    [YWXSignManager.sharedManager setupUIForNavigationBarTintColor:convertedTintColor navigationBarBackgroundColor:convertedBackgroundColor];
  });
}

- (void)downloadCertificate:(NSString *)phone resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager certDownWithPhone:phone completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if (status == YWXSignStatusCodeSuccess) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (void)updateCertificate:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager certUpdateWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if (status == YWXSignStatusCodeSuccess) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}


@end
