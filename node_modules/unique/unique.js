(function() {
	var protectRollover = false
	, id = 1
	, millisOld = 0
	, counter = 0
	, unique = function(){
		protectRollover = false;
		// 01 Jan 2010 is the selected epoch. Use
		// 		Date.UTC(2010,0,1)
		// to get this number (1262304000000)
		var millis = new Date().getTime() - 1262304000000;
		if (millisOld == millis) {
			counter++;
			// Rollover protection
			if (counter == 255)
			{
				protectRollover = true;
				counter = 0;
				setTimeout(function () {
	  				unique(id);
				}, 1);
			}
		} else {
			millisOld = millis;
			counter = 0;
		}
		if (protectRollover == false)
		{
			millis = millis * Math.pow(2, 12);
			var id2 = id * Math.pow(2, 8);
			var uid = millis + id2 + counter;
			
			return uid;
		}
	},

	get = function(id, callback){
		id = id ? id : 1;
		return unique();
	};

	module.exports = get;
})();
