// Example functionality: Console log when a planet completes an orbit
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
        tooltipArea.innerHTML = 'TRAVEL TO STAR: ' + name || 'Unknown'; // Fallback to 'Unknown' if attribute is missing
        tooltipArea.style.opacity = '1';
    }
    else
    {
        tooltipArea.innerHTML = 'TRAVEL TO PLANET: ' + name || 'Unknown'; // Fallback to 'Unknown' if attribute is missing
        tooltipArea.style.opacity = '1';

    }
}

function hideTooltip() {
    const tooltipArea = document.getElementById('tooltip-area');
    tooltipArea.style.opacity = '0';
}
function showPage(element) {
   const name = element.getAttribute('data-page') + ".html";
   fetch(name) // Path to your about.html file
   .then(response => response.text())
   .then(html => {
       document.getElementById('content').innerHTML = html;
    })
    .catch(err => {
        console.error('Failed to load page: ', err);
    });
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
function resetStarrySky() {
    const sky = document.getElementById('starry-sky');

    // Remove all star elements
    while (sky.firstChild) {
        sky.removeChild(sky.firstChild);
    }

    // Ensure the background is set to black
    sky.style.backgroundColor = 'black';
}

function getRandomColor() {
    const colors = ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#E6E6FA', '#F8F8FF']; // Example star colors
    return colors[Math.floor(Math.random() * colors.length)];
}

generateStars(200); // Generate 200 stars. Adjust the number as needed.


setInterval(checkPlanetHover, 100); // Continuously check for planet hover