import Home from "./Home/Home.js"
import About from "./About/About.js"
import Work from "./Work/Work.js"

const home = new Home(document.querySelector(".canvas-home"))
const about = new About(document.querySelector(".canvas-about"))
const work = new Work(document.querySelector(".canvas-work"))

export const update = (instance) => {
    switch(window.location.hash) {
        case '#home':
        case '#home-stats':
        case '':
            home.update()
            break
        case '#about':
            about.update()
            break
        case '#work':
            work.update()
            break
    }

    window.requestAnimationFrame(() => {
        update()
    })
}
