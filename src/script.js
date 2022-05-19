import { gsap } from 'gsap'
import './scss/style.scss'
import LoadingScreen from './Js/LoadingScreen/LoadingScreen.js'
import Home from './Js/Home/Home.js'
import About from './Js/About/About.js'
import Work from './Js/Work/Work.js'
import Contact from './Js/Contact/Contact.js'

import fontawsome from '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const charming = require("charming")

const loadingScreen = new LoadingScreen()
loadingScreen.init()

const contact = new Contact()
const homeCanvas = new Home({
    targetElement: document.querySelector('.canvas-home')
})

const skillsCanvas = new About(document.querySelector('.canvas-about'))

const workCanvas = new Work(document.querySelector('.canvas-work'))

let $allNavMobileLink;
let $navHomeDesktop; 
let $navAboutDesktop;
let $navWorkDesktop; 
let $navContactDesktop;

let $allNavLinks;
let $allNavDesktopLink;
let $navHomeMobile;
let $navAboutMobile; 
let $navWorkMobile;
let $navContactMobile;

let $navBtn;
let $navMobile;

let $main;
let $sections;
let $headers;
let $descriptionHome;

let $home;
let $about;
let $work;

let $tl;


const prepareDOMElements = () => 
{
    $navHomeDesktop = document.querySelector('#navHomeDesktop')
    $navAboutDesktop = document.querySelector('#navAboutDesktop')
    $navWorkDesktop = document.querySelector('#navWorkDesktop')
    $navContactDesktop = document.querySelector('#navContactDesktop')
    $allNavMobileLink = [...document.querySelectorAll('.nav-mobile-list li')]
    
    $navHomeMobile = document.querySelector('#navHomeMobile')
    $navAboutMobile = document.querySelector('#navAboutMobile')
    $navWorkMobile = document.querySelector('#navWorkMobile')
    $navContactMobile = document.querySelector('#navContactMobile')
    $allNavDesktopLink = [...document.querySelectorAll('.nav-desktop-list li')]
    $allNavLinks = [...document.querySelectorAll('.navLi')]
    
    $navBtn = document.querySelector('#navBtn')
    $navMobile = document.querySelector('#navMobile')

    $main = document.querySelector('main')
    $sections = [...$main.children]
    $headers = [...document.querySelectorAll('[data-heading]')]
    $descriptionHome = document.querySelector('.home__description')

    $home = document.querySelector('.home')
    $about = document.querySelector('.about')
    $work = document.querySelector('.work')
    
    $tl = gsap.timeline()
}

const prepareDOMEvents = () =>
{
    checkHashLocation()

    // charming headers, desc
    $headers.forEach(element => charming(element))
    charming($descriptionHome)

    //Show navigation of mobile
    $navBtn.addEventListener('click', () => {
        $navBtn.classList.toggle('active')
        $navMobile.classList.toggle('active')
    })

    //Hide navogation mobile when click link
    $allNavMobileLink.forEach(element => {
        
        element.addEventListener('click', () => {
            $navBtn.classList.remove('active')
            $navMobile.classList.remove('active')
            
        })
        
    })
    
    // Change pages with navigation

    $allNavLinks.forEach(link => {
        
        link.addEventListener('click', () => {
            const isActive = link.classList.contains('active')
            // mobile
            if(link == $navHomeMobile && !isActive) changePageScene('home')
            if(link == $navAboutMobile && !isActive) changePageScene('about')
            if(link == $navWorkMobile && !isActive) changePageScene('work')
            if(link == $navContactMobile && !isActive) changePageScene('contact')

            // dektop
            if(link == $navHomeDesktop && !isActive) changePageScene('home')
            if(link == $navAboutDesktop && !isActive) changePageScene('about')
            if(link == $navWorkDesktop && !isActive) changePageScene('work')
            if(link == $navContactDesktop && !isActive) changePageScene('contact')
        })
        
    })
}
const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}
/*
* Functions
*/

const checkHashLocation = () => {
    const setClassVisible = (nameClass) => {
        $sections.forEach(element => {
            if(element.classList.contains(nameClass))
            {
                element.style.opacity = '1'
                element.classList.add('is-visible')
            }
            else 
            {
                element.style.opacity = '0'
                element.classList.remove('is-visible')
            }
        })
    }

    const hash = location.hash
    $main.className = ' '

    if(hash === '#home' || hash === '' || hash === '#home-stats')
    {
        $main.classList.add('home-is-active')
        $navHomeDesktop.classList.add('active')
        setClassVisible('home')
    }
    if(hash === '#about')
    {
     $main.classList.add('about-is-active')
     $navAboutDesktop.classList.add('active')
     setClassVisible('about')
    }
    if(hash === '#work')
    {
        $main.classList.add('work-is-active')
        $navWorkDesktop.classList.add('active')
        setClassVisible('work')
    }
    if(hash === '#contact')
    {
     $main.classList.add('contact-is-active')
     $navContactDesktop.classList.add('active')
     setClassVisible('contact')
    }
}

const changePageScene = (idScene) => {
    if(!$main.classList[0]) return
    const previousPageClassName = $main.classList[0].replace('-is-active', '')
    const previousPage = window[previousPageClassName]
   
    $main.className = ' '

    const foundSection = $sections.find(section => section.attributes.id.value === idScene)

    if(foundSection) {
        // remove classes from nav links
        $allNavDesktopLink.forEach(element => element.className = '')
        
        // set transition
        $tl
        .to(previousPage, 1, {opacity: 0})
        .to(foundSection, 0.5, {opacity: 1, onComplete: () => {
            checkHashLocation()
        }})
    }
}

document.addEventListener('DOMContentLoaded', main)

