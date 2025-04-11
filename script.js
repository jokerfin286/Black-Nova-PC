// script.js

const components = [
	{
		category: 'Процессор',
		options: [
			{ name: 'Intel Core i5-13400F', price: 500, image: 'proc.png' },
			{ name: 'AMD Ryzen 5 5600X', price: 550, image: 'ryzen5.png' },
			{ name: 'Intel Core [e]K', price: 800, image: 'i7.png' },
		],
	},
	{
		category: 'Видеокарта',
		options: [
			{ name: 'NVIDIA RTX 4060 Ti', price: 1200, image: 'rtx4060.png' },
			{ name: 'NVIDIA RTX 4070', price: 1500, image: 'rtx4070.png' },
			{ name: 'AMD Radeon RX 6750 XT', price: 1300, image: 'rx6750.png' },
		],
	},
	// Добавьте другие категории компонентов аналогично
]

const configurator = document.getElementById('configurator')
const totalPriceElement = document.getElementById('total-price')
let selectedComponents = {}

function createComponentSelector(component) {
	const container = document.createElement('div')
	container.className = 'component'

	const img = document.createElement('img')
	img.src = component.options[0].image
	container.appendChild(img)

	const title = document.createElement('h3')
	title.textContent = component.category
	container.appendChild(title)

	const select = document.createElement('select')
	component.options.forEach(option => {
		const opt = document.createElement('option')
		opt.value = option.name
		opt.textContent = `${option.name} — ${option.price} BYN`
		select.appendChild(opt)
	})
	select.addEventListener('change', () => {
		const selectedOption = component.options.find(
			opt => opt.name === select.value
		)
		img.src = selectedOption.image
		selectedComponents[component.category] = selectedOption
		updateTotalPrice()
	})
	container.appendChild(select)

	configurator.appendChild(container)

	// Инициализация выбранного компонента
	selectedComponents[component.category] = component.options[0]
}

function updateTotalPrice() {
	const total = Object.values(selectedComponents).reduce(
		(sum, comp) => sum + comp.price,
		0
	)
	totalPriceElement.textContent = total
}

function saveConfiguration() {
	localStorage.setItem('pcConfiguration', JSON.stringify(selectedComponents))
	alert('Сборка сохранена!')
}

document
	.getElementById('save-config')
	.addEventListener('click', saveConfiguration)

// Инициализация конфигуратора
components.forEach(createComponentSelector)
updateTotalPrice()
