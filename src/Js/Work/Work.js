import * as THREE from 'three'

import Time from '../Utils/Time.js'

import Resources from '../Resources.js'

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
        this.setConfig()
        this.resources = new Resources()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.sizes.on('resize', () =>
        {
            this.resize()
        })
    }

    
    setConfig()
    {
        this.config = {}

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        this.config.width = this.sizes.viewport.width
        this.config.height = this.sizes.viewport.height

        this.config.scrollRender = false
        
    }

    update()
    {
        this.renderer.update()

        this.camera.update()

        if(this.world)
            this.world.update()
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