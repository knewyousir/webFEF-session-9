// Functions called elsewhere
var removeActiveClass = function (elements) {
	document.querySelectorAll(elements).forEach( (elem) => {
		elem.classList.remove('active')
	})
}

var addActiveClass = function (element) {
	element.classList.add('active')
}

// --- DOM Scripts ---- //

// Hamburger
var makeHamburgers = function () {
	var hamburger = document.querySelector('#pull');
	var body = document.querySelector('body');

	hamburger.addEventListener('click', showMenu)

	function showMenu() {
		body.classList.toggle('show-nav');
		event.preventDefault();
	}
}


// Video switcher
var videoSwitcher = function () {
	const videoLinks = Array.from(document.querySelectorAll('.content-video a'));
	const iFrame = document.querySelector('iframe')
	
	videoLinks.forEach((videoLink) => {
		videoLink.addEventListener('click', selectVideo)
	});
		
	function selectVideo() {
		removeActiveClass('.content-video a');
		addActiveClass(event.target)
		const videoToPlay = event.target.getAttribute('href');
		iFrame.setAttribute('src', videoToPlay);
		event.preventDefault();
	}
}
	
	
// Accordion
var accordion = function () {
	const subnavLinks = document.querySelectorAll('.nav-sub > li > a')
	subnavLinks[0].nextElementSibling.classList.add('active')
	
	subnavLinks.forEach(subnavLink => subnavLink.addEventListener('click', openAccordion))
	
	function openAccordion() {
		removeActiveClass('.nav-sub > li > ul');
		addActiveClass(event.target.nextElementSibling)
		event.preventDefault()
	}
}

// ---- Initialization ---- //

makeHamburgers();
accordion();
videoSwitcher();