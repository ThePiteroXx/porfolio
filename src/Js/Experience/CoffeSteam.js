import * as THREE from 'three'
import Experience from './Experience.js'
import vertexShader from './shaders/coffeSteam/vertexShader.glsl'
import fragmentShader from './shaders/coffeSteam/fragmentShader.glsl'

export default class CoffeSteam
{
   constructor()
   {
      this.experience = new Experience()
      this.resources = this.experience.resources
      this.debug = this.experience.debug
      this.scene = this.experience.scene
      this.time = this.experience.time

      if(this.debug)
      {
         this.debugFolder = this.debug.addFolder({
            title: 'coffeSteam',
            expanded: true
         })
      }

      this.setModel()
   }

   setModel() {
      this.model = {}

      this.model.color = '#9f9f91'

      // Material
      this.model.material = new THREE.ShaderMaterial({
         uniforms:
         {
            uTime: { value: 0},
            uTimeFrequency: { value: 0.0006 },
            uUvFrequency: { value: new THREE.Vector2(4, 3) },
            uColor: { value: new THREE.Color(this.model.color) }
         },
         vertexShader: vertexShader,
         fragmentShader: fragmentShader,
         transparent: true,
         side: THREE.DoubleSide,
         depthWrite: false
      })
      
      // Mesh
      this.model.mesh = this.resources.items.coffeSteam.scene.children[0]
      this.model.mesh.material = this.model.material
      this.scene.add(this.model.mesh)

      if(this.debug)
      {
         this.debugFolder.addInput(
            this.model.material.uniforms.uUvFrequency.value,
            'x',
            {
               min: 0.001, max:20, step: 0.001
            }
         )

         this.debugFolder.addInput(
            this.model.material.uniforms.uUvFrequency.value,
            'y',
            {
               min: 0.001, max:20, step: 0.001
            }
         )

         this.debugFolder.addInput(
            this.model.material.uniforms.uTimeFrequency,
            'value',
            {
              label: 'uTimeFrequency', min: 0.0001, max:0.005, step: 0.0001
            }
         )
      }
   }

   update()
   {
      this.model.material.uniforms.uTime.value = this.time.elapsed
   }
}