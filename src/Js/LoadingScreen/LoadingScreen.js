import { gsap } from 'gsap'
import Resources from "../Resources.js"
export default class LoadingScreen
{
    constructor()
    {
        this.resources = new Resources()
        this.tl = gsap.timeline()
        this.tl.addLabel('begin')
        this.init()
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
        const descriptionHome = document.querySelector('.home__description')
        const btnHome = document.querySelector('.home__btn')
        let descriptionImg

        //animation headers
        const spansHeader = []
        headers.forEach(header => spansHeader.push(header.children))
        spansHeader.forEach(header => {
           this.tl.fromTo(header, {opacity:0}, {opacity:1, stagger: 0.05}, 'headersAnimation')
        })
        this.tl.addLabel('afterHeaders')

        //animation description home and btn
        let spansDescriptionHome = descriptionHome.children
        this.tl.fromTo(spansDescriptionHome, {opacity:0}, {opacity:1, stagger: 0.04})
        this.tl.fromTo(btnHome, {opacity: 0}, {opacity:1, duration: 0.5})

        //animation all canvas and descriptions without home
        const sortedDesciptions = this.sortArrayOnAttribute(descriptions, 'data-description')
        sortedDesciptions.forEach(el => {
            this.tl.fromTo(el, {opacity:0}, {opacity:1, stagger: 0.3}, 'afterHeaders')
        })

        this.tl.fromTo(canvas, {opacity:0}, {opacity:1, duration: 1}, 'afterHeaders')

        //animation img work
        .add(() => {
                descriptionImg = [...document.querySelectorAll('.work__container__img-set')]
                this.tl.fromTo(descriptionImg, {opacity:0}, {opacity:1, stagger: 0.2}, 'afterHeaders')
        }, 'begin')
       
    }

    sortArrayOnAttribute(array, nameOfAttribute) {
        const sortedArray = []
        const helpfulArray = []
        array.forEach((el, index, array) => {
            helpfulArray.push(el)

            if(el.attributes[nameOfAttribute].value !== array[index + 1]?.attributes[nameOfAttribute].value)
            {
               sortedArray.push([...helpfulArray])
               helpfulArray.length = 0
            }
        })

        return sortedArray
    }

}