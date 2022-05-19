import Home from './Home.js'

export default class Content
{
    constructor()
    {
        this.home = new Home()
        this._domElements = {}
        this._functions = {}
        this._listeners = {}

        // window.onload = this.init()
        document.addEventListener('DOMContentLoaded', this.init())
    }
    
    init()
    {
        this.setDomElements()
        this.setFunctions()
        this.setListeners()

    }

    setDomElements()
    {
        this._domElements.lampBtn = document.querySelector('#btnLamp')
    }

    setFunctions()
    {
       
    }

    setListeners()
    {

        this._domElements.lampBtn.addEventListener('click', () => {
            document.querySelector('.fa-lightbulb').classList.toggle('active')
            this.home.world.baked.turnLight()
        })


    }
}