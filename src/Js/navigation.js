import { gsap } from 'gsap'

const charming = require("charming")

let $navHomeDesktop; 
let $navAboutDesktop;
let $navWorkDesktop; 
let $navContactDesktop;

let $allNavMobileLink;
let $navHomeMobile;
let $navAboutMobile; 
let $navWorkMobile;
let $navContactMobile;

let $allLinks;
let $allNavLinks;

let $navBtn;
let $navMobile;

let $main;
let $sections;
let $headers;
let $descriptionHome;

let $tl;

const prepareDOMElements = () => 
{
    $navHomeDesktop = document.querySelector('#navHomeDesktop')
    $navAboutDesktop = document.querySelector('#navAboutDesktop')
    $navWorkDesktop = document.querySelector('#navWorkDesktop')
    $navContactDesktop = document.querySelector('#navContactDesktop')
    
    $navHomeMobile = document.querySelector('#navHomeMobile')
    $navAboutMobile = document.querySelector('#navAboutMobile')
    $navWorkMobile = document.querySelector('#navWorkMobile')
    $navContactMobile = document.querySelector('#navContactMobile')
    $allNavMobileLink = [...document.querySelectorAll('.nav-mobile-list li')]

    $allNavLinks = [...document.querySelectorAll('.navLi')]
    $allLinks = [...document.querySelectorAll('[data-href]')]
    
    $navBtn = document.querySelector('#navBtn')
    $navMobile = document.querySelector('#navMobile')

    $main = document.querySelector('main')
    $sections = [...$main.children]
    $headers = [...document.querySelectorAll('[data-heading]')]
    $descriptionHome = document.querySelector('.home__description')
    
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
        const linkPathname = link.firstChild.hash.slice(1)
        link.addEventListener('click', () => {
            const isActive = link.classList.contains('active')
            if(!isActive) changePageScene(linkPathname)
        })
        
    })
    
    // Change pages with all link (<a href="" />)
    $allLinks.forEach(link => {
        const linkPathname = link.dataset.href
        link.addEventListener('click', () => changePageScene(linkPathname))
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
    const setVisibleSection = (nameClass) => {
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
        $navHomeMobile.classList.add('active')
        setVisibleSection('home')
    }
    if(hash === '#about')
    {
     $main.classList.add('about-is-active')
     $navAboutDesktop.classList.add('active')
     $navAboutMobile.classList.add('active')
     setVisibleSection('about')
    }
    if(hash === '#work')
    {
        $main.classList.add('work-is-active')
        $navWorkDesktop.classList.add('active')
        $navWorkMobile.classList.add('active')
        setVisibleSection('work')
    }
    if(hash === '#contact')
    {
     $main.classList.add('contact-is-active')
     $navContactDesktop.classList.add('active')
     $navContactMobile.classList.add('active')
     setVisibleSection('contact')
    }
}

const changePageScene = (idScene) => {
    if(!$main.classList[0]) return
    const previousPageClassName = $main.classList[0].replace('-is-active', '')
    const previousPage = window[previousPageClassName]
   
    $main.className = ' ' // delete main classes

    const foundSection = $sections.find(section => section.attributes.id.value === idScene)

    if(foundSection) {
        // remove active class from nav links
        $allNavLinks.forEach(element => element.classList.remove('active'))
        
        // set transition
        $tl
        .to(previousPage, 1, {opacity: 0})
        .to(foundSection, 0.5, {opacity: 1, onComplete: () => {
            checkHashLocation()
        }})
    }
}

document.addEventListener('DOMContentLoaded', main)
