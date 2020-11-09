window.onload = () => {

    const nav = document.querySelector('.navbar')
    window.onscroll = () => {
        /** nav-fixed effect */
        if (nav != null && nav != undefined) {
            value = (this.scrollY != 0) ? "0 0 10px rgba(0,0,0,.3)" : "none";
            if(nav.classList.contains('navbar-fixed') || nav.style.position == "fixed") nav.setAttribute('style', `box-shadow:${value}`)
        }
    }

    /** SideNav */
    if (nav != null && nav != undefined) {
        if (nav.querySelector('.btn-menu') != null) {
            nav.querySelector('.btn-menu').addEventListener('click', () => {
            nav.querySelector('.links').style.left = 0
        });
        }
        document.querySelector('main').addEventListener('click', () => {
            nav.querySelector('.links').style.left = "-105%"
        });
    }

    /** SubDropdowns */
    const subDropdowns = document.querySelectorAll('.dropdown-items .dropdown-items');
    subDropdowns.forEach(item => {
        const parent = item.parentElement.parentElement
        const pWidth = item.parentElement.clientWidth - 5
        const wMiddle = window.screen.width / 2
        const side = (parent.getBoundingClientRect().left <= wMiddle)? 'right':'left';
        var space = pWidth + (item.clientWidth - parent.clientWidth)
        space += (side == 'right')? 20:10;
        item.setAttribute('style', `${side}: -${space}px`)
    });

    // hide
    /** Buttons State */
    var buttons = document.querySelectorAll('a[toggle], button[toggle]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        })
    })

    /** Square Box */
    this.squareBoxs()
    window.onresize = () => {
        this.squareBoxs()
    }
}

function squareBoxs() {  
    boxs = document.querySelectorAll('.--square')
    boxs.forEach(box => {
        box.setAttribute('style', `min-height:${box.clientWidth}px`)
    });
}