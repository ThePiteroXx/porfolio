import { gsap } from 'gsap'
import './scss/style.scss'
import Experience from './Js/Experience/Experience.js'
import About from './Js/skill/About.js'

import fontawsome from '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


const homeCanvas = new Experience({
    targetElement: document.querySelector('.experience')
})

const skillsCanvas = new About(document.querySelector('.canvas-about'))

let $allNavMobileLink;
let $navHomeDesktop; 
let $navAboutDesktop;
let $navSkillsDesktop; 
let $navWorkDesktop; 
let $navContactDesktop;

let $navHomeMobile;
let $navAboutMobile; 
let $navSkillsMobile;
let $navWorkMobile;
let $navContactMobile;

let $navBtn;
let $navMobile;

let $main;
let $sections;

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
    
    $navBtn = document.querySelector('#navBtn')
    $navMobile = document.querySelector('#navMobile')

    $main = document.querySelector('main')
    $sections = [...$main.children]

    $home = document.querySelector('.home')
    $about = document.querySelector('.about')
    $work = document.querySelector('.work')
    
    $tl = gsap.timeline()
}

const prepareDOMEvents = () =>
{
    checkHashLocation()
    
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
    $navHomeDesktop.addEventListener('click', () => changePageScene('home'))
    $navAboutDesktop.addEventListener('click', () => changePageScene('about'))
    
    $navHomeMobile.addEventListener('click', () => changePageScene('home'))
    $navAboutMobile.addEventListener('click', () => changePageScene('about'))
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
        $sections.filter(element => {
            if(!element.classList.contains(nameClass))
            {
                element.style.opacity = '0'
                element.classList.remove('is-visible')
            }
            else 
            {
                gsap.to(element, 0.5, {opacity: 1})
                element.classList.add('is-visible')
            }
        })
    }

    const hash = location.hash
    $main.className = ' '
    if(hash === '#home' || hash === '')
    {
        $main.classList.add('home-is-active')
        setClassVisible('home')
    }
    if(hash === '#about')
    {
     $main.classList.add('about-is-active')
     setClassVisible('about')
    }
    if(hash === '#work')
    {
        $main.classList.add('work-is-active')
        setClassVisible('work')
    }
    if(hash === '#contact')
    {
     $main.classList.add('contact-is-active')
     setClassVisible('contact')
    }
}

const changePageScene = (idScene) => {
    const oldPageClassName = $main.classList[0].replace('-is-active', '')
    const oldPage = window[oldPageClassName]
   
    $main.className = ' '

    $sections.forEach(element => {
        const idSection = element.attributes.id.value
        if(idScene === idSection){
            $tl.to(oldPage, 1, {opacity: 0})
            .to(element, 0.5, {opacity: 1, onComplete: () => {
                checkHashLocation()
            }})
        }
    })
}


document.addEventListener('DOMContentLoaded', main)
