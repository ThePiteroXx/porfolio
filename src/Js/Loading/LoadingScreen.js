import { gsap } from 'gsap'
import Resources from "./Resources.js"
export default class LoadingScreen
{
    static instance

    constructor()
    {
        if(LoadingScreen.instance)
        {
            return LoadingScreen.instance
        }
        LoadingScreen.instance = this

        this.resources = new Resources()

    }


    init()
    {
        const tl = gsap.timeline()
        const screenLoad = document.querySelector('.loader')
        const loaderProgress = document.querySelector('.loader-strip-progress')
        const headers = [...document.querySelectorAll('[data-heading]')]
        let spans = []
        headers.forEach(header => spans.push(header.children))
        

        this.resources.on('progress', (_progress) =>
        {
            this.progress = _progress.loaded / _progress.toLoad
            loaderProgress.style.transform = `scaleX(${this.progress})`

            if(this.progress === 1)
            {
                tl.fromTo(screenLoad, {x: 0}, {x: '100%', ease: 'power3.in' ,duration: 0.6})
                .addLabel('headersAnimation')
                spans.forEach(span => {
                    tl.staggerFromTo(span, 0.5, {opacity:0}, {opacity:1}, 0.05, 'headersAnimation')
                })
            }
            
        })
    }

}