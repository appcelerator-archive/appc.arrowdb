module.exports = {
	logLevel: 'info',
	apikey: 'U7eX4bHNFCVRgfw2IDypoRabolDqxzLB',
	admin: {
		enabled: true,
		prefix: '/arrow'
	},
	session: {
		encryptionAlgorithm: 'aes256',
		encryptionKey: 'lyzgmltC4VjffLq5EyAEmvxAjFDNDjYvzQ2ICsws4Kg=',
		signatureAlgorithm: 'sha512-drop256',
		signatureKey: '/TpBxeSSmiauzffUhODr9qeMYKfCuCe3hnQDj73+CB/GNv3GnP/sh2/zyWGNhLNWEXeIP/7LyWJbTmn/UpwpAQ==',
		secret: '8dI4UzM06yzE/Rbrp+Ud0ABkFhjLlfWB', // should be a large unguessable string
		duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
		activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
	},
	connectors: {
		'appc.arrowdb': {
			key: '',
			username: '',
			password: ''
		}
	}
};
