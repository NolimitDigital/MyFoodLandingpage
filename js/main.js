// browser detect script
browserDetect = {
	matchGroups: [
		[
			{uaString:'win', className:'win'},
			{uaString:'mac', className:'mac'},
			{uaString:['linux','x11'], className:'linux'}
		],
		[
			{uaString:'msie', className:'trident'},
			{uaString:'applewebkit', className:'webkit'},
			{uaString:'gecko', className:'gecko'},
			{uaString:'opera', className:'presto'}
		],
		[
			{uaString:'msie 9.0', className:'ie9'},
			{uaString:'msie 8.0', className:'ie8'},
			{uaString:'msie 7.0', className:'ie7'},
			{uaString:'msie 6.0', className:'ie6'},
			{uaString:'firefox/2', className:'ff2'},
			{uaString:'firefox/3', className:'ff3'},
			{uaString:'firefox/4', className:'ff4'},
			{uaString:['opera','version/11'], className:'opera11'},
			{uaString:['opera','version/10'], className:'opera10'},
			{uaString:'opera/9', className:'opera9'},
			{uaString:['safari','version/3'], className:'safari3'},
			{uaString:['safari','version/4'], className:'safari4'},
			{uaString:['safari','version/5'], className:'safari5'},
			{uaString:'chrome', className:'chrome'},
			{uaString:'safari', className:'safari2'},
			{uaString:'unknown', className:'unknown'}
		]
	],
	init: function() {
		this.detect();
		return this;
	},
	addClass: function(className) {
		this.pageHolder = document.documentElement;
		document.documentElement.className += ' '+className;
	},
	detect: function() {
		for(var i = 0, curGroup; i < this.matchGroups.length; i++) {
			curGroup = this.matchGroups[i];
			for(var j = 0, curItem; j < curGroup.length; j++) {
				curItem = curGroup[j];
				if(typeof curItem.uaString === 'string') {
					if(this.uaMatch(curItem.uaString)) {
						this.addClass(curItem.className);
						break;
					}
				} else {
					for(var k = 0, allMatch = true; k < curItem.uaString.length; k++) {
						if(!this.uaMatch(curItem.uaString[k])) {
							allMatch = false;
							break;
						}
					}
					if(allMatch) {
						this.addClass(curItem.className);
						break;
					}
				}
			}
		}
	},
	uaMatch: function(s) {
		if(!this.ua) {
			this.ua = navigator.userAgent.toLowerCase();
		}
		return this.ua.indexOf(s) != -1;
	}
}.init();

function formSubmit() {

	event.preventDefault();
	event.returnValue = false;

	var vn = $('#vorname').val();
	var nn = $('#nachname').val();
	var email = $('#email').val();
	
	if(vn == 'Vorname' || nn == 'Nachname' || email == 'E-Mail') {
		alert('Bitte füllen Sie alle Felder aus!');
		return false;
	}
	
	if(!validateEmail(email)) {
		alert('Bitte geben Sie eine gültige E-Mail Adresse ein!');
		return false;
	}
	
	$.post('formprocessor.php', $('form').serialize(), function(content) {
		if(content == 'OK') {
			$('form').slideUp(function() { $('#thankyou').slideDown(); });
		} else {
			alert('Ein Serverfehler ist aufgetreten, bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.');
		}
	}).error(function() {
		alert('Es konnte keine Verbindung mit dem Server hergestellt werden, bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.');
	});
	
	return false;
}

function validateEmail(email) {
	 
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   return (reg.test(email) == true);
}

$(document).ready(function() {
	$("body").ezBgResize({
        img : "images/bg-body.png"
    });
    
	$('form').submit(formSubmit);
});