package com.margelo.nitro.bridgewebview
  
import com.facebook.proguard.annotations.DoNotStrip
import android.util.Log
import java.util.List

@DoNotStrip
class NitroBridgeWebview : HybridNitroBridgeWebviewSpec() {
  override fun multiply(a: Double, b: Double, input: String): String {
    return "a * b"
  }
}
