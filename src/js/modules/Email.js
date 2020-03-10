import {sendForm} from 'emailjs-com'
import {on} from '../functions/EventHandler'
import {addLoading, removeLoading} from './Button'
import {showAlert} from './Alert'

const contact = () => {
	const form = document.querySelector('form')
	const submitButton = form.querySelector('button')
	on('submit', form, event => {
		event.preventDefault()
		addLoading(submitButton)
		sendForm('yahoo', 'template_qSCs8dnD', form, 'user_GZpnqMDRG2NWjHzJGoNG4')
			.then(() => showAlert('Sucesso!', 'Mensagem enviada com sucesso, logo retornarei o contato.'))
			.catch(() => showAlert('Erro!', 'Erro ao enviar mensagem, por favor, entre em contato utilizando outro canal.'))
			.finally(() => {
				removeLoading(submitButton)
				form.reset()
			})
	}, false)
}

export {
	contact,
}