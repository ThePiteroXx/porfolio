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

        this._selectors.lampBtn.addEventListener('click', () => {
            document.querySelector('.fa-lightbulb').classList.toggle('active')
            this.experience.world.baked.turnLight()
        })


    }
}