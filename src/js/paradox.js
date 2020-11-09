const paradox = {
    accordion
}

Object.entries(paradox).map(([name, component]) => {
    component.load()
})