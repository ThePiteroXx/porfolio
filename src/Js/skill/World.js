import * as THREE from 'three'
import Skill from './Skill.js'

import SphereIcons  from './SphereIcons.js'

export default class World
{
    constructor(_options)
    {
        this.skill = new Skill()
        this.resources = this.skill.resources
        this.config = this.skill.config
        this.scene = this.skill.scene
        this.time = this.skill.time
     
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