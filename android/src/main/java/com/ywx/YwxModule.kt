package com.ywx

import cn.org.bjca.sdk.core.bean.FingerSignState
import cn.org.bjca.sdk.core.kit.BJCASDK
import cn.org.bjca.sdk.core.kit.InnerSdk
import cn.org.bjca.sdk.core.values.EnvType
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule
import com.ywx.enums.Environment
import org.json.JSONArray
import org.json.JSONObject

@ReactModule(name = YwxModule.NAME)
class YwxModule(val reactContext: ReactApplicationContext) :
  NativeYwxSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  override fun initialize(
    clientId: String?,
    environment: Double,
    customUrl: String?
  ) {

    if (customUrl.isNullOrBlank()) {
      val status = Environment.fromValue(environment.toInt())
      BJCASDK.getInstance().setServerUrl(
        when (status) {
          Environment.Public -> EnvType.PUBLIC
          Environment.Test -> EnvType.INTEGRATE
          Environment.Beta -> EnvType.TEST
          Environment.Dev -> EnvType.DEV
          Environment.Szyx -> EnvType.SZYX
          Environment.Custom -> EnvType.CUSTOMIZE
        }
      )
    } else {
      BJCASDK.getInstance().setServerUrlForCustomize(customUrl)
    }
    YwxHelper.clientId = clientId
  }

  override fun setNavigationBarStyle(tintColor: Double, backgroundColor: Double) {
  }

  override fun hasCertificate(phone: String?): Boolean {
    return BJCASDK.getInstance().existsCert(reactContext.currentActivity, phone)
  }

  override fun downloadCertificate(
    phone: String?,
    firmId: String?,
    promise: Promise?
  ) {
    InnerSdk.get().certDown(reactContext.currentActivity, YwxHelper.clientId, phone, firmId)
    {
      checkBack(it, promise)
    }
  }

  override fun updateCertificate(
    firmId: String?,
    promise: Promise?
  ) {
    InnerSdk.get().certUpdate(
      reactContext.currentActivity, YwxHelper.clientId, firmId
    ) {
      checkBack(it, promise)
    }
  }

  override fun resetCertificatePin(
    firmId: String?,
    promise: Promise?
  ) {
    InnerSdk.get().certResetPin(reactContext.currentActivity, YwxHelper.clientId, firmId) {
      checkBack(it, promise)
    }
  }

  override fun showCertificateDetail(
    firmId: String?,
    promise: Promise?
  ) {
    BJCASDK.getInstance()
      .showCertActivity(reactContext.currentActivity, YwxHelper.clientId, firmId) {
        checkBack(it, promise)
      }
  }

  override fun clearCertificate(): Boolean {
    BJCASDK.getInstance().clearCert(reactContext.currentActivity)
    return true
  }

  override fun getUserInfo(promise: Promise?) {
    BJCASDK.getInstance().getUserInfo(reactContext.currentActivity, YwxHelper.clientId) {
      checkBack(it, promise)
    }
  }

  override fun getSignatureBase64(): String? {
    return BJCASDK.getInstance().getStampPic(reactContext.currentActivity)
  }

  override fun drawStamp(
    firmIds: ReadableArray?,
    promise: Promise?
  ) {
    InnerSdk.get()
      .drawStamp(reactContext.currentActivity, YwxHelper.clientId, firmIds?.getString(0)) {
        checkBack(it, promise)
      }
  }

  override fun sign(
    uniqueIds: ReadableArray,
    firmId: String?,
    promise: Promise?
  ) {
    InnerSdk.get().signWithFirmId(
      reactContext.currentActivity, YwxHelper.clientId, firmId,
      uniqueIds.toStringList()
    ) {
      checkBack(it, promise)
    }
  }

  override fun teamSign(
    uniqueIds: ReadableArray?,
    promise: Promise?
  ) {
    InnerSdk.get()
      .signForTeam(reactContext.currentActivity, YwxHelper.clientId, uniqueIds?.toStringList()) {
        checkBack(it, promise)
      }
  }

  override fun startOauthLogin(
    uuid: String?,
    grantOpenId: String?,
    grantUserName: String?,
    promise: Promise?
  ) {
    BJCASDK.getInstance()
      .startOauthLogin(
        reactContext.currentActivity,
        YwxHelper.clientId,
        uuid,
        grantOpenId,
        grantUserName
      ) {
        checkBack(it, promise)
      }
  }

  override fun handleQrCode(
    qrString: String?,
    handleGrantOauth: Boolean?,
    promise: Promise?
  ) {
    BJCASDK.getInstance()
      .qrDispose(
        reactContext.currentActivity,
        YwxHelper.clientId,
        qrString,
        handleGrantOauth == true,
      ) {
        checkBack(it, promise)
      }
  }

  override fun startAutoSign(
    sysTag: String?,
    firmId: String?,
    promise: Promise?
  ) {
    InnerSdk.get().signForSignAuto(
      reactContext.currentActivity,
      YwxHelper.clientId,
      firmId,
      sysTag
    ) {
      checkBack(it, promise)
    }
  }

  override fun stopAutoSign(
    sysTag: String?,
    firmId: String?,
    promise: Promise?
  ) {
    InnerSdk.get().stopSignAuto(reactContext.currentActivity, YwxHelper.clientId, firmId, sysTag) {
      checkBack(it, promise)
    }
  }

  override fun getAutoSignInfo(promise: Promise?) {

    BJCASDK.getInstance().signAutoInfo(reactContext.currentActivity, YwxHelper.clientId) {
      checkBack(it, promise)
    }
  }

  override fun enablePinExemption(
    days: Double,
    promise: Promise?
  ) {
    BJCASDK.getInstance().keepPin(reactContext.currentActivity, YwxHelper.clientId, days.toInt()) {
      checkBack(it, promise)
    }
  }

  override fun clearPin() {
    BJCASDK.getInstance().clearPin(reactContext.currentActivity)
  }

  override fun isPinExempt(): Boolean {
    return BJCASDK.getInstance().isPinExempt(reactContext.currentActivity)
  }

  override fun enableBiometricAuth(promise: Promise?) {
    BJCASDK.getInstance().alterFingerSignState(reactContext.currentActivity, FingerSignState.on) {
      checkBack(it, promise)
    }
  }

  override fun disableBiometricAuth(promise: Promise?) {
    BJCASDK.getInstance().alterFingerSignState(reactContext.currentActivity, FingerSignState.off) {
      checkBack(it, promise)
    }
  }

  override fun isBiometricAuthEnabled(): Boolean {
    return when (BJCASDK.getInstance().getFingerSignState(reactContext.currentActivity)) {
      FingerSignState.on -> true
      else -> false
    }
  }

  override fun grantSignature(
    firmId: String?,
    grantedUserId: String?,
    hours: Double,
    promise: Promise?
  ) {
    InnerSdk.get().sureGrantSign(
      reactContext.currentActivity,
      YwxHelper.clientId,
      firmId,
      grantedUserId,
      hours.toInt()
    ) {
      checkBack(it, promise)
    }
  }

  override fun revokeSignature(
    firmId: String?,
    grantUniqueId: String?,
    promise: Promise?
  ) {
    promise?.reject("-1", "Not supported")
  }

  override fun getCurrentEnvironment(): Double {
    return when (BJCASDK.getInstance().serverEnvType) {
      EnvType.PUBLIC -> Environment.Public
      EnvType.SZYX -> Environment.Szyx
      EnvType.INTEGRATE -> Environment.Test
      EnvType.TEST, EnvType.TEST_DOMAIN -> Environment.Beta
      EnvType.DEV, EnvType.DEV_DOMAIN -> Environment.Dev
      EnvType.CUSTOMIZE -> Environment.Custom
    }.value.toDouble()
  }

  override fun getCurrentEnvironmentUrl(): String? {
    return ""
  }

  override fun getVersion(): String? {
    return BJCASDK.getInstance().getVersion()
  }

  override fun getCurrentLanguage(): String? {
    return ""
  }

  override fun getOpenId(): String? {
    return BJCASDK.getInstance().getOpenId(reactContext.currentActivity)
  }

  override fun changeLanguage(language: String?) {
    BJCASDK.getInstance().setLanguage(language)
  }

  override fun showPinInput(promise: Promise?) {
    BJCASDK.getInstance().showPinWindow(reactContext.currentActivity, YwxHelper.clientId) {
      checkBack(it, promise)
    }
  }


  companion object {
    const val NAME = "Ywx"
  }
}

private fun ReadableArray.toStringList(): List<String> =
  (0 until size()).mapNotNull {
    if (getType(it) == ReadableType.String) getString(it) else null
  }

private fun checkBack(it: String, promise: Promise?) {
  promise?.resolve(JSONObject(it).toWritableMap())
}
fun JSONObject.toWritableMap(): WritableMap {
  val map = Arguments.createMap()
  val keys = this.keys()
  while (keys.hasNext()) {
    val key = keys.next()
    when (val value = this.get(key)) {
      is JSONObject -> map.putMap(key, value.toWritableMap())
      is JSONArray -> map.putArray(key, value.toWritableArray())
      is Boolean -> map.putBoolean(key, value)
      is Int -> map.putInt(key, value)
      is Long -> map.putDouble(key, value.toDouble())
      is Double -> map.putDouble(key, value)
      is String -> map.putString(key, value)
      JSONObject.NULL -> map.putNull(key)
      else -> map.putString(key, value.toString())
    }
  }
  return map
}

/**
 * JSONArray 转 WritableArray
 */
fun JSONArray.toWritableArray(): WritableArray {
  val array = Arguments.createArray()
  for (i in 0 until this.length()) {
    when (val value = this.get(i)) {
      is JSONObject -> array.pushMap(value.toWritableMap())
      is JSONArray -> array.pushArray(value.toWritableArray())
      is Boolean -> array.pushBoolean(value)
      is Int -> array.pushInt(value)
      is Long -> array.pushDouble(value.toDouble())
      is Double -> array.pushDouble(value)
      is String -> array.pushString(value)
      JSONObject.NULL -> array.pushNull()
      else -> array.pushString(value.toString())
    }
  }
  return array
}
