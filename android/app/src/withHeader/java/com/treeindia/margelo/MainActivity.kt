package com.treeindia.margelo

import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import expo.modules.ReactActivityDelegateWrapper

/**
 * MainActivity for withHeader build variant
 *
 * This variant demonstrates creating a custom native header above the React Native content.
 * The header is implemented using native Android Views (not React components).
 *
 * This showcases understanding of:
 * - React Native internals and surface view composition
 * - Custom ReactActivityDelegate implementation
 * - Native Android view hierarchy manipulation
 */
class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null)

    // Add native header after React Native content is loaded
    addNativeHeader()
  }

  /**
   * Adds a native header view on top of the React Native content.
   * This is called after onCreate to ensure the React content view exists.
   */
  private fun addNativeHeader() {
    val contentView = findViewById<ViewGroup>(android.R.id.content)
    val reactRootView = contentView.getChildAt(0)

    if (reactRootView != null) {
      // Remove the React root view temporarily
      contentView.removeView(reactRootView)

      // Create a container
      val container = LinearLayout(this).apply {
        orientation = LinearLayout.VERTICAL
        layoutParams = ViewGroup.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.MATCH_PARENT
        )
      }

      // Create and add header
      val headerView = createNativeHeaderView()
      container.addView(headerView)

      // Add React root view back to container
      container.addView(reactRootView, LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        0,
        1f // Takes remaining space
      ))

      // Add container to content view
      contentView.addView(container)
    }
  }

  /**
   * Creates the native header view
   */
  private fun createNativeHeaderView(): View {
    val density = resources.displayMetrics.density
    val headerHeight = (120 * density).toInt()

    // Get status bar height
    var statusBarHeight = 0
    val resourceId = resources.getIdentifier("status_bar_height", "dimen", "android")
    if (resourceId > 0) {
      statusBarHeight = resources.getDimensionPixelSize(resourceId)
    }

    return TextView(this).apply {
      text = "margelo is cool"
      textSize = 24f
      setTextColor(Color.WHITE)
      setBackgroundColor(Color.parseColor("#6B7280")) // Gray background
      gravity = Gravity.CENTER
      setPadding(
        (16 * density).toInt(),
        statusBarHeight + (8 * density).toInt(),
        (16 * density).toInt(),
        (8 * density).toInt()
      )
      layoutParams = LinearLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        headerHeight + statusBarHeight
      )
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate].
   * Using standard delegate since we add the header in onCreate instead.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Align the back button behavior with Android S
    * where moving root activities to background instead of finishing activities.
    * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}
