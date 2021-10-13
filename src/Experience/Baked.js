import * as THREE from 'three'

import Experience from './Experience.js'
import vertexShader from './shaders/baked/vertexShader.glsl'
import fragmentShader from './shaders/baked/fragmentShader.glsl'


export default class Baked
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.targetElement = this.experience.targetElement
        this.camera = this.experience.camera
        this.width = this.experience.config.width
        this.height = this.experience.config.height


        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'baked',
                expanded: true
            })
        }

        this.setModel()
        this.setMouse()
        this.setRaycaster()
    }

    setModel()
    {
        this.model = {}
        
        this.model.lampL = this.resources.items.deskModel.scene.children[0]
        this.model.baked = this.resources.items.deskModel.scene.children[1]
        this.model.lamp = this.resources.items.deskModel.scene.children[2]
        
        this.model.bakedTexture = this.resources.items.baked
        this.model.bakedTexture.encoding = THREE.sRGBEncoding
        this.model.bakedTexture.flipY = false
        
        this.model.bakedDarkTexture = this.resources.items.darkbaked
        this.model.bakedDarkTexture.encoding = THREE.sRGBEncoding
        this.model.bakedDarkTexture.flipY = false

        this.model.bakedLedTexture = this.resources.items.ledbaked
        this.model.bakedLedTexture.encoding = THREE.sRGBEncoding
        this.model.bakedLedTexture.flipY = false

        this.model.lampLcolorOff = new THREE.Color('#4d4747')
        this.model.lampLcolorOn = new THREE.Color('#fff194')
        this.model.lampL.material = new THREE.MeshBasicMaterial({color: this.model.lampLcolorOff})
        
        this.model.material = new THREE.ShaderMaterial({
            uniforms:
            {
                uChangeBaked: { value: false},
                uBakedTextureLight: { value: this.model.bakedTexture},
                uBakedNightTexture: { value: this.model.bakedDarkTexture },
                uLightMapTexture: { value: this.model.bakedLedTexture },
                uLightColor: { value: new THREE.Vector3(0.3, 0.8, 0.8)},

                uNightMix: { value: 1 },
                uNeutralMix: { value: 0 },

                uLightDeskStrength: { value: 1.9 },

            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })
        
        this.model.baked.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.model.material
            }
        })
        this.model.lamp.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.model.material
            }
        })

        this.scene.add(this.model.baked, this.model.lampL, this.model.lamp)
        
        
    }

    setMouse() 
    {
        this.mouse = new THREE.Vector2()

        this.targetElement.addEventListener('mousemove', (event) => {
            const rect = event.target.getBoundingClientRect()
            this.mouse.x =  (event.clientX - rect.left) / this.width * 2 - 1
            this.mouse.y = - ((event.clientY - rect.top) / this.height) * 2 + 1
        })

        this.targetElement.addEventListener('touchstart', (event) => {
            const rect = event.target.getBoundingClientRect()
            this.mouse.x =  (event.touches[0].clientX - rect.left) / this.width * 2 - 1
            this.mouse.y = - ((event.touches[0].clientY - rect.top) / this.height) * 2 + 1
        }, {passive: false})
    }

    setRaycaster()
    {
        this.raycaster = new THREE.Raycaster()
        this.currentIntersect = null

        const turnLight = () => {
            
            this.targetElement.classList.toggle('clickLamp')

                if(this.targetElement.classList.contains('clickLamp'))
                {
                    this.model.material.uniforms.uChangeBaked.value = true
                    this.model.lampL.material.color = this.model.lampLcolorOn
                    this.experience.point1.visiblePoint = false

                return
                }
                this.experience.point1.visiblePoint = false
                this.model.material.uniforms.uChangeBaked.value = false 
                this.model.lampL.material.color = this.model.lampLcolorOff

        }

        this.targetElement.addEventListener('click', () => { if(this.currentIntersect) turnLight() })
        // this.targetElement.addEventListener('touchstart', turnLight, {passive: false})


    }


    update() 
    {
        //update sizes
        this.width = this.experience.config.width
        this.height = this.experience.config.height

        // changing led color
        this.model.material.uniforms.uLightColor.value.x = Math.abs(Math.sin(this.time.elapsed * 0.0009)) 
        this.model.material.uniforms.uLightColor.value.y = Math.abs(Math.cos(this.time.elapsed * 0.0008)) 
        this.model.material.uniforms.uLightColor.value.z = Math.abs(Math.sin(this.time.elapsed * 0.001)) 

        // update raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera.modes.default.instance)

        const intersect = this.raycaster.intersectObject(this.model.lamp)

        
        if(intersect.length) {
            this.currentIntersect = intersect[0]
            this.targetElement.style.cursor = "pointer"
        }else {
            this.currentIntersect = null
            this.targetElement.style.cursor = "default"
        }

    }
}