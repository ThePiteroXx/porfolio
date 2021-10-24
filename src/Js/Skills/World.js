import * as THREE from 'three'
import Skills from './Skills.js'



export default class World
{
    constructor(_options)
    {
        this.skills = new Skills()
        this.config = this.skills.config
        this.scene = this.skills.scene
        this.resources = this.skills.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setDummy()
                
            }
        })

    }

    setDummy()
    {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: '#ffffff'})
        )
        this.scene.add(cube)         
    }

  
    resize()
    {
    }

    update()
    {
        
    }

    destroy()
    {
    }
}