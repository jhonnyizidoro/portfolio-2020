import {addLoading} from "./modules/Button";

window.LazyLoad = require('./modules/LazyLoad')
window.Share = require('./modules/Share')
window.Scroll = require('./modules/Scroll')
window.Email = require('./modules/Email')

document.addEventListener('DOMContentLoaded', () => {
	LazyLoad.observe()
})

window.addEventListener('load', () => {
	Share.whatsapp()
	Scroll.onClick()
	Email.contact()
})