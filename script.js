document.addEventListener('DOMContentLoaded', function() {
    // Check if the page is being accessed on GitHub Pages
    const isLivePage = window.location.hostname.includes('github.io');

    // If on GitHub Pages, force English language
    if (isLivePage) {
        loadLanguage('en');
    } else {
        // Check user's language preference in local storage or default to English
        let userLang = localStorage.getItem('userLang');
        if (!userLang) {
            userLang = 'en';
            localStorage.setItem('userLang', userLang);
        }
        loadLanguage(userLang);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const headerTooltip = document.getElementById('header-tooltip');
    const headerImages = document.querySelectorAll('.header-img');
    const spaceshipImg = document.querySelector('.header-img[title="System Overview"]');

    headerImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            headerTooltip.textContent = this.title; // Set the tooltip text based on the image title attribute
            headerTooltip.style.opacity = 1;
            headerTooltip.style.visibility = 'visible';
        });

        img.addEventListener('mousemove', function(event) {
            headerTooltip.style.top = `${event.pageY + 10}px`;
            headerTooltip.style.left = `${event.pageX}px`;
        });

        img.addEventListener('mouseleave', function() {
            headerTooltip.style.opacity = 0;
            headerTooltip.style.visibility = 'hidden';
        });
    });

    // Hamburger Menu Toggle for Mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navText = document.getElementById('nav-text');

    menuToggle.addEventListener('click', function() {
        navText.classList.toggle('open');
    });

    // Highlight the Current Page in Both Navigation Menus
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('current-page');
        }
    });

    // Update Title for Spaceship Image when in Portrait Mode
    function updateSpaceshipTitle() {
        if (window.innerWidth < window.innerHeight) {
            spaceshipImg.setAttribute('title', 'Home');
        } else {
            spaceshipImg.setAttribute('title', 'System Overview');
        }
    }

    updateSpaceshipTitle();
    window.addEventListener('resize', updateSpaceshipTitle);
});



// Immediately set the language to English when the script is loaded for the first time
loadLanguage(localStorage.getItem('userLang'));

// Event listener for language switch
document.getElementById('switchToEnglish').addEventListener('click', function() {
    loadLanguage('en');
});

document.getElementById('switchToDutch').addEventListener('click', function() {
    loadLanguage('nl');
});

function loadLanguage(lang) {
    // Store language selection in localStorage
    localStorage.setItem('userLang', lang);
    let pageName = window.location.pathname
    // Get the current HTML file name without extension
    if (pageName == "/") 
    {
        pageName = 'index';
    }
    else
    {
        pageName = window.location.pathname.split('/').pop().split('.')[0]
    }
    // Construct the filename based on the current page and language selection
    const filename = `${pageName}_${lang}.xml`;

    // Define the path using the lang directory
    const filepath = `/${lang}/${filename}`;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            applyTranslations(this.responseXML);
        } else if (this.readyState == 4 && this.status != 200) {
            console.error("Failed to load language file:", filepath); // Log an error if the file can't be loaded
        }
    };
    xhttp.open("GET", filepath, true);
    xhttp.send();
}

function applyTranslations(xmlDoc) {
    var currentYear = new Date().getFullYear();
    var previousYear = 2023;
    var yearText = `${previousYear}-${currentYear}`; // Generates "2023-2024"

    var translations = xmlDoc.getElementsByTagName("translation");
    document.querySelectorAll("[id]").forEach(element => {
        const key = element.getAttribute("id");
        var node = xmlDoc.querySelector(`translation[id="${key}"]`);
        if (node) {
            var text = node.textContent;
            text = text.replace('{year}', yearText); // Replace the placeholder with the current year range
            element.innerHTML = text;
        }
    });

    // Update tooltips
    document.querySelectorAll("[data-translation-id]").forEach(element => {
        const key = element.getAttribute("data-translation-id");
        var node = xmlDoc.querySelector(`translation[id="${key}"]`);
        if (node) {
            element.setAttribute('title', node.textContent);
        }
    });
    var resumeNode = xmlDoc.querySelector('translation[id="resumeEmbedSrc"]');
    if (resumeNode) {
        document.getElementById('resumeEmbed').src = resumeNode.textContent;
    }
}

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
        star.style.width = `${Math.random() * 7 }px`; // Stars size between 1px and 3px
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

generateStars(200); // Generate 200 stars. Adjust the number as needed.
