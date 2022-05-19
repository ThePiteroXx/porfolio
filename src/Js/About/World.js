import * as THREE from 'three'
import About from './About.js'

import SphereIcons  from './SphereIcons.js'

export default class World
{
    constructor(_options)
    {
        const about = new About()
        this.resources = about.resources
     
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