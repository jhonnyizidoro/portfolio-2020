import {on} from '../functions/EventHandler'
import jump from 'jump.js'

const onClick = () => {
	const triggers = document.querySelectorAll('[data-target]')
	on('click', triggers, trigger => {
		jump(trigger.dataset.target, {
			duration: 1000,
		})
	})
}

export {
	onClick,
}