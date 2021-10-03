import * as THREE from 'three'
import Experience from './Experience.js'


export default class Navigation
{
    constructor()
    {
        this.experience = new Experience()
        this.targetElement = this.experience.targetElement
        this.camera = this.experience.camera
        this.config = this.experience.config
        this.time = this.experience.time

        this.setView()
    }

    setView()
    {
      this.view = {}

      this.view.position = {}
      this.view.position.value = new THREE.Vector3(-4, 3.5, 2.5)
      this.view.position.smoothed = this.view.position.value.clone()
      this.view.position.smoothing = 0.005
      this.view.position.limits = {}
      this.view.position.limits.x = { min: -4, max: 2}
      this.view.position.limits.y = { min: -3, max: 3}
      this.view.position.limits.z = { min: -3, max: 3}
      
      this.view.target = {}
      this.view.target.value = new THREE.Vector3(0, 2.5, -2)

      
      this.view.drag = {}
      this.view.drag.delta = {}
      this.view.drag.delta.x = 0
      this.view.drag.delta.y = 0
      this.view.drag.previous = {}
      this.view.drag.previous.x = 0
      this.view.drag.previous.y = 0
      this.view.drag.sensitivity = 10


      this.view.down = (_x, _y) =>
      {
         this.view.drag.previous.x = _x
         this.view.drag.previous.y = _y
      }

      this.view.move = (_x, _y) => 
      {
         this.view.drag.delta.x += _x - this.view.drag.previous.x 
         this.view.drag.delta.y += _y - this.view.drag.previous.y 

         this.view.drag.previous.x = _x
         this.view.drag.previous.y = _y
      }

      this.view.up = () => 
      {

      }


      /**
       * Mouse events
       */

      this.view.onMouseMove = (_event) => {
         this.view.move(_event.clientX, _event.clientY)
      }


      window.addEventListener('mousemove', this.view.onMouseMove)

      /**
       * Touched event
       */
      this.view.onTouchStart = (_event) =>
      {
         _event.preventDefault()

         this.view.drag.alternative = _event.touches.length > 1

         this.view.down(_event.touches[0].clientX, _event.touches[0].clientY)

         window.addEventListener('touchend', this.view.onTouchEnd)
         window.addEventListener('touchmove', this.view.onTouchMove)
      }

      this.view.onTouchMove = (_event) =>
      {
         _event.preventDefault()
         
         this.view.move(_event.touches[0].clientX, _event.touches[0].clientY)
      }

      this.view.onTouchEnd = (_event) =>
      {
         _event.preventDefault()
         
         this.view.up()

         window.removeEventListener('touchend', this.view.onTouchEnd)
         window.removeEventListener('touchmove', this.view.onTouchMove)
      }

      window.addEventListener('touchstart', this.view.onTouchStart)
    }

    update()
    {
      this.view.position.value.x += this.view.drag.delta.x * this.view.drag.sensitivity / this.config.smallestSide

      this.view.drag.delta.x = 0
      this.view.drag.delta.y = 0

      // Apply limits
      this.view.position.value.x = Math.min(Math.max(this.view.position.value.x, this.view.position.limits.x.min), this.view.position.limits.x.max)

      //Smoothing
      this.view.position.smoothed.x += (this.view.position.value.x - this.view.position.smoothed.x) * this.view.position.smoothing

      this.camera.modes.default.instance.position.copy(this.view.position.smoothed)
      this.camera.modes.default.instance.lookAt(this.view.target.value)
    }
}