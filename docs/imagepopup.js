document.addEventListener("DOMContentLoaded", function () {
    // Arrays of image URLs
    const images = [
        "Img/EgyptianRatScrew.png",
        "Img/EgyptianRatScrewCode.png",
        "Img/ERSGui.png"
    ];
    const images2 = [
        "Img/GameLoadScreen.png",
        "Img/GameWorld.png",
        "Img/GameBattle.png",
        "Img/GameUpdate.png",
        "Img/GameCodeMusic.png",
        "Img/GameScript.png"
    ];
    const images3 = [
        "Img/DisabilityGame.png",
        "Img/DisabilityGame2.png",
        "Img/DisabilityCode.png"
    ];
    const images4 = [
        "Img/TriviaGame.png",
        "Img/TriviaCode.png",
        "Img/Triviacode2.png",
        "Img/TriviaCode3.png",
        "Img/TriviaCode4.png"
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

    // Function to show popup with image and GitHub link
    function showPopupWithImage(imageUrl, gitHubLink, gitHubLogo, textContent) {
        if (images.includes(imageUrl)) {
            currentImages = images; // Set currentImages to the first set
            currentImageIndex = images.indexOf(imageUrl); // Set index to the clicked image
        } else if (images2.includes(imageUrl)) {
            currentImages = images2; // Set currentImages to the second set
            currentImageIndex = images2.indexOf(imageUrl); // Set index to the clicked image
        } else if(images3.includes(imageUrl)) {
            currentImages = images3;
            currentImageIndex = images3.indexOf(imageUrl);
        } else if(images4.includes(imageUrl)) {
            currentImages = images4;
            currentImageIndex = images4.indexOf(imageUrl);
        }
        updateImage(); // Update the image displayed

        // Update GitHub link and logo
        const linkGit = document.getElementById("linkGit");
        linkGit.href = gitHubLink;
        document.getElementById("githubPopup").src = gitHubLogo;

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
                const gitHubLink = this.getAttribute("github-Link"); // Retrieve the GitHub link
                const gitHubLogo = this.getAttribute("github-image"); // Retrieve the GitHub logo image
                const textContent = this.getAttribute("data-text"); // Retrieve the text content for the second box

                showPopupWithImage(imageURL, gitHubLink, gitHubLogo, textContent); // Show the popup with the clicked image, GitHub link, and text content
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
