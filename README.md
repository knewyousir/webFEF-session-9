# Foundations Session 9

## Homework

Continue on your final projects.

Top of the page

![image](/img/wide.png)

Mobile view

![image](/img/mobile.png)

Full page

![image](/img/siteDesign.png)

## Tooling

```sh
cd <session9>
npm install
```

Create a Git repo from Master.

`$ npm run boom!`

### Scripting

#### REVIEW: Video Switcher - JavaScript with Active class

```js
const iFrame = document.querySelector('iframe')
const videoLinks = document.querySelectorAll('.content-video a')
const videoLinksArray = [...videoLinks]
videoLinksArray.forEach( videoLink => videoLink.addEventListener('click', selectVideo ))

function selectVideo(){
    removeActiveClass()
    this.classList.add('active')
    const videoToPlay = this.getAttribute('href')
    iFrame.setAttribute('src', videoToPlay)
    event.preventDefault()
}

function removeActiveClass(){
    videoLinksArray.forEach( videoLink => videoLink.classList.remove('active'))
}
```

#### JavaScript and css for nav-sub

Before we start check out [this article](https://css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion/) on the simplest way to create an accordion.

```css
.nav-sub {
  padding: 10px 20px;
  background-color: $lt-yellow;
  border: 1px solid $dk-yellow;
  border-radius: $radius;
  ul {
    display:none;
  }
  li:first-child ul {
    display:block;
  }
  > li > a { 
    font-weight:bold; 
  }
  ul li {
    padding-left:12px;
  }
}
```

Note the `>` [selector](https://www.w3schools.com/cssref/css_selectors.asp). Also see [Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Simple_selectors)

[DOM Traversal](https://www.w3schools.com/jsref/dom_obj_document.asp)
nextElementSibling, nextSibling, previousSibling, childNodes, firstChild, etc.

```js
const subnavLinks = document.querySelectorAll('.nav-sub > li > a')

subnavLinks.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))

function openAccordion(){
    this.nextElementSibling.classList.toggle('active')
    event.preventDefault()
}
```

Add to nav-sub css:

```css
.active {
  display: block;
}
```

```js
const subnavLinks = document.querySelectorAll('.nav-sub > li > a')

subnavLinks.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))

function openAccordion(){
  removeActiveClass()
  this.nextElementSibling.classList.toggle('active')
  event.preventDefault()
}

function removeActiveClass(){
    subnavLinks.forEach( subnavLink => subnavLink.nextElementSibling.classList.remove('active'))
}
```

Remove the offending css:

```css
  li:first-child ul {
    display:block;
  }
```

Add class via js:

```js
const subnavLinks = document.querySelectorAll('.nav-sub > li > a')
subnavLinks.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))
subnavLinks[0].nextElementSibling.classList.add('active')

function openAccordion(){
  removeActiveClass()
  this.nextElementSibling.classList.toggle('active')
  event.preventDefault()
}

function removeActiveClass(){
    subnavLinks.forEach( subnavLink => subnavLink.nextElementSibling.classList.remove('active'))
}
```

Add overflow and max height?

```css
.nav-sub {
  padding: 10px 20px;
  background-color: $lt-yellow;
  border: 1px solid $dk-yellow;
  border-radius: $radius;
  max-height: 150px;
  overflow: scroll;
  ul {
    display:none;
  }
  > li > a { 
    font-weight:bold; 
  }
  ul li {
    padding-left:12px;
  }
  .active {
    display: block;
  }
}
```

Note the lack of animation.

### removeActiveClass

This appears twice and the video switcher is broken. Let's unify this

```js
function openAccordion(){
    removeActiveClass('accordion')
    this.nextElementSibling.classList.toggle('active')
    event.preventDefault()
}
```

```js
function selectVideo(){
    removeActiveClass('video')
    const videoToPlay = this.getAttribute('href')
    iFrame.setAttribute('src', videoToPlay)
    this.classList.add('active')
    event.preventDefault()
}
```

```js
function removeActiveClass(locale){
    if (locale === 'accordion') {
        subnavLinks.forEach( subnavLink => subnavLink.nextElementSibling.classList.remove('active'))
    } else if (locale === 'video') {
        videoLinksArray.forEach( videoLink => videoLink.classList.remove('active'))
    }
}
```



### Subnav

Fix animation in nav-sub with

```js
ul {
    // display: none;
    max-height: 0;
    overflow: hidden;
    transition: all .3s;

  }
```

and

```css
.active { 
    max-height: 500px;
}
```

#### Sticky Nav

in navigation:

```css
nav {
    position: fixed;
    width: 100%;
  ...
  }
```

Test. 

Followed by cosmetic adjustments to header (add padding):

```css
header {
    max-width: $max-width;
    margin: 0 auto;
    h1 {
        font-size: 3rem;
        padding-top: 50px;
    }
```

Design note: its common to include a box shadow on elements that float atop.


### Image Carousel 

Do a DOM review of this section of the page.

In _carousel.scss:

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
```

Note transition

Content Slider - examine image

```css
figure {
    position: relative;
    figcaption {
        padding: 6px;
        background: rgba(255,255,255,0.7);
        position: absolute;
        bottom: 0;
    }
}   
```

### Image Carousel - JavaScript

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
function runCarousel(){
    const imageHref = this.getAttribute('href')
    const titleText = this.firstChild.title
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

Final script:

```js
const carouselLinks = document.querySelectorAll('.image-tn a')
const carousel = document.querySelector('figure img')
const carouselPara = document.querySelector('figcaption')
carouselLinks.forEach( carouselLink => carouselLink.addEventListener('click', runCarousel ))

function runCarousel(){
    const imageHref = this.getAttribute('href')
    const titleText = this.firstChild.title
    carouselPara.innerHTML = titleText
    carousel.setAttribute('src', imageHref)
    event.preventDefault()
}
```

Note the separation of thumbnails and figure in small screen view.

```js
.secondary article {
    display: flex;
    flex-direction: column;
    figure {
        order: 2;
    }
}
```

Correct wide screen view:

```js
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



### The Panels (the third and final section)

Review the design. Let's try floats and absolute/relative positioning.

In _panels.scss:

```css
.hentry {
  position: relative;
  float: left;
  width: 50%;
}
```

Add padding (note the use of box-sizing):

```js
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

Final _panels.scss:

```
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

with svg:

```css
a[rel="alternate"] {
    padding-left: 20px;
    background: url(../img/feed-icon.svg) no-repeat 0 50%;
    background-size: contain;
}
```



## Notes

### Links Smooth Scrolling

`<li><a href="#two">Summary</a></li>`

`<div class="secondary" id="two">`

```
html {
  scroll-behavior: smooth;
}
```

https://www.sitepoint.com/smooth-scrolling-vanilla-javascript/

```
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



### Follow Along

```
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













