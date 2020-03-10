import {on} from '../functions/EventHandler'
import {isMobile} from '../functions/DomManipulation'

const whatsapp = () => {
	const buttons = document.querySelectorAll('[data-whatsapp]')
	const endpoint = isMobile() ? 'https://api.whatsapp.com' : 'https://web.whatsapp.com'
	on('click', buttons, button => window.open(`${endpoint}/send?phone=${button.dataset.whatsapp}`))
}

export {
	whatsapp,
}