import Experience from './Experience.js'

export default class Content
{
    constructor()
    {
        this.experience = new Experience()
        this._selectors = {}
        this._functions = {}
        this._listeners = {}

        // window.onload = this.init()
        document.addEventListener('DOMContentLoaded', this.init())
    }
    
    init()
    {
        this.setSelectors()
        this.setFunctions()
        this.setListeners()

    }

    setSelectors()
    {
        this._selectors.navBtn = document.querySelector('#navBtn')
        this._selectors.navMobile = document.querySelector('#navMobile')
        this._selectors.lampBtn = document.querySelector('#btnLamp')
        this._selectors.timer = document.querySelector('#timer')
    }

    setFunctions()
    {
        this._functions.getTime = () => {
            const now = new Date()

            return {
                hour: now.getHours(),
                minute: now.getMinutes()
            }
        }
        
        this._functions.putTime = () => {
            const hour = this._functions.getTime().hour.toString()
            const minute = this._functions.getTime().minute.toString()

            this._selectors.timer.textContent = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
        }

        setInterval(() => this._functions.putTime(), 1000)
    }

    setListeners()
    {
        this._selectors.navBtn.addEventListener('click', () =>  {
            this._selectors.navBtn.classList.toggle('active')

            if(this._selectors.navBtn.classList.contains('active'))
            {
                this._selectors.navMobile.classList.add('active')
            } 
            else 
            {
                this._selectors.navMobile.classList.remove('active')
            }
        })

        this._selectors.lampBtn.addEventListener('click', () => {
            document.querySelector('.fa-lightbulb').classList.toggle('active')
            this.experience.world.baked.turnLight()
        })


    }
}