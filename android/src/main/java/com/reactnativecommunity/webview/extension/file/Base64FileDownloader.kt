package com.reactnativecommunity.webview.extension.file

import android.Manifest
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.util.Base64
import android.util.Log
import android.webkit.MimeTypeMap
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import java.io.File
import java.io.FileOutputStream

internal object Base64FileDownloader {

	/**
	 * This method checks for WRITE_EXTERNAL_STORAGE permission for Android 23 - 29 and requests if necessary
	 */
	fun downloadBase64File(context: Context, base64: String, downloadingMessage: String, requestFilePermission: (String) -> Unit) {
		val base64Parts = base64.split(",")
		if (base64Parts.size != 2) {
			Log.e("Base64FileDownloader", "Unable to parse base64 to download a file. Base64 value was: $base64")
			return
		}
		val (mimeType, extension) = getMimeTypeAndFileExtension(base64Parts[0])

		showAlertDialog(context, extension) {
			Toast.makeText(context, downloadingMessage, Toast.LENGTH_LONG).show()
			val fileBytes = Base64.decode(base64Parts[1], Base64.DEFAULT)
			saveFileToDownloadsFolder(context, base64, fileBytes, mimeType, extension, requestFilePermission)
		}
	}

	/**
	 * This method is called from PermissionListener after WRITE_EXTERNAL_STORAGE permission is granted
	 */
	fun downloadBase64FileWithoutPermissionCheckAndDialog(
		context: Context,
		base64: String,
		downloadingMessage: String,
	) {
		val base64Parts = base64.split(",")
		if (base64Parts.size != 2) {
			Log.e("Base64FileDownloader", "Unable to parse base64 to download a file. Base64 value was: $base64")
			return
		}
		val (mimeType, extension) = getMimeTypeAndFileExtension(base64Parts[0])
		Toast.makeText(context, downloadingMessage, Toast.LENGTH_LONG).show()
		val fileBytes = Base64.decode(base64Parts[1], Base64.DEFAULT)
		saveFileToDownloadsFolder(context, base64, fileBytes, mimeType, extension, {})
	}

	private fun showAlertDialog(context: Context, extension: String, onPositiveButtonClick: () -> Unit) {
    TapjackingPreventionAlertDialog(
      context = context,
      message = "Do you want to download \nFile.${extension}?",
      positiveButtonText = "Download",
      negativeButtonText = "Cancel",
      onPositiveButtonClick = onPositiveButtonClick,
    ).show()
	}


	private fun getMimeTypeAndFileExtension(header: String): Pair<String, String> {
		val mimeType = Regex("data:([^;]+)").find(header)?.groupValues?.get(1) ?: "application/octet-stream"
		val extension = MimeTypeMap.getSingleton().getExtensionFromMimeType(mimeType) ?: "bin"
		return mimeType to extension
	}

	private fun saveFileToDownloadsFolder(
		context: Context,
		base64: String,
		fileBytes: ByteArray,
		mimeType: String,
		extension: String,
		requestFilePermission: (String) -> Unit,
	) {
		try {
			if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
				saveFileForAndroidQAndLater(context, fileBytes, mimeType, extension)
			} else {
				saveFileForAndroidLowerQ(context, base64, fileBytes, extension, requestFilePermission)
			}
		} catch (e: Exception) {
			Log.e("Base64FileDownloader", "Unable to download base64 file. Base64 value was: $base64", e)
			Toast.makeText(context, "Invalid filename or type", Toast.LENGTH_LONG).show()
		}
	}

	@RequiresApi(Build.VERSION_CODES.Q)
	private fun saveFileForAndroidQAndLater(context: Context, fileBytes: ByteArray, mimeType: String, extension: String) {
		val resolver = context.contentResolver
		val fileName = "File.$extension"
		val values = ContentValues().apply {
			put(MediaStore.Downloads.DISPLAY_NAME, fileName) // When using this approach System automatically adds a number to the file (1), (2) if the same name already present
			put(MediaStore.Downloads.MIME_TYPE, mimeType)
			put(MediaStore.Downloads.IS_PENDING, 1)
			put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
		}
		val uri = resolver.insert(MediaStore.Downloads.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY), values)
		if (uri != null) {
			resolver.openOutputStream(uri).use { it?.write(fileBytes) }
			values.clear()
			values.put(MediaStore.Downloads.IS_PENDING, 0)
			resolver.update(uri, values, null, null)
			showDownloadingFinishedToast(context)
		}
	}

	private fun saveFileForAndroidLowerQ(
		context: Context,
		base64: String,
		fileBytes: ByteArray,
		extension: String,
		requestFilePermission: (String) -> Unit,
	) {
		if (Build.VERSION.SDK_INT >= 23 &&
			ContextCompat.checkSelfPermission(context, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
		) {
			requestFilePermission(base64)
			return
		}
		val downloadsDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
		if (!downloadsDir.exists()) downloadsDir.mkdirs()
		val file = getFileToSaveWithAvailableName(downloadsDir, extension)
		FileOutputStream(file).use {
			it.write(fileBytes)
			// Notify MediaScanner to show up file in the folder immediately
			context.sendBroadcast(Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE).setData(android.net.Uri.fromFile(file)))
			showDownloadingFinishedToast(context)
		}
	}

	/**
	 * For Android <Q we have to manually create a unique name for the file
	 * File, File (1), File (2) and so on
	 */
	private fun getFileToSaveWithAvailableName(downloadsDir: File, extension: String): File {
		var suffix = 1
		var file = File(downloadsDir, "File.$extension")
		while (file.exists()) {
			file = File(downloadsDir, "File ($suffix).$extension")
			suffix++
		}
		return file
	}

	private fun showDownloadingFinishedToast(context: Context) {
		Toast.makeText(context, "Downloaded successfully", Toast.LENGTH_LONG).show()
	}
}