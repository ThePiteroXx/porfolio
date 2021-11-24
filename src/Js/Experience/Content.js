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
    }

    setFunctions()
    {
       
    }

    setListeners()
    {

        this._selectors.lampBtn.addEventListener('click', () => {
            document.querySelector('.fa-lightbulb').classList.toggle('active')
            this.experience.world.baked.turnLight()
        })


    }
}