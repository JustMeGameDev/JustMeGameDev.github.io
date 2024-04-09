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
    const name = element.getAttribute('data-name'); // This should correctly extract the attribute
    tooltipArea.innerHTML = 'TRAVEL TO: '+ name || 'Unknown'; // Fallback to 'Unknown' if attribute is missing
    tooltipArea.style.opacity = '1';
}

function hideTooltip() {
    const tooltipArea = document.getElementById('tooltip-area');
    tooltipArea.style.opacity = '0';
}
function showPage(element) {
    const name =element.getAttribute('data-page') + ".html";
    window.location.href= name
}



setInterval(checkPlanetHover, 100); // Continuously check for planet hover