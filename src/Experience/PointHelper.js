import * as THREE from 'three'
import { gsap } from 'gsap'
import Experience from './Experience.js'
import World from './World.js'

export default class PointHelper
{
    constructor(position, text)
    {
        this.position = position
        this.text = text
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.width = this.experience.config.width
        this.height = this.experience.config.height
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.camera = this.experience.camera
        this.visiblePoint = false

        this.scale = 0

        this.createPoint()

        if(this.debug)
        {
           this.debugFolder = this.debug.addFolder({
              title: 'pointer',
              expanded: true
           })
        }
    }

    createPoint() 
    {
        this.point = document.createElement('div')
        this.point.classList.add('point')
        this.point.innerHTML = 
        `
        <div class="label"></div>
        <div class="text">${this.text}</div>
        `
        
        window.setTimeout(() => {
            document.body.appendChild(this.point)
            this.visiblePoint = true
        }, 200)

    }

    resize()
    {
        this.width = this.experience.config.width
        this.height = this.experience.config.height
    }

    update() 
    {
        const screenPosition = this.position.clone()
        screenPosition.project(this.camera.modes.default.instance)

        const translateX = screenPosition.x * this.width * 0.5
        const translateY = - screenPosition.y * this.height * 0.5
        if(this.visiblePoint){
            if(this.scale < 1)this.scale += 0.05
            this.point.style.transform = `translate(${translateX}px, ${translateY}px) scale(${this.scale})`
        } else {
            if(this.scale > 0)this.scale -= 0.05
            this.point.style.transform = `translate(${translateX}px, ${translateY}px) scale(${this.scale})`

            if(this.scale < 0) this.point.remove()
        }
        
    }

}