import * as THREE from 'three'
import About from './About.js'

import SphereIcons  from './SphereIcons.js'

export default class World
{
    constructor(_options)
    {
        this.about = new About()
        this.resources = this.about.resources
        this.config = this.about.config
        this.scene = this.about.scene
        this.time = this.about.time
     
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setSphereIcons()

            }
        })

    }

    setSphereIcons()
    {
        this.sphereIcons = new SphereIcons()
    }
   

    resize()
    {
    }

    update()
    {   
        if(this.sphereIcons)
            this.sphereIcons.update()
    }

    destroy()
    {
        this.sphereIcons = null
    }
}