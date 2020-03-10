const addLoading = button => {
	button.style.backgroundImage = `url('/images/backgrounds/loader.svg'), ${getComputedStyle(button).backgroundImage}`
	button.style.backgroundRepeat = 'no-repeat'
	button.style.backgroundPosition = 'center'
	button.style.color = 'transparent'
}

const removeLoading = button => {
	button.style.backgroundImage = ''
	button.style.backgroundRepeat = ''
	button.style.backgroundPosition = ''
	button.style.color = ''
}

export {
	addLoading,
	removeLoading,
}