window.LazyLoad = require('./modules/LazyLoad')
window.Share = require('./modules/Share')
window.Scroll = require('./modules/Scroll')

document.addEventListener('DOMContentLoaded', () => {
	LazyLoad.observe()
})

window.addEventListener('load', () => {
	Share.whatsapp()
	Scroll.onClick()
})