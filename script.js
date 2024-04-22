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
   const name = element.getAttribute('data-page') + ".html"
   fetch(name) // Path to your about.html file
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(err => {
            console.error('Failed to load page: ', err);
        });
}



setInterval(checkPlanetHover, 100); // Continuously check for planet hover