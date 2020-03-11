import {isIE} from './functions/DomManipulation'
import {showAlert} from './modules/Alert'

window.LazyLoad = require('./modules/LazyLoad')
window.Share = require('./modules/Share')
window.Scroll = require('./modules/Scroll')
window.Email = require('./modules/Email')

window.addEventListener('load', () => {
	if (isIE()) {
		showAlert('Alerta!', 'Seu navegador não suporta esse site.<br>Utilize um navegador mais moderno.')
	} else {
		LazyLoad.observe()
		Share.whatsapp()
		Scroll.onClick()
		Email.contact()
	}
})