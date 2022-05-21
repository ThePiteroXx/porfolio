import * as THREE from 'three'

import Time from '../Utils/Time.js'
import Resources from '../Resources.js'
import Stats from '../Utils/Stats.js'

import Sizes from './Sizes.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Navigation from './Navigation.js'


export default class Home
{
    static instance

    constructor(_options)
    {
        if(Home.instance)
        {
            return Home.instance
        }
        Home.instance = this

        // Options
        this.targetElement = _options.targetElement
        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.time = new Time()
        this.sizes = new Sizes(this.targetElement)
        this.setConfig()
        this.setStats()
        this.scene = new THREE.Scene()
        this.resources = new Resources()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.navigation = new Navigation()
        
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
        this.config.stats = window.location.hash === '#home-stats'
    }

    setStats()
    {
        if(this.config.stats)
        {
            this.stats = new Stats(true)
        }
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
