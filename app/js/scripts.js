document.addEventListener('click', (e) => {
	// console.log(e.target)
	if (e.target.id == 'pull') {
		makeHamburgers(e.target)
	}
	else if (e.target.matches('.btn-list a')) {
		videoSwitcher(e.target)
	}
	else if (e.target.matches('.nav-sub > li > a')) {
		accordion()
	}
	else if (e.target.matches('.image-tn img')) {
		runCarousel(e.target)
	}
}, false)

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
var makeHamburgers = function (elem) {
	event.preventDefault();
	var body = document.querySelector('body');
	if (body.classList.contains('show-nav')) {
		body.classList.remove('show-nav');
	} else {
		body.classList.add('show-nav');
	}
}

// Video switcher
var videoSwitcher = function (elem) {
	event.preventDefault();
	const iFrame = document.querySelector('iframe')
	removeActiveClass('.content-video a');
	addActiveClass(event.target)
	const videoToPlay = event.target.getAttribute('href');
	iFrame.setAttribute('src', videoToPlay);
}

// Accordion
var accordion = function () {
	event.preventDefault()
	removeActiveClass('.nav-sub > li > ul');
	addActiveClass(event.target.nextElementSibling)
}

// Image Carousel

var runCarousel = function (elem) {
	event.preventDefault()
	const carousel = document.querySelector('figure img')
	const carouselPara = document.querySelector('figcaption')
	const imageHref = elem.parentElement.getAttribute('href')
	const titleText = elem.title
	carouselPara.innerHTML = titleText
	carousel.setAttribute('src', imageHref)
}

// AJAX

const nytapi = 'd7d88f32a04d4c6aab4e46735441d0ee';
const url = "https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=" + nytapi;

var addContent2 = function (stories) {
	stories = stories.results
	console.log(stories[4].abstract)
  	document.querySelector('.newsletter h3 a').innerText = stories[4].title;
	document.querySelector('.newsletter p').innerText = stories[4].abstract;

	var newsItems = document.querySelectorAll('.hentry')

	for (var i = 0; i < 2; i++){
		newsItems[i].querySelector('a').innerText = stories[i].title
		newsItems[i].querySelector('p').innerText = stories[i].abstract
	}
}

var getData = function () {
	fetch(url)
	.then(response => response.json())
	.then(json => addContent2(json))
};

getData();

// ---- Initialization ---- //

var setEverythingUp = function () {
	document.querySelector('.btn-list a').classList.add('active');
	document.querySelector('.nav-sub > li > a').nextElementSibling.classList.add('active')
	document.querySelector('figure img').setAttribute('src', document.querySelector('.image-tn a').href)
	document.querySelector('figure figcaption').innerText = document.querySelector('.image-tn a img').title
}

setEverythingUp()