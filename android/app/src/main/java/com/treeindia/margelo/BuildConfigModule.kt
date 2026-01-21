package com.treeindia.margelo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class BuildConfigModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BuildConfigModule"
    }

    override fun getConstants(): MutableMap<String, Any> {
        val constants: MutableMap<String, Any> = HashMap()
        constants["HAS_NATIVE_HEADER"] = BuildConfig.HAS_NATIVE_HEADER
        return constants
    }
}
