# 1. IX - DOM Scripting

<!-- TOC -->

- [1. IX - DOM Scripting](#1-ix---dom-scripting)
  - [1.1. Homework](#11-homework)
  - [1.2. Tooling](#12-tooling)
  - [1.3. JavaScipt Review](#13-javascipt-review)
    - [1.3.1. REVIEW: Video Switcher](#131-review-video-switcher)
    - [1.3.2. REVIEW: JavaScript and CSS for nav-sub.](#132-review-javascript-and-css-for-nav-sub)
    - [1.3.3. REVIEW: removeActiveClass](#133-review-removeactiveclass)
  - [1.4. Image Carousel](#14-image-carousel)
    - [1.4.1. Image Carousel JavaScript](#141-image-carousel-javascript)
  - [1.5. The Panels (the third and final section)](#15-the-panels-the-third-and-final-section)
  - [1.6. AJAX](#16-ajax)
  - [1.7. GIT and GITHUB](#17-git-and-github)
  - [1.8. Notes](#18-notes)
    - [1.8.1. Links Smooth Scrolling](#181-links-smooth-scrolling)
    - [1.8.2. Follow Along](#182-follow-along)

<!-- /TOC -->

## 1.1. Homework

* Continue on your final projects
* Add additional content to the page from the New York Times

Top of the page

![image](/other/img/wide.png)

Mobile view

![image](/other/img/mobile.png)

Full page

![image](/other/img/siteDesign.png)

## 1.2. Tooling

```sh
cd <session9>
npm i
```

<!-- Experiment with this line for more reliable sass processing:

```sh
"sassy": "node-sass --watch scss/**.scss --output 'app/css' --expanded --source-map true",
``` -->

`$ npm run boom!`

Or, to use Live SASS Compiler in VSCode, make sure you have the extension installed and configure your project settings json with:

```js
{
  "liveSassCompile.settings.formats": [
      {
          "savePath": "/app/css",
          "format": "expanded"
      }
  ],
  "liveSassCompile.settings.excludeList": [
      "**/node_modules/**",
      ".vscode/**",
      "**/other/**"
  ]
}
```

## 1.3. JavaScipt Review

### 1.3.1. REVIEW: Video Switcher 

For testing purposes add this to the top of the scripts file:

```js
var log = console.log
```

JavaScript with Active class switching:

```js
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
```

### 1.3.2. REVIEW: JavaScript and CSS for nav-sub.

Check out [this article](https://css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion/) on the simplest way to create an accordion.

Here is the CSS for the accordion:

```css
.nav-sub {
	padding: 10px 20px;
	background-color: $lt-yellow;
	border: 1px solid $dk-yellow;
	border-radius: $radius;
	max-height: 180px; 
	overflow: scroll; 
	ul {
		// display:none;
		max-height: 0;
		overflow: hidden;
		transition: all .3s;
		&.active {
			// display: block;
			max-height: 500px;
		}
	}
	> li > a { 
		font-weight:bold; 
	}
	ul li {
		padding-left:12px;
	}
}

```

To script the accordion we had to use [DOM Traversal](https://www.w3schools.com/jsref/dom_obj_document.asp): 
nextElementSibling, nextSibling, previousSibling, childNodes, firstChild, etc.

This was because we were litening to clicks on the main (bold) list items, but setting the active class on a sibling (the nested `<ul>`).

```js
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
```

### 1.3.3. REVIEW: removeActiveClass

Since adding and removing the active class was becoming an activity that we needed for multiple scripts we consolidated it into two functions:

```js
var removeActiveClass = function (elements) {
	document.querySelectorAll(elements).forEach( (elem) => {
		elem.classList.remove('active')
	})
}

var addActiveClass = function (element) {
	element.classList.add('active')
}
```

These are used in the accordion and video switcher.

## 1.4. Image Carousel 

Do a DOM review of this section of the page.

Here's what we have in `_carousel.scss`:

```css
.secondary aside {
	ul {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;
		li {
			flex-basis: 22%;
			margin: 2px;
			padding: 10px;
			background-color: #fff;
			border: 1px solid $dk-yellow;
			transition: all 0.2s linear;
			&:hover {
				transform: scale(1.1);
				box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
			}
		}
	}
}

figure {
	position: relative;
	figcaption {
		padding: 6px;
		background: rgba(255, 255, 255, 0.7);
		position: absolute;
		bottom: 0;
	}
}
```

### 1.4.1. Image Carousel JavaScript

Change the # links to point to high res images (first three only in this sample):

```html
<ul class="image-tn">
  <li>
    <a href="img/bamboo.jpg"><img src="img/bamboo-tn.jpg" alt="" title="Link to original photo on Flickr" /></a>
  </li>
  <li>
    <a href="img/bridge.jpg"><img src="img/bridge-tn.jpg" alt="" title="Link to original photo on Flickr" /></a>
  </li>
  <li>
    <a href="img/pagoda.jpg"><img src="img/pagoda-tn.jpg" alt="" title="Link to original photo on Flickr" /></a>
  </li>
```

Change the title text as well.


```js
const carouselLinks = document.querySelectorAll('.image-tn a')
const carousel = document.querySelector('figure img')
carouselLinks.forEach( carouselLink => carouselLink.addEventListener('click', runCarousel ))

function runCarousel(){
    const imageHref = this.getAttribute('href')
    carousel.setAttribute('src', imageHref)
    event.preventDefault()
}
```

Set the text in the carousel.

Find the appropriate traversal `const titleText = this.firstChild.title`:

```js
function runCarousel() {
		console.log(this.getAttribute('href'))
		console.log(event.target.parentElement.getAttribute('href'))
    const imageHref = this.getAttribute('href')
    carousel.setAttribute('src', imageHref)
    event.preventDefault()
}
```

Create a pointer to the figcaption in order to manipulate its content:

```js
const carouselPara = document.querySelector('figcaption')
```

Set the innerHTML `carouselPara.innerHTML = titleText` of the paragraph:

```js
function runCarousel(){
    const imageHref = this.getAttribute('href')
    const titleText = this.firstChild.title
    carouselPara.innerHTML = titleText
    console.log(carouselPara)
    carousel.setAttribute('src', imageHref)
    event.preventDefault()
}
```

Let's use function expressions for this as we have done elsewhere.

```js
const carouselLinks = document.querySelectorAll('.image-tn a')
const carousel = document.querySelector('figure img')
const carouselPara = document.querySelector('figcaption')
carouselLinks.forEach( carouselLink => carouselLink.addEventListener('click', runCarousel ))

var runCarousel = function(){
    const imageHref = this.getAttribute('href')
    const titleText = this.firstChild.title
    carouselPara.innerHTML = titleText
    carousel.setAttribute('src', imageHref)
    event.preventDefault()
}
```

Click on a thumbnail, and our page is broken. 

This is due to the fact that the function appears after the `forEach` that assigns the event listener to the image thumbnails.

Moving the `forEach` below the function will work:

```js
const carouselLinks = document.querySelectorAll('.image-tn a')
const carousel = document.querySelector('figure img')
const carouselPara = document.querySelector('figcaption')

var runCarousel = function(){
    const imageHref = this.getAttribute('href')
    const titleText = this.firstChild.title
    carouselPara.innerHTML = titleText
    carousel.setAttribute('src', imageHref)
    event.preventDefault()
}

carouselLinks.forEach( carouselLink => carouselLink.addEventListener('click', runCarousel ))
```

Final:

```js
// Image Carousel

var runCarousel = function () {
	const carousel = document.querySelector('figure img')
	const carouselPara = document.querySelector('figcaption')
	const imageHref = this.getAttribute('href')
	const titleText = this.firstChild.title
	carouselPara.innerHTML = titleText
	carousel.setAttribute('src', imageHref)
	event.preventDefault()
}

const carouselLinks = document.querySelectorAll('.image-tn a')
carouselLinks.forEach( carouselLink => carouselLink.addEventListener('click', runCarousel ))
```

Note the separation of thumbnails and figure in small screen view.

```css
.secondary article {
    display: flex;
    flex-direction: column;
    figure {
        order: 2;
    }
}
```

Correct wide screen view:

```css
.secondary article {
    display: flex;
    flex-direction: column;
    figure {
        order: 2;
        @media(min-width: $break-med){
            order: 0;
        }
    }
}
```

Further optimization of the entire script:

```js
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

// ---- Initialization ---- //

var setEverythingUp = function () {
	document.querySelector('.btn-list a').classList.add('active');
	document.querySelector('.nav-sub > li > a').nextElementSibling.classList.add('active')
	document.querySelector('figure img').setAttribute('src', document.querySelector('.image-tn a').href)
	document.querySelector('figure figcaption').innerText = document.querySelector('.image-tn a img').title
}

setEverythingUp()

```

## 1.5. The Panels (the third and final section)

Review the design. Let's try floats and absolute/relative positioning.

In `_panels.scss`:

```css
.hentry {
  position: relative;
  float: left;
  width: 50%;
}
```

Add padding (note the use of box-sizing):

```css
.hentry {
    position: relative;
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding: 1rem;
}
```

The little date area

The HTML5 [time tag](https://www.w3schools.com/tags/tag_time.asp) and datetime attribute

```css
.hentry {
    ...
    .published {
        position: absolute;
        top: 250px;
        left: 1rem;
        display: block;
        width: 30px;
        padding: 5px 10px;
        background-color: $link;
        font-size: 10px;
        text-align: center;
        text-transform: uppercase;
        color: #fff;
    }
    .day {
        font-size: 26px;
    }
    h4 {
        margin: 0 0 10px 60px;
        font-size: 20px;
    }
    p {
        margin-left: 60px;
    }
}
```

Parent container .hentries is used here.

Redo the entire design - mobile first:

```css
.hentries {
    display: flex;
    justify-content: space-between;
    .hentry {
        display: flex;
        flex-direction: column;
        width: 48%;

        .published {
            font-size: 0.875rem
        }
        h4 {
            font-size: 20px;
            margin-top:  1rem;
            margin-bottom: 0;
        }
        p {
            order: 2;
        }
    }
}
```

Final `_panels.scss`:

```css
.hentries {
    display: flex;
    abbr {
        text-decoration: none;
    }
    .hentry {
        float: left;
        box-sizing: border-box;
        width: 50%;
        padding: 0 8px;
        .published {
            text-align: center;
            float: left;
            width: 24%;
            box-sizing: border-box;
            display: block;
            padding: 2px 6px;
            background-color: $link;
            font-size: 10px;
            text-align: center;
            text-transform: uppercase;
            color: #fff;
        }
        .day {
            font-size: 32px;
        }
        h4 {
            font-size: 20px;
        }
        p {
            margin-top: 0;
            float: right;
            width: 70%;
            box-sizing: border-box;
        }
    }
}
```

Note RSS feed attribute selectors

```css
a[rel="alternate"] {
    padding-left: 20px;
    background: url(../img/a-rss.png) no-repeat 0 50%;
}
```

## 1.6. AJAX

`https://jsonplaceholder.typicode.com/`

```js
var getData = function () {
	fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
}
```

```js
var addContent = function(data){
	document.querySelector('.newsletter h3 a').innerText = data[0].title;
	document.querySelector('.newsletter p').innerText = data[0].body;
}

var getData = function () {
	fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => addContent(json))
}
```

[New York Times API](https://developer.nytimes.com/)}

`const nytapi = 'd7d88f32a04d4c6aab4e46735441d0ee';`

`https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=d7d88f32a04d4c6aab4e46735441d0ee`

```js
var getData = function () {
	fetch('https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=d7d88f32a04d4c6aab4e46735441d0ee')
  .then(response => response.json())
  .then(json => addContent2(json))
}
```

```js
var addContent2 = function (stories) {

	stories = stories.results
	console.log(stories[0].abstract)
  document.querySelector('.newsletter h3 a').innerText = stories[0].title;
	document.querySelector('.newsletter p').innerText = stories[0].abstract;

}
```

```js
var addContent2 = function (stories) {

	stories = stories.results
	console.log(stories[0].abstract)
  document.querySelector('.newsletter h3 a').innerText = stories[0].title;
	document.querySelector('.newsletter p').innerText = stories[0].abstract;

	var newsTitles = document.querySelectorAll('.hentry h4 a')

	newsTitles.forEach(function (title) {
		title.innerText = stories[1].title
	})
}
```

```js
var addContent2 = function (stories) {

	stories = stories.results
	console.log(stories[0].abstract)
  document.querySelector('.newsletter h3 a').innerText = stories[0].title;
	document.querySelector('.newsletter p').innerText = stories[0].abstract;

	var newsTitles = document.querySelectorAll('.hentry h4 a')
	var newsStories = document.querySelectorAll('.hentry p')

	newsTitles.forEach(function (title) {
		title.innerText = stories[1].title
	})

	newsStories.forEach(function (abstract) {
		abstract.innerText = stories[1].abstract
	})
}
```

```js
for (var i = 0; i < 2; i++){
  console.log(newsItems[i])
}
```

```js
for (var i = 0; i < 2; i++){
  console.log(newsItems[i].querySelector('a').innerText)
}
```

```js
var addContent2 = function (stories) {

	stories = stories.results
	console.log(stories[0].abstract)
  document.querySelector('.newsletter h3 a').innerText = stories[5].title;
	document.querySelector('.newsletter p').innerText = stories[5].abstract;

	var newsItems = document.querySelectorAll('.hentry')

	for (var i = 0; i < 2; i++){
		newsItems[i].querySelector('a').innerText = stories[i].title
		newsItems[i].querySelector('p').innerText = stories[i].abstract
	}

}
```



## 1.7. GIT and GITHUB

Since we've just created a nice reusable setup we should save it.

Git is a version control system originally invented for use developing Linux by Linus Torvalds. It is the standard version tool and integrates with Github to permit collaboration.

There is a handy and very simple tutorial for Git on [the Git Website](https://try.github.io/levels/1/challenges/1) which is highly recommended for newbies.

1. make sure terminal is in the `basic-dom` directory using `cd` (drag-and-drop, copy paste)
1. initialize the repo:

```sh
git init
```

Configuring Git - only if you haven't done this before, and you only need to do this once:

```sh
git config
git config --global user.name " ***** "
git config --global user.email " ***** "
git config --list
```

* Add (watch) all your files:

```sh
git add .
```

Once you have made changes you need to commit them

```sh
git commit -m 'initial commit'
```

Note: `git commit`  without the `-m` flag goes into VI - a text popular UNIX text editor. To avoid this always using the -m flag when committing. (If you end up in VI, hit ESC and type “:q” to exit.)

Git Status

```sh
git status
On branch master
nothing to commit, working directory clean
```

* Create a new branch:

```sh
git branch <new branchname>
git checkout <new branchname>
git branch
```

To merge branches

* make sure the branch you want to merge is clear (`$ git status`)
* checkout the branch you want to merge into
* run status on that branch too (make sure it is clear)

```sh
git checkout master
git status
git merge <new branchname>
```

Delete branches:

```sh
git branch -d <branchname>
```

Pushing Files to Remote Repos - Github

Note: always create a .gitignore file to prevent local working / utility files from being pushed.

```sh
.sass_cache
.DS_store
node_modules
```

* Log into Github, create and new repo and follow the instructions e.g.:

```sh
git remote add origin https://github.com/<nameofgithubrepo>
git push -u origin master
```

Finally - when downloading a github repo use the `clone` method to move it to your local disk while retaining the git history, branches, and etc.

## 1.8. Notes

### 1.8.1. Links Smooth Scrolling

`<li><a href="#two">Summary</a></li>`

`<div class="secondary" id="two">`

```css
html {
  scroll-behavior: smooth;
}
```

https://www.sitepoint.com/smooth-scrolling-vanilla-javascript/

```js
initSmoothScrolling();

function initSmoothScrolling() {
  if (isCssSmoothSCrollSupported()) {
    return;
  }

  var duration = 400;

  var pageUrl = location.hash ?
    stripHash(location.href) :
    location.href;

  delegatedLinkHijacking();
  //directLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target))
        return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function() {
          setFocus(e.target.hash);
        }
      });
    }
  }

  function directLinkHijacking() {
    [].slice.call(document.querySelectorAll('a'))
      .filter(isInPageLink)
      .forEach(function(a) {
        a.addEventListener('click', onClick, false);
      });

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
      });
    }

  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' &&
      n.hash.length > 0 &&
      stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from:
  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

}

function jump(target, options) {
  var
    start = window.pageYOffset,
    opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    },
    distance = typeof target === 'string' ?
    opt.offset + document.querySelector(target).getBoundingClientRect().top :
    target,
    duration = typeof opt.duration === 'function' ?
    opt.duration(distance) :
    opt.duration,
    timeStart, timeElapsed;

  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
      requestAnimationFrame(loop)
    else
      end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
      opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

}
```
### 1.8.2. Follow Along

```js
const triggers = document.querySelectorAll('a')
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.append(highlight)
function highlightlink(){
  const linkCoords = this.getBoundingClientRect();
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    left: linkCoords.left + window.scrollX,
    top: linkCoords.top + window.scrollY
  }
  highlight.style.width = `${coords.width}px`
  highlight.style.height = `${coords.height}px`
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`
}
triggers.forEach( (a) => a.addEventListener('mouseenter', highlightlink))
```