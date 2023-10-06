// disable enable modiy search section

const toggle_close = () => {
    document.getElementById('modify-search-form').classList.toggle('d-none-force')

    let elements = document.querySelectorAll('.toggle-close');
    elements.forEach( (ele) => {
        ele.classList.toggle('d-none-force')
    })
}
// end disable enable modify search section


// show hide time slots for a field with updated data

const change_arrow_and_border = (ele, id) => {
    ele.classList.toggle('c-f-h-cng-class')
    $('#c-f-contents-'+id).slideToggle()
}

// end show hide time slots for a field with updated data