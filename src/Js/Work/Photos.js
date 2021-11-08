import * as THREE from 'three'
import Work from './Work.js'

export default class Photos
{
    constructor()
    {
        this.work = new Work()
        this.scene = this.work.scene
        this.camera = this.work.camera.modes.default.instance
        this.config = this.work.config

        this.sizes = {
            mobile: 700,
            desktop: 1400
        }

        this.img = document.querySelector('.work__container__img-mainOptions')
   
        this.images = {}

        this.imageWidth = this.img.clientWidth 
        this.imageHeight = this.img.clientHeight 

        this.init()
    }

    init()
    {
        this.checkSize()
        this.setScroll()
        this.resize()
    }

    checkSize() 
    {
        const distanceY = 0;
        if(window.innerWidth < this.sizes.mobile)
        {
            
            this.createImage(
                'flyo', 
                {
                    x: 0, 
                    y: this.putDistanceY(distanceY, true), 
                    matrixX: 0,
                    matrixY: this.putDistanceY(distanceY, false)
                }
            )
            this.createImage(
                'space', 
                {
                    x:0, 
                    y: this.putDistanceY(distanceY + 0.4, true),
                    matrixX: 0,
                    matrixY: this.putDistanceY(distanceY + 0.4, false)
                }
            )
            this.createImage(
                'calculator', 
                {
                    x:0, 
                    y: this.putDistanceY(distanceY + 0.8, true),
                    matrixX: 0,
                    matrixY: this.putDistanceY(distanceY + 0.8, false)
                }
            )
            this.createImage(
                'tetris', 
                {
                    x:0, 
                    y: this.putDistanceY(distanceY + 1.2, true),
                    matrixX: 0,
                    matrixY: this.putDistanceY(distanceY + 1.2, false)
                }
            )
        }
        else if(window.innerWidth < this.sizes.desktop)
        {
            this.createImage(
                'flyo', 
                {
                    x: this.putDistanceX(-0.22, true), 
                    y: this.putDistanceY(distanceY, true), 
                    matrixX: this.putDistanceX(-0.22, false),
                    matrixY: this.putDistanceY(distanceY, false)
                }
            )
            this.createImage(
                'space', 
                {
                    x: this.putDistanceX(0.22, true),
                    y: this.putDistanceY(distanceY, true), 
                    matrixX: this.putDistanceX(0.22, false), 
                    matrixY: this.putDistanceY(distanceY, false)
                }
            )
            this.createImage(
                'calculator', 
                {
                    x: this.putDistanceX(-0.22, true), 
                    y: this.putDistanceY(0.35, true), 
                    matrixX: this.putDistanceX(-0.22, false), 
                    matrixY: this.putDistanceY(0.35, false)
                }
            )
            this.createImage(
                'tetris', 
                {
                    x: this.putDistanceX(0.22, true), 
                    y: this.putDistanceY(0.35, true), 
                    matrixX: this.putDistanceX(0.22, false), 
                    matrixY: this.putDistanceY(0.35, false)
                }
            )
        }
        else
        {
            this.createImage(
                'flyo', 
                {
                    x: this.putDistanceX(-0.3, true), 
                    y: this.putDistanceY(-0.1, true), 
                    matrixX: this.putDistanceX(-0.3, false),
                    matrixY: this.putDistanceY(-0.1, false)
                }
            )
            this.createImage(
                'space', 
                {
                    x: this.putDistanceX(0, true),
                    y: this.putDistanceY(-0.1, true), 
                    matrixX: this.putDistanceX(0, false), 
                    matrixY: this.putDistanceY(-0.1, false)
                }
            )
            this.createImage(
                'calculator', 
                {
                    x: this.putDistanceX(0.3, true), 
                    y: this.putDistanceY(-0.1, true), 
                    matrixX: this.putDistanceX(0.3, false), 
                    matrixY: this.putDistanceY(-0.1, false)
                }
            )
            this.createImage(
                'tetris', 
                {
                    x: this.putDistanceX(-0.3, true), 
                    y: this.putDistanceY(0.35, true), 
                    matrixX: this.putDistanceX(-0.3, false), 
                    matrixY: this.putDistanceY(0.35, false)
                }
            )
        }
    }

    createImage(name, {...position})
    {
        //create image webgl
        const geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
        const material = new THREE.MeshBasicMaterial({color: 'blue'})
        const mesh = new THREE.Mesh(geometry, material)
        // mesh.position.set(position.x, - position.y)
        mesh.scale.x = this.imageWidth / 100
        mesh.scale.y = this.imageHeight / 100
        this.scene.add(mesh)
        
        //create img dom 
        const container = document.querySelector('.work__container')
        const imgSet = document.createElement('div')
        const imgIn = document.createElement('div')
        
        imgSet.classList.add('work__container__img-set')
        imgIn.classList.add('work__container__img-in')
        
        // imgSet.style.transform = `matrix(1,0,0,1,${position.matrixX},${position.matrixY})`
        imgIn.style.width = `${this.imageWidth}px`
        imgIn.style.height = `${this.imageHeight}px`
        
        imgSet.appendChild(imgIn)
        container.appendChild(imgSet)
        
        const style = getComputedStyle(imgSet)
        const matrix = new WebKitCSSMatrix(style.transform)
        const cloneMeshPosition = mesh.position.clone()

        this.images[name] = {}
        this.images[name].mesh = mesh
        this.images[name].cloneMeshPosition = cloneMeshPosition
        this.images[name].domElement = imgSet
        this.images[name].matrix = matrix
    }

    putDistanceY(y, boolean)
    {
        //if boolean == true calculate y position of webgl object
        // if boolean == false calculate y position dom element
        if(boolean)
        {
           return y * this.config.height /100
        }
        return this.config.height * (y + 0.5)
    }

    putDistanceX(x, boolean)
    {
        if(boolean)
        {
           return this.config.width * x / 100
        }
        return this.config.width * x
    }

    setScroll()
    {
        this.scroll = {}
        this.scroll.position = 0
        this.scroll.speed =0
      

        window.addEventListener('wheel', (e)=>{
            this.scroll.speed -= e.deltaY * 0.04
        })

        // on mobile
        let start = 0
        const touchStart = (event) => 
        {
            start = event.touches[0].pageY
        }
        
        const touchMove = (event) =>
        {
            const offset = start - event.touches[0].pageY
            this.scroll.speed -= offset * 0.08
            start = event.touches[0].pageY
        }

        window.addEventListener("touchstart", touchStart, false)
        window.addEventListener("touchmove", touchMove, false)
    }

    resize()
    {

        this.imageWidth = this.img.clientWidth 
        this.imageHeight = this.img.clientHeight 

        let imagesLength = 0
        const keys = []

        for(const key in this.images) {
            //fit images 
            this.images[key].mesh.scale.x = this.imageWidth / 100
            this.images[key].mesh.scale.y = this.imageHeight / 100

            //update styles images
            this.images[key].domElement.children[0].style.width = `${this.imageWidth}px`
            this.images[key].domElement.children[0].style.height = `${this.imageHeight}px`
            

            imagesLength++
            if(keys[imagesLength] !== key) keys.push(key)
            
        }

        /*
        *   UPDATE DISTANCE IN TERM OF SIZE VIEW PORT
        */
        let distanceY = 0
        let distanceX = 0
        
        for(let i = 0; i < imagesLength; i++)
        {
            if(window.innerWidth < this.sizes.mobile)
            {
                //update position y
                
                this.images[keys[i]].matrix.f = this.putDistanceY(distanceY, false)
                this.images[keys[i]].cloneMeshPosition.y = - this.putDistanceY(distanceY, true)
                distanceY += 0.4
                //update position x
                this.images[keys[i]].matrix.e = this.putDistanceX(distanceX, false)
                this.images[keys[i]].cloneMeshPosition.x = this.putDistanceY(distanceX, true)

                if(window.innerHeight < 450 && window.innerWidth)
                {
                    distanceY += 0.3
    
                    if(window.innerHeight < 260) distanceY += 0.3
                }
            }
            else if(window.innerWidth < this.sizes.desktop)
            {
                if(i % 2) {
                    //update position y
                    this.images[keys[i]].matrix.f = this.putDistanceY(distanceY, false)
                    this.images[keys[i]].cloneMeshPosition.y = - this.putDistanceY(distanceY, true)
                    distanceY += 0.45
                    //update position x
                    distanceX = 0.22
                    this.images[keys[i]].matrix.e = this.putDistanceX(distanceX, false)
                    this.images[keys[i]].cloneMeshPosition.x = this.putDistanceX(distanceX, true)
                    
                    if(window.innerHeight < 450 && window.innerWidth)
                    {
                        distanceY += 0.3
                        if(window.innerHeight < 260) distanceY += 0.3
                    }
                } else {
                    //update position y
                    this.images[keys[i]].matrix.f = this.putDistanceY(distanceY, false)
                    this.images[keys[i]].cloneMeshPosition.y = - this.putDistanceY(distanceY, true)
                    //update position x
                    distanceX = - 0.22
                    this.images[keys[i]].matrix.e = this.putDistanceX(distanceX, false)
                    this.images[keys[i]].cloneMeshPosition.x = this.putDistanceX(distanceX, true)
                }
                
                
            }
            else
            {
                if(!(i % 3) && i !== 0)
                { 
                    distanceY += 0.45

                    if(window.innerHeight < 450)
                    {
                        distanceY += 0.3
                        if(window.innerHeight < 260) distanceY += 0.3
                    
                    }
                }
                if(!(i % 3)) distanceX = -0.3
        
                //update position y
                this.images[keys[i]].matrix.f = this.putDistanceY(distanceY, false)
                this.images[keys[i]].cloneMeshPosition.y = - this.putDistanceY(distanceY, true)
                //update position x
                this.images[keys[i]].matrix.e = this.putDistanceX(distanceX, false)
                this.images[keys[i]].cloneMeshPosition.x = this.putDistanceX(distanceX, true)
                distanceX += 0.3
                
            }

        }

    }

    update()
    {
      
        this.scroll.position += this.scroll.speed
        this.scroll.speed *= 0.9
        
        for(const key in this.images) {
            const imgSet = this.images[key].domElement
            const imgIn = imgSet.children[0]

            const matrix = this.images[key].matrix
            
            imgIn.style.transform = `matrix(1,0,0,1, ${- this.imageWidth / 2}, ${- this.imageHeight / 2})`
            
            imgSet.style.transform = `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f + this.scroll.position})`

            const clonePosition = this.images[key].cloneMeshPosition
            
            this.images[key].mesh.position.y = clonePosition.y - this.scroll.position / 100
            this.images[key].mesh.position.x = clonePosition.x
        }
    }
}