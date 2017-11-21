const menuButton = document.querySelector('#pull')
const menu = document.querySelector('nav ul')
menuButton.addEventListener('click', toggleMenu)

function toggleMenu(){
	menu.classList.toggle('show');
	event.preventDefault();
}


const iFrame = document.querySelector('iframe')
const videoLinks = document.querySelectorAll('.content-video a')
const videoLinksArray = [...videoLinks]
videoLinksArray.forEach( 
	videoLink => videoLink.addEventListener('click', selectVideo ))

function selectVideo(){
	removeActiveClass()
	const videoToPlay = this.getAttribute('href')
	iFrame.setAttribute('src', videoToPlay)
	this.classList.add('active')
	// console.log(videoToPlay)
	event.preventDefault()
}

function removeActiveClass(){
	videoLinksArray.forEach( videoLink => videoLink.classList.remove('active'))
}

















