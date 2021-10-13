export default class DOM
{
    constructor()
    {
        this._selectors = {}
        this._functions = {}
        this._listeners = {}

        window.onload = this.init()
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
    }

    setFunctions()
    {
        
    }

    setListeners()
    {
        this._selectors.navBtn.addEventListener('touchstart', () =>  this._selectors.navBtn.classList.toggle('active'))
    }
}