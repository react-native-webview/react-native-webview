// This is used because download from native side won't have session changes.

window.reactNativeDownloadBlobUrl = function reactNativeDownloadBlobUrl(url) {
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.responseType = 'blob';

	req.onload = function(event) {
		var blob = req.response;
		saveBlob(blob);
	};
	req.send();

	function sendMessage(message) {
	    ReactNativeWebViewDownloader.downloadFile(JSON.stringify(message));
	}

	function saveBlob(blob, filename) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    let fileName = "";


    reader.onloadend = function() {

    const popularExts = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "svg", "mp3", "mp4", "avi", "mov", "wmv", "flv", "ogg", "webm", "mkv", "zip", "rar", "7z", "tar", "gz", "bz2", "iso", "dmg", "exe", "apk", "torrent", "epub", "mobi", "azw", "azw3", "djvu", "djv", "fb2", "rtf", "odt", "odp", "ods", "odg", "odf", "odb", "csv", "tsv", "ics", "vcf", "msg", "eml", "emlx", "mht", "mhtml", "xps", "oxps", "ps", "rtfd", "key", "numbers", "pages", "apk", "torrent", "epub", "mobi", "azw", "azw3", "djvu", "djv", "fb2", "rtf", "odt", "odp", "ods", "odg", "odf", "odb", "csv", "tsv", "ics", "vcf", "msg", "eml", "emlx", "mht", "mhtml", "xps", "oxps", "ps", "rtfd", "key", "numbers", "pages"];
    let ext = blob.type.split("/")[1];
    if (!ext || !popularExts.includes(ext)) {
    ext = "bin";
    }

    fileName = `${filename || "download"}.${ext}`;

    sendMessage({
        event: 'file',
        fileName,
        data: reader.result
    });

    }
    };

 }
	    

