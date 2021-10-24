import * as THREE from 'three'
import { Pane } from 'tweakpane'
import { gsap } from 'gsap'

import Time from '../Utils/Time.js'
import Resources from './Resources.js'
import Stats from '../Utils/Stats.js'

import Sizes from './Sizes.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Navigation from './Navigation.js'
import Content from './Content.js'

import assets from './assets.js'

export default class Experience
{
    static instance

    constructor(_options = {})
    {
        if(Experience.instance)
        {
            return Experience.instance
        }
        Experience.instance = this

        // Options
        this.targetElement = _options.targetElement
        console.log(this)
        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }
        this.time = new Time()
        this.sizes = new Sizes(this.targetElement)
        this.setConfig()
        this.setStats()
        // this.setDebug()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setWorld()
        this.setNavigation()
        this.loadScreen()
        this.setContent()
        
        this.sizes.on('resize', () =>
        {
            this.resize()
        })
        
        this.update()
    }


    setConfig()
    {
       this.config = {}
    
        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // Width and height
        this.config.width = this.sizes.viewport.width
        this.config.height = this.sizes.viewport.height
        this.config.smallestSide = Math.min(this.config.width, this.config.height)
        this.config.largestSide = Math.max(this.config.width, this.config.height)

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

    setNavigation()
    {
        this.navigation = new Navigation()
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
        
        if(this.navigation)
            this.navigation.update()


        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }

    resize()
    {
        // Config
        this.config.width = this.sizes.viewport.width
        this.config.height = this.sizes.viewport.height
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
