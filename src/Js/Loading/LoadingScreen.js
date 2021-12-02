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

        this.tl = gsap.timeline()
        this.tl.addLabel('begin')
    }


    init()
    {
        const screenLoad = document.querySelector('.loader')
        const loaderProgress = document.querySelector('.loader-strip-progress')
        

        this.resources.on('progress', (_progress) =>
        {
            this.progress = _progress.loaded / _progress.toLoad
            loaderProgress.style.transform = `scaleX(${this.progress})`

            if(this.progress === 1)
            {
               this.tl.fromTo(screenLoad, {x: 0}, {x: '100%', ease: 'power3.in' ,duration: 0.6})
                .addLabel('headersAnimation')
                this.animation()
                
            }
            
        })

    }

    animation()
    {
        const headers = [...document.querySelectorAll('[data-heading]')]
        const descriptions = [...document.querySelectorAll('[data-description]')]
        const canvas = [...document.querySelectorAll('[data-canvas]')]
        let descriptionImg;
        const descriptionHome = document.querySelector('.home__description')
        const btnHome = document.querySelector('.home__btn')
        console.log(descriptionImg);
        //animation headers
        let spansHeader = []
        headers.forEach(header => spansHeader.push(header.children))
        spansHeader.forEach(span => {
           this.tl.staggerFromTo(span, 0.5, {opacity:0}, {opacity:1}, 0.05, 'headersAnimation')
        })
       this.tl.addLabel('afterHeaders')

       //animation description home and btn
       let spansDescriptionHome = descriptionHome.children
       this.tl.staggerFromTo(spansDescriptionHome, 0.5, {opacity:0}, {opacity:1}, 0.04)
       this.tl.fromTo(btnHome, 0.5, {opacity: 0}, {opacity:1})

       //animation all canvas and descriptions without home
       this.tl.staggerFromTo(descriptions, 2, {opacity:0}, {opacity:1}, 0.4, 'afterHeaders')
       this.tl.staggerFromTo(canvas, 3, {opacity:0}, {opacity:1}, 0.01, 'afterHeaders')

       //animation img work
       .add(() => {
           descriptionImg = [...document.querySelectorAll('.work__container__img-set')]
           this.tl.staggerFromTo(descriptionImg, 2, {opacity:0}, {opacity:1}, 0.2, 'afterHeaders')
       }, 'begin')
       
    }

}