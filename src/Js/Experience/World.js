import * as THREE from 'three'
import Experience from './Experience.js'
import Baked from './Baked.js'
import Screen from './Screen.js'
import CoffeSteam from './CoffeSteam.js'


export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setBaked()
                this.setScreens()
                this.setCoffeSteam()
                
            }
        })

    }

    setBaked()
    {
        this.baked = new Baked()
    }

    setScreens() 
    {
        this.mainMonitor = new Screen(this.resources.items.mainMonitor.scene.children[0], '/assets/videoCoding.mp4')

        this.laptopMonitor = new Screen(this.resources.items.laptopMonitor.scene.children[0], '/assets/videoStream.mp4')

        this.leftMonitor = this.resources.items.leftMonitor.scene.children[0]
        this.leftMonitor.material = new THREE.MeshBasicMaterial({map: this.resources.items.leftMonitorTexture})
        this.scene.add(this.leftMonitor)

        this.painting = this.resources.items.painting.scene.children[0]
        this.painting.material = new THREE.MeshBasicMaterial({map: this.resources.items.paintingTexture})
        this.scene.add(this.painting)
    }

    setCoffeSteam()
    {
        this.coffeSteam = new CoffeSteam()
    }

    resize()
    {
    }

    update()
    {
        if(this.coffeSteam)
            this.coffeSteam.update()

        if(this.baked)
            this.baked.update()
    }

    destroy()
    {
    }
}