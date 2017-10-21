var request = require('request')

var nodeArgs = process.argv

var songName = ''

for (var i = 2; i < nodeArgs.length; i++) {
	
	if (i > 2 && i < nodeArgs.length) {
		songName = songName + '+' + nodeArgs[i]
	} else {
		songName += nodeArgs[i]
	}
	
}