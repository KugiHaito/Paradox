const accordion = {
    className: "[class*='card-accordion']",
    modifier: '--multi',
    subElement: ".item",
    eventName: 'click',

    eventHandler() {
        this.componets.map(component => {
            let items = Array.from(component.querySelectorAll(`.${this.subElement}`))
            items.map(i => {
                var hasModifier = Array.from(component.classList).filter(_class => {
                    _class.includes(this.modifier)
                })

                if (hasModifier.length == 0)
                    items.map(i => i.style.maxHeight = null)
                
                i.addEventListener(this.eventName, () => {
                    let content = i.querySelector('.item-content, .content')
                    let isMulti = Array.from(i.parentElement.classList)
                        .filter(c => c.includes(this.modifier))

                    if (isMulti.length == 0)
                        items.map(i => i.style.maxHeight = null)
                    content.style.maxHeight = content.scrollHeight
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
