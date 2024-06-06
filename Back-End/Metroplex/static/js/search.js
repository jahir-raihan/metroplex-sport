// Set min and max date in date picker


$( function() {
    $( "#date" ).datepicker({
        dateFormat: "dd MM, yy", // Display format
        altFormat: "yy-mm-dd", // Format for alt field (used for sending to server)
        altField: "#alt-date", // Hidden input field to store the altFormat value
        minDate: new Date(),
        maxDate: "+1m +1w"
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