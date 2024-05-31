
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
// JavaScript code to update the year dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Get the current year
    var currentYear = new Date().getFullYear();

    // Get the HTML element by its ID
    var yearElement = document.getElementById('currentYear');

    // Update the text content of the element
    yearElement.textContent = currentYear;
});
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

window.onload = function() {
    var modal = document.getElementById("constructionModal");
    var span = document.getElementsByClassName("close-btn")[0];

    // Show the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

generateStars(200); // Generate 200 stars. Adjust the number as needed.


