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
                this.createBackgroundScene()
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

    createBackgroundScene()
    {
        this.backgroundScene = {
            parameters: {
                count: 1300,
                size: 0.02,
                color: '#00c9c8'
            },
        }

        this.backgroundScene.material = new THREE.PointsMaterial({
            color: this.backgroundScene.parameters.color,
            size: this.backgroundScene.parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })
        this.backgroundScene.geometry = new THREE.BufferGeometry()
        this.backgroundScene.positions = new Float32Array(this.backgroundScene.parameters.count * 3)

        for(let i=0; i < this.backgroundScene.parameters.count; i++)
        {
            const i3 = i * 3
            this.backgroundScene.positions[i3 ] = (Math.random() - 0.5) * 23
            this.backgroundScene.positions[i3 + 1] = (Math.random() - 0.5) * 23
            this.backgroundScene.positions[i3 + 2] = (Math.random() - 1) * 3
        }

        this.backgroundScene.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.backgroundScene.positions, 3)
        )

        this.backgroundScene.points = new THREE.Points(this.backgroundScene.geometry, this.backgroundScene.material)
        this.scene.add(this.backgroundScene.points)

        this.backgroundScene.positions.needsUpdate = true; 
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

        if(this.backgroundScene)
        {
            // console.log(this.backgroundScene.geometry.attributes.position.array);
            for(let i =3; i < this.backgroundScene.parameters.count; i+=3)
            {
                this.backgroundScene.positions[i] += this.time.elapsed
            }
        }
            
    }

    destroy()
    {

    }
}