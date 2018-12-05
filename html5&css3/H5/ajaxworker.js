var xml = new XMLHttpRequest();
xml.open('GET', './worker.js', true);
xml.send();
let postMessage = this.postMessage;
xml.onreadystatechange = function() {
	if (xml.readyState === 4) {
		if (xml.status >=200 && xml.status < 300 || xml.status === 304) {
			postMessage(xml.responseText);
		}
	}
}