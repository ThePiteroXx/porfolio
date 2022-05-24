import './scss/style.scss'
import { gsap } from 'gsap'
import LoadingScreen from './Js/LoadingScreen/LoadingScreen.js'
import Home from './Js/Home/Home.js'
import About from './Js/About/About.js'
import Work from './Js/Work/Work.js'
import Contact from './Js/Contact/Contact.js'

import fontawsome from '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import './Js/navigation.js'

new LoadingScreen()
new Home(document.querySelector('.canvas-home'))
new About(document.querySelector('.canvas-about'))
new Work(document.querySelector('.canvas-work'))
new Contact()

