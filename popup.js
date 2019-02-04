document.addEventListener('DOMContentLoaded', function() {
	var inputFieldForSave = document.getElementById('valInput');
	var saveValueButton = document.getElementById('saveVal');
	var savedDescriptionField = document.getElementById('description');
	var k = "";
	chrome.tabs.getSelected(null, function(tab) {
		k = tab.url;
	});
	
	
	saveValueButton.addEventListener('click', function() { 
        chrome.tabs.getSelected(null, function(tab) {
			
			let d = document;
			let f = d.createElement('form');
			let val = inputFieldForSave.value;
			d.body.appendChild(f);
			k = tab.url;
			//k.toString();
			let obj = {};
			let v = inputFieldForSave.value;
			
			obj[k] = v;
			
			chrome.storage.sync.set({'savedComment' : v}, function() {
				//alert('Value is set to ' + v);
			});
			
			/*chrome.storage.sync.set({k : v}, function() {
				//alert('Value is set to ' + v);
			});*/
			
			chrome.tabs.getSelected(null, function(tab) {
					chrome.storage.sync.get('savedComment', function(result) {
					//chrome.storage.sync.get(k, function(result) {
					//alert('Value currently is ' + result.savedComment);
					//alert('Value currently is ' + result.k);
					let res = result.savedComment;
					savedDescriptionField.value = res;
					//let res = result.k;
					});
			});
			
        });
    }, false);
	
	/*chrome.storage.local.get(null, function(items) {
		var [allKeys] = Object.keys(items);
		//alert(allKeys);
		for (var i in allKeys){
			if (i == k){
				alert(k);
				break;
			}
		}
	});	*/
	
	
	chrome.tabs.getSelected(null, function(tab) {
			chrome.storage.sync.get('savedComment', function(result) {
			//chrome.storage.sync.get(k, function(result) {
			//alert('Value currently is ' + result.savedComment);
			//alert('Value currently is ' + result.k);
			let res = result.savedComment;
			//let res = result.k;
			savedDescriptionField.value = res;
		});
	});
	
	
	
}, false);
