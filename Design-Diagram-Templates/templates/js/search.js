// Set min and max date in date picker
let current_date = new Date();

$( function() {
    $( "#date" ).datepicker({
        dateFormat: "dd MM, yy",
        minDate: current_date,
        maxDate: "+1m +1w",
        
    });
} );



// End Set min and max date in date picker

// Banner slider

// let index = 0;
// displayImages();
// function displayImages() {
//   let i;
//   const images = document.getElementsByClassName("banner-img");
//   console.log(images)
//   for (i = 0; i < images.length; i++) {
//     images[i].style.display = "none";
//   }
//   index++;
//   if (index > images.length) {
//     index = 1;
//   }
//   images[index-1].style.display = "block";
//   setTimeout(displayImages, 20000); 
// }

// End Banner slider