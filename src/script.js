
import './scss/style.scss'
import Experience from './Js/Experience/Experience.js'
import Skill from './Js/skill/Skill.js'

import fontawsome from '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const home = new Experience({
    targetElement: document.querySelector('.experience')
})

const skills = new Skill(document.querySelector('.webgl'))

