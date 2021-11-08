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
        const screenLoad = document.querySelector('.loader')
        const loaderProgress = document.querySelector('.loader-strip-progress')

        this.resources.on('progress', (_progress) =>
        {
            const progress = _progress.loaded / _progress.toLoad
            loaderProgress.style.transform = `scaleX(${progress})`

            if(progress === 1)
            {
                gsap.fromTo(screenLoad, {x: 0}, {x: '100%', ease: 'power3.in' ,duration: 0.6})

            }
            
        })
    }

}