const navbar = {
    className: '.navbar',
    hasClass: 'navbar-fixed',
    menuClass: '[class^="navbar-links"]',
    navMenu: '.nav-menu',

    eventHandler() {
        this.componets.map(component => {
            window.onscroll = () => {
                if (component.classList.contains(this.hasClass) || component.style.position == "fixed")
                    component.style.boxShadow = (window.scrollY != 0)? "0 0 10px rgba(0, 0, 0, .3)":null
            }

            let btn = component.querySelector(this.navMenu)
            let menu = component.querySelector(this.menuClass)
            let main = document.querySelector('main')
            Array.from(menu.querySelectorAll('.nav-link')).map(link => {
                link.addEventListener('click', ()  => menu.style.left = '-105%')
            })
            btn.addEventListener('click', () => menu.style.left = 0)
            main.addEventListener('click', ()  => menu.style.left = '-105%')
        })
    },

    load() {
        this.componets = Array.from(document.querySelectorAll(this.className))
        if (this.componets.length > 0)
            this.eventHandler()
    }
}

const accordion = {
    className: "[class*='card-accordion']",
    modifier: '--multiple',
    subElement: "item",
    eventName: 'click',

    eventHandler() {
        this.componets.map(component => {
            let items = Array.from(component.querySelectorAll(`.${this.subElement}`))
            items.map(i => {
                var hasModifier = Array.from(component.classList).filter(_class => {
                    _class.includes(this.modifier)
                })

                if (hasModifier.length == 0)
                    items.map(i => {
                        i.style.maxHeight = ""
                        i.classList.remove('active')
                    })
                
                i.addEventListener(this.eventName, () => {
                    let content = i.querySelector('.item-content, .content')
                    let isMulti = Array.from(i.parentElement.classList)
                        .filter(c => c.includes(this.modifier))

                    if (isMulti.length == 0) {
                        items.map(i => {
                            i.querySelector('.item-content, .content').style.maxHeight = ""
                            i.classList.remove('active')
                        })
                    }
                    content.style.maxHeight = (content.style.maxHeight == "")? `${content.scrollHeight}px`:""
                    i.classList.toggle('active')
                })
            })
        })
    },

    load() {
        this.componets = Array.from(document.querySelectorAll(this.className))
        if (this.componets.length > 0)
            this.eventHandler()
    }
}

const paradox = {
    accordion,
    navbar
}

window.onload = () => {
    Object.entries(paradox).map(([name, component]) => {
        component.load()
    })
}
