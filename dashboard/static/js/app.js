const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')
const filterbtn = document.querySelectorAll('.filter-btn')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

filterbtn.forEach(btn => btn.addEventListener('click', function(event) {
    event.preventDefault()
    event.target.classList.toggle('is-active')
    filterTable({ value: event.target.id, key: 'position'})
}))

