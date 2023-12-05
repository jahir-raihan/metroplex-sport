const toggle_nav = () => {

    /* Toggles Mobile nav menu */

    document.getElementById('mobile-nav').classList.toggle('d-none')
    document.getElementById('nav-ham').classList.toggle('d-none')
    document.getElementById('nav-ham-cross').classList.toggle('d-none')

}

const mobile_nav_click_check = (btn) => {
    console.log(btn)
} 
