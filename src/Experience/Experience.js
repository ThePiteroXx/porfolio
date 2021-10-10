import * as THREE from 'three'
import { Pane } from 'tweakpane'
import { gsap } from 'gsap'

import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/Stats.js'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Navigation from './Navigation.js'
import PointHelper from './PointHelper.js'

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

        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }
        this.time = new Time()
        this.sizes = new Sizes()
        this.setConfig()
        this.setStats()
        // this.setDebug()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setWorld()
        this.setNavigation()
        this.setPoints()
        this.clickTarget()
        this.addBasic()
        this.loadScreen()
        
        this.sizes.on('resize', () =>
        {
            this.resize()
        })
        
        this.update()
    }


    setConfig()
    {
       this.config = {}
    
        this.config.oneClick = true // Click on canvas
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
            this.stats = new Stats(true)
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

    setPoints()
    {
        this.point1 = new PointHelper(new THREE.Vector3(-2.7, 2.3, -1.3), 'Click on the lamp to turn On/Off light')
    }

    clickTarget() 
    {
        this.clickTarget = false

        
        this.targetElement.addEventListener('click', () => {
            if(!this.config.oneClick) return

            const duration = 0.7
            
            if(!this.clickTarget){
                gsap.to(this.sizes.sizeViewport, {width: '80vw', height: '100vh', duration: duration, ease: 'power4.in'})
                setTimeout(() => {
                    this.clickTarget = false
                    
                    this.point1.visiblePoint = true
                    this.point1.createPoint()
                    this.selectors.btnExit.classList.add('visible')

                }, duration * 1100)
                
            }
            
            this.clickTarget = true
            this.config.oneClick = false
        })

    }

    addBasic()
    {
        this.selectors = {}
        this.selectors.btnExit = document.querySelector('.btn-exit')
        this.selectors.loaderProgress = document.querySelector('.loader-strip-progress')
        this.selectors.screenLoad = document.querySelector('.loader')

        
        this.selectors.btnExit.addEventListener('click', () => {
            const duration = 0.7

            this.clickTarget = true
            this.point1.visiblePoint = false
            this.selectors.btnExit.classList.remove('visible')
            
            gsap.to(this.sizes.sizeViewport, {width: '60vw', height: '100vh', duration: duration, ease: 'power4.in'})
            
            setTimeout(() => {
                this.clickTarget = false
                this.config.oneClick = true

            }, duration * 1100)

        })
    }

    loadScreen()
    {

        this.resources.on('progress', (_progress) =>
        {
            const progress = _progress.loaded / _progress.toLoad
            this.selectors.loaderProgress.style.transform = `scaleX(${progress})`

            if(progress === 1)
            {
                gsap.fromTo(this.selectors.screenLoad, {x: 0}, {x: '100%', ease: 'power3.in' ,duration: 0.6})

            }
            
        })
    }



    update()
    {
        if(this.stats)
            this.stats.update()
        
            this.camera.update()
        
        if(this.world)
            this.world.update()
        
        if(this.clickTarget)
        {
            this.sizes.resize()
        }

        if(this.renderer)
            this.renderer.update()
        
        if(this.navigation)
            this.navigation.update()

        if(this.point1)
            this.point1.update()
            

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

        if(this.point1)
            this.point1.resize()
    }

    destroy()
    {
        
    }
}
