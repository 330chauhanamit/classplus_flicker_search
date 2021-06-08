
//Only made for required functions to use



// generating image url
export function imageurl(farm, server, id, secret){
       return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

// Search fuction to discard a number of fastpace events
export function searching(fun, wait, immediate){
       var time;
       return function(){
              var context = this;
              var argu = arguments;
              var late= function(){
                     time = null;
                     if(!immediate) fun.apply(context, argu)
              };
              var call = immediate && !time;
              clearTimeout(time);
              time= setTimeout(late, wait)
              if(call) fun.apply(context,argu);


       };
// Getting the height of document
}
function getHeight() {
	const body = document.body;
	const html = document.documentElement;

	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

//Scrolltop height
function getTop() {
	return window.pageYOffset !== undefined
		? window.pageYOffset
		: (document.documentElement || document.body.parentNode || document.body).scrollTop;
}


//Parsing response to JSON object
export function parse(resp){
       return resp.json();
}


//Checking HTTP status
export function checkHttpStatus(response){
       if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		throw response;
	}
       
}
//Checking the availablility of scroll at bottom
export function scrollAvailable() {
	return getTop() < getHeight() - window.innerHeight;
}

// Throttle function for execution of a function every secs
export function constExecute(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	var last, deferTimer;
	return function() {
		var context = scope || this;
		var now = new Date()
		var argu = arguments;
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function() {
				last = now;
				fn.apply(context, argu);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, argu);
		}
	};
}
