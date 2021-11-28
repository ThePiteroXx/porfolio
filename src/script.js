import { gsap } from 'gsap'
import './scss/style.scss'
import LoadingScreen from './Js/Loading/LoadingScreen.js'
import Experience from './Js/Experience/Experience.js'
import About from './Js/skill/About.js'
import Work from './Js/Work/Work.js'

import fontawsome from '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const charming = require("charming")

const reousorces = new LoadingScreen().init()
// reousorces.init()

const homeCanvas = new Experience({
    targetElement: document.querySelector('.experience')
})

const skillsCanvas = new About(document.querySelector('.canvas-about'))

const workCanvas = new Work(document.querySelector('.canvas-work'))

let $allNavMobileLink;
let $navHomeDesktop; 
let $navAboutDesktop;
let $navSkillsDesktop; 
let $navWorkDesktop; 
let $navContactDesktop;

let $allNavLinks;
let $allNavDesktopLink;
let $navHomeMobile;
let $navAboutMobile; 
let $navSkillsMobile;
let $navWorkMobile;
let $navContactMobile;

let $navBtn;
let $navMobile;

let $main;
let $sections;
let $headers;

let $home;
let $about;
let $work;

let $tl;

let stopNav = false

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

    $home = document.querySelector('.home')
    $about = document.querySelector('.about')
    $work = document.querySelector('.work')
    
    $tl = gsap.timeline()
}

const prepareDOMEvents = () =>
{
    checkHashLocation()
    $headers.forEach(element => charming(element))
    //Show navigation of mobile
    $navBtn.addEventListener('click', () => {
        $navBtn.classList.toggle('active')
        $navMobile.classList.toggle('active')
    })

    //Hide navogation mobile when click li
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
            if(link == $navHomeMobile && !isActive) changePageScene('home')
            if(link == $navAboutMobile && !isActive) changePageScene('about')
            if(link == $navWorkMobile && !isActive) changePageScene('work')

            if(link == $navHomeDesktop && !isActive) changePageScene('home')
            if(link == $navAboutDesktop && !isActive) changePageScene('about')
            if(link == $navWorkDesktop && !isActive) changePageScene('work')
            stopNav = true
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
            if(!element.classList.contains(nameClass))
            {
                element.style.opacity = '0'
                element.classList.remove('is-visible')
            }
            else 
            {
                $tl.to(element, 0.5, {opacity: 1})
                element.classList.add('is-visible')
            }
        })
    }

    const hash = location.hash
    $main.className = ' '
    if(hash === '#home' || hash === '')
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

const setHeaderSpans = (idScene) => 
{
    let spans = null
    $headers.forEach(header => {
        const attribute = header.getAttribute('data-heading')
        if(idScene === attribute) spans = [...header.querySelectorAll('span')]
    })

    return spans
}

const changePageScene = (idScene) => {
    const oldPageClassName = $main.classList[0].replace('-is-active', '')
    const oldPage = window[oldPageClassName]
    const spans = setHeaderSpans(idScene)
   
    $main.className = ' '

    $sections.forEach(element => {
        const idSection = element.attributes.id.value
        if(idScene === idSection){
            $tl.to(oldPage, 1, {opacity: 0})
            .to(element, 0.5, {opacity: 1, onComplete: () => {
                $allNavDesktopLink.forEach(element => element.className = ' ')
                checkHashLocation()
                stopNav = false
            }})
            .staggerFromTo(spans, 0.5, {opacity:0}, {opacity:1}, 0.05, '-=0.5')
        }
    })
}

document.addEventListener('DOMContentLoaded', main)

