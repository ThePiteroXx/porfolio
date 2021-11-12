import * as THREE from 'three'

import Stats from '../Utils/Stats.js'
import Time from '../Utils/Time.js'

import LoadingScreen from '../Loading/LoadingScreen.js'

import Sizes from './Sizes.js'
import World from './World.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'

export default class Work
{

    static instance

    constructor(targetElement)
    {
        
        if(Work.instance)
        {
            return Work.instance
        }
        Work.instance = this

        this.targetElement = targetElement
        

        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.sizes = new Sizes()
        this.time = new Time()
        this.resources = new LoadingScreen().resources
        this.setConfig()
        this.setStats()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setWorld()

        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.update()
    }

    init()
    {
        this.sizes = new Sizes()
        this.time = new Time()
        this.setConfig()
        this.setStats()
        this.setScene()
        this.setResources()
        this.setCamera()
        this.setRenderer()
        this.setWorld()

        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.update()
    }
    
    setConfig()
    {
        this.config = {}

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        this.config.width = this.sizes.viewport.width
        this.config.height = this.sizes.viewport.height
        
        this.config.debug = this.config.width > 420
    }

    setStats()
    {
        if(this.config.debug)
        {
            this.stats = new Stats(false)
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


    setWorld()
    {
        this.world = new World()
    }

    update()
    {
        this.renderer.update()

        this.camera.update()

        if(this.world)
            this.world.update()

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }

    resize()
    {
        // Update sizes
        this.config.width = this.sizes.width
        this.config.height = this.sizes.height

        // Update camera
        if(this.camera)
            this.camera.resize()
        
        // Update renderer
        if(this.renderer)
            this.renderer.resize()

        if(this.world)
            this.world.resize()

    }

    destructor()
    {
       
    }
}