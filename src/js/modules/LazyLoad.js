const observe = (elementsSelector = '[data-src]') => {
	const elements = document.querySelectorAll(elementsSelector)
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				changeElementSrc(entry.target)
			}
		})
	})
	elements.forEach(image => {
		observer.observe(image)
	})
}

const changeElementSrc = element => {
	if (element.src === '' && element.dataset.src) {
		element.src = element.dataset.src
		delete element.dataset.src
	}
}

export {
	observe,
}