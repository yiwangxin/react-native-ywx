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
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
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
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
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
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
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
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
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
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
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
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
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
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
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
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    }
  });
}

- (nonnull NSNumber *)clearCertificate {
  BOOL result = [YWXSignManager.sharedManager clearCert];
  return @(result);
}

- (void)getUserInfo:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager requestUserInfoWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSLog(@"A=%@", status);
      NSLog(@"B=%@", message);
      NSLog(@"C=%@", data);
      NSLog(@"F=%d", [status isKindOfClass:[NSString class]]);
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        NSLog(@"D");
        resolve(result);
      } else {
        NSLog(@"E");
        reject(status, message, nil);
      }
    }];
  });
}

- (nonnull NSString *)getSignatureBase64 {
  return [YWXSignManager.sharedManager signatureBase64EncodedString];
}

- (void)drawStamp:(nonnull NSArray *)firmIds resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    
    if (firmIds != nil && firmIds.count > 0) {
      [YWXSignManager.sharedManager drawStampWithFirmIds:firmIds completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    } else {
      [YWXSignManager.sharedManager drawStampWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    }
  });
}

- (void)sign:(nonnull NSArray *)uniqueIds firmId:(nonnull NSString *)firmId resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (firmId != nil && firmId.length > 0) {
      [YWXSignManager.sharedManager signWithFirmId:firmId uniqueIdList:uniqueIds completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    } else {
      [YWXSignManager.sharedManager signWithUniqueIdList:uniqueIds completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    }
  });
}

- (void)teamSign:(nonnull NSArray *)uniqueIds resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager teamSignWithUniqueIdList:uniqueIds completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (void)startOauthLogin:(nonnull NSString *)uuid grantOpenId:(nonnull NSString *)grantOpenId grantUserName:(nonnull NSString *)grantUserName resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager startOauthLogin:uuid grantOpenId:grantOpenId grantUserName:grantUserName completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (void)handleQrCode:(nonnull NSString *)qrString handleGrantOauth:(nonnull NSNumber *)handleGrantOauth resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (handleGrantOauth != nil) {
      [YWXSignManager.sharedManager qrDisposeWithString:qrString isHandleGrantOauth:handleGrantOauth completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    } else {
      [YWXSignManager.sharedManager qrDisposeWithString:qrString completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    }
  });
}

- (void)startAutoSign:(nonnull NSString *)sysTag firmId:(nonnull NSString *)firmId resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (firmId != nil && firmId.length > 0) {
      [YWXSignManager.sharedManager signForStartSignAutoWithFirmId:firmId sysTag:sysTag completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    } else {
      [YWXSignManager.sharedManager signForStartSignAutoWithSysTag:sysTag completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    }
  });
}

- (void)stopAutoSign:(nonnull NSString *)sysTag firmId:(nonnull NSString *)firmId resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    if (firmId != nil && firmId.length > 0) {
      [YWXSignManager.sharedManager stopSignAutoWithFirmId:firmId sysTag:sysTag completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    } else {
      [YWXSignManager.sharedManager stopSignAutoWithSysTag:sysTag completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
        NSDictionary *result = @{
          @"status": status ?: @"",
          @"message": message ?: @"",
          @"data": data ?: @"",
        };
        if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
          resolve(result);
        } else {
          reject(status, message, nil);
        }
      }];
    }
  });
}

- (void)getAutoSignInfo:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager signAutoInfoWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (void)enablePinExemption:(double)days resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager keepPinWithDays:(NSInteger)days completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (void)clearPin {
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager clearPin];
  });
}

- (nonnull NSNumber *)isPinExempt {
  BOOL result = [YWXSignManager.sharedManager isPinExempt];
  return @(result);
}

- (void)enableBiometricAuth:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager startBiometricAuthenticationForSignWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (void)disableBiometricAuth:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager stopBiometricAuthenticationForSignWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (nonnull NSNumber *)isBiometricAuthEnabled {
  BOOL result = [YWXSignManager.sharedManager isBiometricAuthenticationEnabled];
  return @(result);
}

- (void)grantSignature:(nonnull NSString *)firmId grantedUserId:(nonnull NSString *)grantedUserId hours:(double)hours resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager grantSignAuthorizationToFirmId:firmId grantedUserId:grantedUserId hours:(NSInteger)hours completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (void)revokeSignature:(nonnull NSString *)firmId grantUniqueId:(nonnull NSString *)grantUniqueId resolve:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager stopGrantSignAuthorizationToFirmId:firmId grantUniqueId:grantUniqueId completion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

- (nonnull NSNumber *)getCurrentEnvironment {
  YWXEnvironment result = [YWXSignManager.sharedManager currentEnvironment];
  return @(result);
}

- (nonnull NSString *)getCurrentEnvironmentUrl {
  NSString *URLString = [YWXSignManager.sharedManager currentEnvironmentURL];
  return  URLString;
}

- (nonnull NSString *)getVersion {
  NSString *versionString = [YWXSignManager.sharedManager versionString];
  return  versionString;
}

- (nonnull NSString *)getCurrentLanguage {
  NSString *currentLanguage = [YWXSignManager.sharedManager currentLanguage];
  return currentLanguage;
}

- (NSString * _Nullable)getOpenId {
  NSString *openID = [YWXSignManager.sharedManager openId];
  return openID;
}

- (void)changeLanguage:(nonnull NSString *)language {
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager changePreferredLanguage:language];
  });
}

- (void)showPinInput:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    [YWXSignManager.sharedManager showPinWindowWithCompletion:^(YWXSignStatusCode  _Nonnull status, NSString * _Nonnull message, id  _Nullable data) {
      NSDictionary *result = @{
        @"status": status ?: @"",
        @"message": message ?: @"",
        @"data": data ?: @"",
      };
      if ([status isEqualToString:YWXSignStatusCodeSuccess]) {
        resolve(result);
      } else {
        reject(status, message, nil);
      }
    }];
  });
}

@end
