import * as THREE from 'three'
import { Pane } from 'tweakpane'
import { gsap } from 'gsap'

import Time from '../Utils/Time.js'
import Resources from './Resources.js'
import Stats from '../Utils/Stats.js'

// import Sizes from './Sizes.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'


import assets from './assets.js'

export default class Skills
{
    static instance

    constructor(_options = {})
    {
        if(Skills.instance)
        {
            return Skills.instance
        }
        Skills.instance = this

        // Options
        this.targetElement = _options.targetElement
        console.log(this)
        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }
        this.time = new Time()
        // this.sizes = new Sizes(this.targetElement)
        this.setConfig()
        this.setStats()
        // this.setDebug()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setWorld()
        
        
        this.update()
    }


    setConfig()
    {
       this.config = {}
    
        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // Width and height
        const rect = this.targetElement.getBoundingClientRect()
        this.config.width = rect.width
        this.config.height = rect.height

        // Debug
        // this.config.debug = window.location.hash === '#debug'
        this.config.debug = this.config.width > 420
    }

    setStats()
    {
        if(this.config.debug)
        {
            this.stats = new Stats(false)
        }
    }

    setDebug()
    {
        if(this.config.debug)
        {
            this.debug = new Pane()
            this.debug.containerElem_.style.width = '320px'
        }
    }
    
    setScene()
    {
        this.scene = new THREE.Scene()
    }

    setCamera()
    {
        this.camera = new Camera()
    }

    setRenderer()
    {
        this.renderer = new Renderer()
    }

    setResources()
    {
        this.resources = new Resources(assets)
    }

    setWorld()
    {
        this.world = new World()
    }


    loadScreen()
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

    setContent() 
    {
        this.content = new Content()
    }

    update()
    {
        if(this.stats)
            this.stats.update()
        
            this.camera.update()
        
        if(this.world)
            this.world.update()

        if(this.renderer)
            this.renderer.update()


        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }

    resize()
    {
        // Config
        const rect = this.targetElement.getBoundingClientRect()
        this.config.width = rect.width
        this.config.height = rect.height
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)


        if(this.camera)
            this.camera.resize()

        if(this.renderer)
            this.renderer.resize()

        if(this.world)
            this.world.resize()


    }

    destroy()
    {
        
    }
}
