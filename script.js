
document.querySelectorAll('.orbit').forEach(orbit => {
    orbit.addEventListener('animationiteration', () => {
        console.log('A planet has completed an orbit!');
    });
});
document.querySelectorAll('.planet, .sun').forEach(element => {
    element.addEventListener('mouseenter', () => {
        // Pause animation
        element.style.animationPlayState = 'paused';
        showTooltip(element);
        // Show tooltip
    });
    element.addEventListener('mouseleave', () => {
        // Resume animation
        element.style.animationPlayState = 'running';
        hideTooltip(element);
        // Hide tooltip
    });
});

function showTooltip(element) {
    const tooltipArea = document.getElementById('tooltip-area');
    const name = element.getAttribute('data-name'); 
    const name2 = element.getAttribute('class');// This should correctly extract the attribute
    if (name2 == "sun")
    {
        tooltipArea.innerHTML = 'TRAVEL TO THE STAR: ' + name || 'Unknown'; // Fallback to 'Unknown' if attribute is missing
        tooltipArea.style.opacity = '1';
    }
    else
    {
        tooltipArea.innerHTML = 'TRAVEL TO THE PLANET: ' + name || 'Unknown'; // Fallback to 'Unknown' if attribute is missing
        tooltipArea.style.opacity = '1';

    }
}

function hideTooltip() {
    const tooltipArea = document.getElementById('tooltip-area');
    tooltipArea.style.opacity = '0';
}
function showPage(element) {
   const name = element.getAttribute('data-page') + ".html"
    document.open(name)
}

function resetStarrySky() {
    const sky = document.getElementById('starry-sky');

    // Remove all star elements
    while (sky.firstChild) {
        sky.removeChild(sky.firstChild);
    }

    // Ensure the background is set to black
    sky.style.backgroundColor = 'black';
}
function generateStars(numberOfStars) {
    const sky = document.getElementById('starry-sky');

    for (let i = 0; i < numberOfStars; i++) {
        let star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`; // Stars size between 1px and 3px
        star.style.height = star.style.width; // Keep the star size consistent
        star.style.borderRadius = '50%';
        star.style.backgroundColor = getRandomColor();
        sky.appendChild(star);
    }
}

function getRandomColor() {
    const colors = ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#E6E6FA', '#F8F8FF']; // Example star colors
    return colors[Math.floor(Math.random() * colors.length)];
}
function showPage(element) {
    const page = element.getAttribute('data-page');
    window.location.href = page + '.html';
}

document.querySelectorAll('.header-img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        // Get the tooltip element
        const tooltip = document.querySelector('.header-tooltip');
        // Set the tooltip text to the title of the image
        tooltip.textContent = this.title;
        // Optional: make the tooltip visible if it's hidden by default
        tooltip.style.opacity = 1;
    });

    img.addEventListener('mouseleave', function() {
        // Clear the tooltip text when not hovering
        const tooltip = document.querySelector('.header-tooltip');
        tooltip.style.opacity = 0;

        // Optional: hide the tooltip when not hovering
    });
});
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function ClickDrop() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.getElementById('more-images-btn').addEventListener('click', function() {
    const images = [
        'url-to-first-image.jpg', // Replace with actual image URLs
        'url-to-second-image.jpg',
        'url-to-third-image.jpg'
    ];
    let currentImageIndex = 0;

    function showNextImage() {
        const container = document.getElementById('slideshow-container');
        container.innerHTML = ''; // Clear the container

        // Create a new image element
        const img = document.createElement('img');
        img.src = images[currentImageIndex];
        img.classList.add('slide');

        // Append the new image to the container
        container.appendChild(img);

        // Use setTimeout to go to the next image after some time
        setTimeout(() => {
            img.classList.add('active-slide');
            currentImageIndex = (currentImageIndex + 1) % images.length; // Loop back to the first image
            setTimeout(showNextImage, 3000); // Show each image for 3 seconds
        }, 100); // Short delay before making image visible for transition effect
    }

    showNextImage(); // Start the slideshow
});


generateStars(200); // Generate 200 stars. Adjust the number as needed.


