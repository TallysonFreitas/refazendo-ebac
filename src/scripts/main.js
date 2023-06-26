const item = document.getElementsByClassName('animation')

for(let i = 0; i < item.length; i++){
    const a = document.getElementsByClassName('animation')[i]
    const b = document.getElementsByClassName('animation__item')[i]
    a.addEventListener('mouseenter',function () {  
        b.classList.add('item-animado')
    })
    a.addEventListener('mouseleave',function () {  
        b.classList.remove('item-animado')
    })
}