package com.reactnativecommunity.webview.extension.file

import android.app.AlertDialog
import android.content.Context

/**
 * For the first 500ms disabled Positive button to prevent accidental taps
 */
class TapjackingPreventionAlertDialog(
  context: Context,
  private val message: String,
  private val positiveButtonText: String,
  private val negativeButtonText: String,
  private val onPositiveButtonClick: () -> Unit,
) {
  private val dialog: AlertDialog = AlertDialog.Builder(context)
    .setCancelable(false)
    .setMessage(message)
    .setPositiveButton(positiveButtonText, null)
    .setNegativeButton(negativeButtonText, null)
    .create()

  fun show() {
    dialog.setOnShowListener {
      val positiveButton = dialog.getButton(AlertDialog.BUTTON_POSITIVE)
      val negativeButton = dialog.getButton(AlertDialog.BUTTON_NEGATIVE)

      // Disable Positive button to prevent accidental tap
      positiveButton.isEnabled = false

      positiveButton.postDelayed({
        positiveButton.isEnabled = true
      }, PREVENT_ACCIDENTAL_TAP_WAITING_TIME_MS)

      positiveButton.setOnClickListener {
        onPositiveButtonClick.invoke()
        dialog.dismiss()
      }

      negativeButton.setOnClickListener {
        dialog.dismiss()
      }
    }

    dialog.show()
  }

  companion object {
    const val PREVENT_ACCIDENTAL_TAP_WAITING_TIME_MS = 500L
  }
}