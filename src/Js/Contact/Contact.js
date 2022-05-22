import emailjs from '@emailjs/browser'

emailjs.init(process.env.PUBLIC_EMAIL_KEY)
console.log(proccess.env.PUBLIC_EMAIL_KEY)

const form =  document.querySelector('#contact-form')
const formButton = document.querySelector('#contact-btn')
const formEmail = document.querySelector('#contact-email')
const formName = document.querySelector('#contact-name')
const formMessage = document.querySelector('#contact-msg') 
const communique = document.querySelector('#contact-communique')

export default class Contact {
  constructor() 
  {
    formButton.addEventListener('click', (e) => this.onSubmitForm(e))
  }

  onSubmitForm(e) 
  {
    e.preventDefault()

    const { message, status } = this.checkValidationForm()

    if (status === 'error') {
      communique.textContent = message
      return
    }

    this.setLoadingButton(true)
    // send message to email
    console.log(process.env.EMAIL_SERVICE)
    emailjs.sendForm(process.env.EMAIL_SERVICE, process.env.EMAIL_TEMPLATE, form).then(
      (response) => {
        if (response.status === 200) {
          this.setLoadingButton(false)
          communique.classList.remove('error')
          communique.textContent = 'The message was sent successfully.'
        }
      },
      (error) => {
        this.setLoadingButton(false)
        communique.classList.add('error')
        communique.textContent = 'Something went wrong.'
      }
    )

    this.clearForm()
  }

  setLoadingButton(boolaen) 
  {
    // if parameter true -> disable form button
    if (boolaen) {
      formButton.disabled = true
      formButton.textContent = 'Loading...'
      formButton.classList.add('contact__btn--disabled')
    }
    // if parameter false -> enable form button
    else {
      formButton.disabled = false
      formButton.textContent = 'Send message'
      formButton.classList.remove('contact__btn--disabled')
    }
  }

  clearForm() 
  {
    formName.value = ''
    formEmail.value = ''
    formMessage.value = ''
    communique.textContent = ''
  }

  clearInvalidFields()
  {
    formName.setCustomValidity('')
    formEmail.setCustomValidity('')
    formMessage.setCustomValidity('')
    formEmail.setCustomValidity('')
  }

  checkValidationForm() 
  {
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const nameValue = formName.value
    const emailValue =  formEmail.value
    const messageValue = formMessage.value

    communique.classList.add('error')
    this.clearInvalidFields()

    if (!nameValue.length) 
    {
      formName.setCustomValidity('Empty field')
      return { message: 'Fields cannot be empty.', status: 'error' }
    } 
    else if (!emailValue.length) 
    {
      formEmail.setCustomValidity('Empty field')
      return { message: 'Fields cannot be empty.', status: 'error' }
    } 
    else if (!regexEmail.test(emailValue.toLowerCase())) 
    {
      formEmail.setCustomValidity('Invalid email')
      return { message: 'Please correct your address email.', status: 'error' }
    } 
    else if (!messageValue.length) 
    {
      formMessage.setCustomValidity('Empty field')
      return { message: 'Fields cannot be empty.', status: 'error' }
    } 
    else 
    {
      communique.classList.remove('error')
      return {
        message: '',
        status: 'success',
      }
    }
  }
}
