document.addEventListener('DOMContentLoaded', function() {
	var inputFieldForSave = document.getElementById('valInput');
	var saveValueButton = document.getElementById('saveVal');
	var savedDescriptionField = document.getElementById('description');
	var k = "";
	var CONST_KEY_MODE = 'true'; //этот режим переключает работу sync.set на сохранение по константе, если true, тогда ключ - переменная k (хранит URL)	
	
	
	
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
			
			if (CONST_KEY_MODE == 'false') {
				chrome.storage.sync.set({'savedComment' : v}, function() {
					//alert('Value is set to ' + v);
				});
					chrome.tabs.getSelected(null, function(tab) {
					/*Тут нет проблем, но хранится один комент для всех URL-ов*/
					chrome.storage.sync.get('savedComment', function(result) {
						//alert('Value currently is ' + result.savedComment);
						let res = result.savedComment;
						savedDescriptionField.value = res;
						});
					});

			} else {
				chrome.storage.sync.set({k : v}, function() {
					//alert('Value is set to ' + v);
				});
				
				chrome.tabs.getSelected(null, function(tab) {
					/*ПРОБЛЕМА ВОЗНИКАЕТ ТУТ, если пытаться получить со stogare.get не констатной строкой, а переменной k. Там в закоменченном коде есть*/
					chrome.storage.sync.get(k, function(result) {
					//alert('Value currently is ' + result.k);
					let res = result.k;
					savedDescriptionField.value = res;
					});
				});
			
			}
			
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
	
	
	if (CONST_KEY_MODE == 'false') {
		chrome.tabs.getSelected(null, function(tab) {
		/*Тут нет проблем, но хранится один комент для всех URL-ов*/
		chrome.storage.sync.get('savedComment', function(result) {
			//alert('Value currently is ' + result.savedComment);
			let res = result.savedComment;
			savedDescriptionField.value = res;
			});
		});

	} else {
		chrome.tabs.getSelected(null, function(tab) {
			/*ПРОБЛЕМА ВОЗНИКАЕТ ТУТ, если пытаться получить со stogare.get не констатной строкой, а переменной k. Там в закоменченном коде есть*/
			chrome.storage.sync.get(k, function(result) {
			//alert('Value currently is ' + result.k);
			let res = result.k;
			savedDescriptionField.value = res;
			});
		});
		
	}
	
	
	
}, false);
