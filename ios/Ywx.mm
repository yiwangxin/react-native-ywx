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

- (NSNumber *)hasCertificate:(NSString *)phone {
  BOOL result;
  if (phone != nil && phone.length > 0) {
    result = [YWXSignManager.sharedManager existsCertWithPhone:phone];
  } else {
    result = [YWXSignManager.sharedManager existsCert];
  }
  return @(result);
}

- (void)downloadCertificate:(NSString *)phone firmId:(NSString *)firmId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (firmId != nil && firmId.length > 0) {
      [YWXSignManager.sharedManager certDownWithPhone:phone firmId:firmId completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
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
    } else {
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
    }
  });
}

- (void)updateCertificate:(NSString *)firmId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (firmId != nil && firmId.length > 0) {
      [YWXSignManager.sharedManager certUpdateWithFirmId:firmId completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
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
    } else {
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
    }
  });
}

- (void)resetCertificatePin:(NSString *)firmId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (firmId != nil && firmId.length > 0) {
      [YWXSignManager.sharedManager certResetPinWithFirmId:firmId completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
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
    } else {
      [YWXSignManager.sharedManager certResetPinWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
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
    }
  });
}

- (void)showCertificateDetail:(NSString *)firmId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (firmId != nil && firmId.length > 0) {
      [YWXSignManager.sharedManager showCertDetailWithFirmId:firmId completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
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
    } else {
      [YWXSignManager.sharedManager showCertDetailWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
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
    }
  });
}


@end
