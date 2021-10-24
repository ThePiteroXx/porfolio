import EventEmitter from '../Utils/EventEmitter.js'

export default class Sizes extends EventEmitter
{
    /**
     * Constructor
     */
    constructor(element)
    {
        super()
        
        this.targetElemet = element
        this.desktopSize = 1400

        if(this.desktopSize > window.innerWidth)
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
        }
        else 
        {
            this.width = window.innerWidth / 2
            this.height = window.innerHeight 
        }
        
        
        // Resize event
        this.resize = this.resize.bind(this)
        window.addEventListener('resize', this.resize)

        this.resize()

    }

    /**
     * Resize
     */
    resize()
    {
        if(this.desktopSize > window.innerWidth)
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
        }
        else 
        {
            this.width = window.innerWidth / 2
            this.height = window.innerHeight 
        }


        this.trigger('resize')

    }



}