import * as THREE from 'three'
import Work from './Work.js'

import Photos from './Photos.js'

export default class World
{
    constructor(_options)
    {
        this.work = new Work()
        this.resources = this.work.resources
        this.config = this.work.config
        this.scene = this.work.scene
        this.time = this.work.time
     
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.createImages()
            }
        })

    }

    createImages()
    {
        this.photos = new Photos()
    }

    resize()
    {
        if(this.photos)
         this.photos.resize()
    }

    update()
    {   
        if(this.photos)
            this.photos.update()
    }

    destroy()
    {

    }
}