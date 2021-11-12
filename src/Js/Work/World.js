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
                this.createHeader()
            }
        })

    }

    createImages()
    {
        this.photos = new Photos()
    }

    createHeader()
    {
        const container = document.querySelector('.work__container')
        this.header = document.createElement('h2')
        this.header.classList.add('work__container__heading')
        this.header.textContent = 'My Works'

        this.header.style.transform = `translate(-50%, ${this.photos.putDistanceY(-0.35, false)}px)`
        // this.header.style.transform = `matrix(1,0,0,1,0,${this.photos.putDistanceY(-0.35, false)})`
        container.appendChild(this.header)
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
        
        if(this.header)
            this.header.style.transform = `translate(-50%, ${this.photos.putDistanceY(-0.35, false) + this.photos.scroll.position}px)`
    }

    destroy()
    {

    }
}