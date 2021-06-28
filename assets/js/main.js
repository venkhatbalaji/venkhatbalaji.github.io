/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')


/*===== MENU SHOW =====*/
/* Validate if constant exists */

if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */

if(navClose){
    navClose.addEventListener('click', ()=>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/

const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})


/*==================== QUALIFICATION TABS ====================*/

const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
    tab.addEventListener('click', ()=>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach((tabContent) => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach((tab) => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/

const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) =>{
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', ()=>{
        modalViews.forEach((modalView)=>{
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/

var swiper = new Swiper(".mySwiper", {
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    mousewheel: true,
    keyboard: true,
  });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll('section[id]')
function scrollActive() {
    const scrollY = window.pageYOffset
    try {
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight
            const sectionTop = current.offsetTop - 50;
            sectionId = current.getAttribute('id')

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
            } else {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
            }
        })
    }
    catch {

    }
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 

function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollTop = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fA-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

//Contact form
const sendButton = document.getElementById('send-message');
sendButton.addEventListener('click', (e) =>{
    const numberValue = document.getElementById('contact-number').value,
          nameValue = document.getElementById('contact-name').value,
          messageValue = document.getElementById('contact-message').value,
          projectValue = document.getElementById('contact-project').value
    let numEle = document.getElementsByClassName('contact__number')
    let nameEle = document.getElementsByClassName('contact__name')
    if(!isName(nameValue.trim())){
        nameEle[0].style.display = 'block';
        return;
    }
    if(!isPhoneNumber(numberValue.trim())){
        numEle[0].style.display = 'block';
        return;
    }
    postData(numberValue, projectValue, messageValue, nameValue)
    .then((response)=>{
        console.log(response);
        if(response.status === 1 || response.status === 2){
            activeThankYouModal();
            resetValue();
        }
    });
});

let resetValue = () =>{
    const numberValue = document.getElementById('contact-number'),
          nameValue = document.getElementById('contact-name'),
          messageValue = document.getElementById('contact-message'),
          projectValue = document.getElementById('contact-project')
    let numEle = document.getElementsByClassName('contact__number')
    let nameEle = document.getElementsByClassName('contact__name')
    numberValue.value = ""
    nameValue.value = ""
    projectValue.value = ""
    messageValue.value = ""
    numEle[0].style.display = 'hide';
    nameEle[0].style.display = 'hde';
}

let isPhoneNumber = (inputNumber) =>{
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputNumber !== '' && inputNumber !== null && inputNumber !== undefined){
        if(inputNumber.match(phoneno)){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

let isName = (inputName) => {
    var alpha = /^[a-zA-Z\s-, ]+$/;  
    if(inputName !== '' && inputName !== null && inputName !== undefined ){
        if (!inputName.match(alpha)) {       
            return false;
        }
        else {
            return true;
        }
    }else{
        return false;
    }
}

let postData = async (mobileNumber, project, message, name) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "mobileNumber": mobileNumber,
      "project": project,
      "message": message,
      "name": name
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    let response = await fetch("https://data-logging-api.herokuapp.com/instert-details", requestOptions);
    return response.json();
}

const thankyoumodalViews = document.querySelectorAll('.thankyou__modal'),
      thankyoumodalCloses = document.querySelectorAll('.thankyou__modal-close')

let activeThankYouModal = () =>{
    thankyoumodalViews[0].classList.add('active-modal')
}

thankyoumodalCloses.forEach((closemodal) => {
    closemodal.addEventListener('click', ()=>{
        thankyoumodalViews.forEach((modalView)=>{
            modalView.classList.remove('active-modal')
        })
    })
})