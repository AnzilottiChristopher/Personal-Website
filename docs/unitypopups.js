document.addEventListener("DOMContentLoaded", function () {
    // Arrays of image URLs
    const images = [
        "Img/UEgyptianWarGame.jpg",
        "Img/UEgyptianWarGame2.jpg",
        "Img/UEgyptianWarCode.jpg",
        "Img/UEgyptianWarCode2.jpg"
    ];
    const images2 = [
        "Img/MetroidvaniaGame.jpg",
        "Img/MetroidvaniaCode.jpg",
        "Img/MetroidvaniaCode2.jpg"
    ];
    const images3 = [
        "Img/FlappyBirdGame.jpg",
        "Img/FlappyBirdcode.jpg"
    ];
    let currentImageIndex = 0; // Track the current image index
    let currentImages = []; // Track the current set of images
    const popup = document.getElementById("popup");

    // Function to update the image displayed
    function updateImage() {
        const popupImage = document.getElementById("popup-img");
        popupImage.src = currentImages[currentImageIndex]; // Update image based on the current index
    }

    // Event listeners for arrows
    document.getElementById("prevImage").addEventListener("click", function () {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length; // Cycle back
        updateImage();
    });

    document.getElementById("nextImage").addEventListener("click", function () {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length; // Cycle forward
        updateImage();
    });

    // Function to show popup with image
    function showPopupWithImage(imageUrl, textContent) {
        if (images.includes(imageUrl)) {
            currentImages = images; // Set currentImages to the first set
            currentImageIndex = images.indexOf(imageUrl); // Set index to the clicked image
        } else if (images2.includes(imageUrl)) {
            currentImages = images2; // Set currentImages to the second set
            currentImageIndex = images2.indexOf(imageUrl); // Set index to the clicked image
        } else if (images3.includes(imageUrl)) {
            currentImages = images3; // Set currentImages to the third set
            currentImageIndex = images3.indexOf(imageUrl); // Set index to the clicked image
        }
        updateImage(); // Update the image displayed

        // Set the content for the second box
        const popupText = document.getElementById("popup-text");
        popupText.textContent = textContent;

        popup.style.display = "block"; // Show the popup
    }

    // Ensure gridItems is properly selected before adding event listeners
    const gridItems = document.querySelectorAll(".timeline-content");
    if (gridItems.length > 0) {
        gridItems.forEach(function (item) {
            item.addEventListener("click", function () {
                const imageURL = this.getAttribute("data-image");
                const textContent = this.getAttribute("data-text"); // Retrieve the text content for the second box

                showPopupWithImage(imageURL, textContent); // Show the popup with the clicked image and text content
            });
        });
    } else {
        console.log("No grid items found.");
    }

    // Close functionality for popup
    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
        popup.style.display = "none"; // Hide the popup
    };

    window.onclick = function (event) {
        if (event.target == popup) {
            popup.style.display = "none"; // Hide the popup if clicked outside
        }
    };
});
