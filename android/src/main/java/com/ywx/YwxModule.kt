package com.ywx

import cn.org.bjca.sdk.core.kit.BJCASDK
import cn.org.bjca.sdk.core.values.EnvType
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.ywx.enums.Environment

@ReactModule(name = YwxModule.NAME)
class YwxModule(val reactContext: ReactApplicationContext) :
  NativeYwxSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  override fun initialize(clientId: String?, environment: Double) {
    val status = Environment.fromValue(environment as Int)
    BJCASDK.getInstance().setServerUrl(
      when (status) {
        Environment.Public -> EnvType.PUBLIC
        Environment.Test -> EnvType.INTEGRATE
        Environment.Beta -> EnvType.TEST
        Environment.Dev -> EnvType.DEV
      }
    )
  }

  override fun setNavigationBarStyle(tintColor: Double, backgroundColor: Double) {
    TODO("Not yet implemented")
  }

  override fun hasCertificate(phone: String?): Boolean {
    return BJCASDK.getInstance().existsCert(reactContext.currentActivity, phone)
  }

  override fun downloadCertificate(
    phone: String?,
    firmId: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun updateCertificate(
    firmId: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun resetCertificatePin(
    firmId: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun showCertificateDetail(
    firmId: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun clearCertificate(): Boolean {
    TODO("Not yet implemented")
  }

  override fun getUserInfo(promise: Promise?) {
    TODO("Not yet implemented")
  }

  override fun getSignatureBase64(): String? {
    TODO("Not yet implemented")
  }

  override fun drawStamp(
    firmIds: ReadableArray?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun sign(
    uniqueIds: ReadableArray?,
    firmId: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun teamSign(
    uniqueIds: ReadableArray?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun startOauthLogin(
    uuid: String?,
    grantOpenId: String?,
    grantUserName: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun handleQrCode(
    qrString: String?,
    handleGrantOauth: Boolean?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun startAutoSign(
    sysTag: String?,
    firmId: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun stopAutoSign(
    sysTag: String?,
    firmId: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun getAutoSignInfo(promise: Promise?) {
    TODO("Not yet implemented")
  }

  override fun enablePinExemption(
    days: Double,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun clearPin() {
    TODO("Not yet implemented")
  }

  override fun isPinExempt(): Boolean {
    TODO("Not yet implemented")
  }

  override fun enableBiometricAuth(promise: Promise?) {
    TODO("Not yet implemented")
  }

  override fun disableBiometricAuth(promise: Promise?) {
    TODO("Not yet implemented")
  }

  override fun isBiometricAuthEnabled(): Boolean {
    TODO("Not yet implemented")
  }

  override fun grantSignature(
    firmId: String?,
    grantedUserId: String?,
    hours: Double,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun revokeSignature(
    firmId: String?,
    grantUniqueId: String?,
    promise: Promise?
  ) {
    TODO("Not yet implemented")
  }

  override fun getCurrentEnvironment(): Double {
    TODO("Not yet implemented")
  }

  override fun getCurrentEnvironmentUrl(): String? {
    TODO("Not yet implemented")
  }

  override fun getVersion(): String? {
    TODO("Not yet implemented")
  }

  override fun getCurrentLanguage(): String? {
    TODO("Not yet implemented")
  }

  override fun getOpenId(): String? {
    TODO("Not yet implemented")
  }

  override fun changeLanguage(language: String?) {
    TODO("Not yet implemented")
  }

  override fun showPinInput(promise: Promise?) {
    TODO("Not yet implemented")
  }


  companion object {
    const val NAME = "Ywx"
  }
}
