document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
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
            // Update tooltip position as user moves over the header image
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

    // Run the function on load and on resize
    updateSpaceshipTitle();
    window.addEventListener('resize', updateSpaceshipTitle);
});
function switchLanguage(lang) {
    localStorage.setItem('userLang', lang); // Save the language preference
    loadLanguageProjects(lang); // Load and render projects for the selected language
    applyTranslations(lang); // Update static text according to the selected language

    // Ensure category selection persists across language changes
    const selectedCategory = localStorage.getItem('selectedCategory') || 'all'; // Default to 'all' if none selected
    filterProjects(selectedCategory); // Re-apply the category filter after loading projects
}



document.addEventListener('DOMContentLoaded', function() {
    const defaultLang = localStorage.getItem('userLang') || 'en';
    switchLanguage(defaultLang); // Load initial language data on document ready
});

// Add event listeners to language switch buttons in your HTML
document.getElementById('switchToEnglish').addEventListener('click', function() {
    switchLanguage('en');
});

document.getElementById('switchToDutch').addEventListener('click', function() {
    switchLanguage('nl');
});
function loadLanguageProjects(lang) {
    const filepath = `./${lang}/portfolio_${lang}.xml`;

    fetch(filepath)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const projects = data.getElementsByTagName('project');
            renderProjects(projects); // Rerender projects with new language data
            const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
            filterProjects(selectedCategory); // Ensure filtering is applied after projects are loaded
        })
        .catch(err => console.error('Error loading the XML file:', err));
}

function applyTranslations(lang) {
    const filepath = `./${lang}/portfolio_${lang}.xml`; // Make sure this is the correct path

    fetch(filepath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");

            if (xmlDoc.getElementsByTagName("parsererror").length) {
                throw new Error("Error parsing XML.");
            }

            updateTextContent(xmlDoc);
        })
        .catch(err => console.error('Error loading or parsing the translation file:', err));
}

function updateTextContent(xmlDoc) {
    var currentYear = new Date().getFullYear();
    var previousYear = 2023;
    var yearText = `${previousYear}-${currentYear}`; // Generates "2023-2024"

    var translations = xmlDoc.getElementsByTagName("translation");
    document.querySelectorAll("[data-translation-id]").forEach(element => {
        const key = element.getAttribute('data-translation-id');
        const translationNode = Array.from(translations).find(tr => tr.getAttribute('id') === key);
        if (translationNode) {
            var text = translationNode.textContent.replace('{year}', yearText);
            element.textContent = text;
        }
    });

    // This handles elements that have their IDs directly matched with translations
    document.querySelectorAll("[id]").forEach(element => {
        const key = element.getAttribute("id");
        const node = xmlDoc.querySelector(`translation[id="${key}"]`);
        if (node) {
            var text = node.textContent.replace('{year}', yearText);
            element.innerHTML = text;
        }
    });
}






function filterProjects(category) {
    localStorage.setItem('selectedCategory', category); // Save the current category
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (project.dataset.category === category || category === 'all') {
            project.style.display = 'block'; // Show the project card
        } else {
            project.style.display = 'none'; // Hide the project card
        }
    });
}

function loadProjects() {
    const lang = localStorage.getItem('userLang') || 'en';
    const filepath = `./${lang}/portfolio_${lang}.xml`;  // Ensure this path is accurate

    fetch(filepath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch XML: ' + response.statusText);
            }
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "text/xml");
            if (xmlDoc.getElementsByTagName("parsererror").length) {
                throw new Error('Error parsing XML.');
            }
            return xmlDoc;
        })
        .then(xmlDoc => {
            console.log('Parsed XML:', xmlDoc);  // Check parsed XML structure in console
            const projects = xmlDoc.getElementsByTagName('project');
            console.log('Projects found:', projects.length);  // Should show the number of projects
            renderProjects(projects);
        })
        .catch(err => console.error('Error in XML operations:', err));
}



function renderProjects(projects) {
    const container = document.getElementById('project-container');
    container.innerHTML = '';  // Clear previous content
    Array.from(projects).forEach(project => {
        const title = project.querySelector('title')?.textContent;
        const category = project.querySelector('category')?.textContent;
        const description = project.querySelector('description')?.textContent;
        const engineImg = project.querySelector('engine')?.textContent;
        const coverImg = project.querySelector('cover')?.textContent;
        const images = Array.from(project.querySelectorAll('images image')).map(img => img.textContent);
        const github = project.querySelector('links github')?.textContent;
        const itch = project.querySelector('links itch')?.textContent;

        // Skip if essential fields are missing
        if (!title || !description || !engineImg || !coverImg) return;

        let cardHtml = `<div class="project-card" data-category="${category}">
                            ${engineImg ? `<img src="${engineImg}" class="engine-badge" alt="Engine Badge">` : ''}
                            <div class="badges-container">`;
        const badges = project.querySelectorAll('badges badge');
        badges.forEach(badge => {
            cardHtml += `<span class="badge" style="background-color:${badge.getAttribute('color')}">${badge.textContent}</span>`;
        });
        cardHtml += `    </div>
                        <h3>${title}</h3>
                        <img src="${coverImg}" class="cover-image">
                        <p>${description}</p>
                        <div class="project-links">
                        ${github ? `<a href="${github}" target="_blank"><i class="fa-brands fa-github"></i></a>` : ''}
                        ${itch ? `<a href="${itch}" target="_blank"><i class="fa-brands fa-itch-io"></i></a>` : ''}
                        </div>
                        ${images.length > 0 ? `<button class="show-more" onclick="showSlideshow(${images.map(img => `'${img}'`).join(', ')})">Show More</button>` : ''}
                        </div>`; // Close project-card div

        container.innerHTML += cardHtml;
    });
}

let currentSlideIndex = 0; // Start with the first slide

function showSlideshow(...mediaUrls) {
    // Remove any existing slideshow container
    const existingSlideshow = document.querySelector('.slideshow-modal');
    if (existingSlideshow) existingSlideshow.remove();

    // Create slideshow container
    const slideshowContainer = document.createElement('div');
    slideshowContainer.className = 'slideshow-modal';

    // Close button
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×'; // Close symbol
    closeBtn.className = 'slideshow-close';
    closeBtn.onclick = function () {
        slideshowContainer.style.display = 'none'; // Hide the modal
        slideshowContainer.remove(); // Remove it from the DOM
    };
    slideshowContainer.appendChild(closeBtn);

    // Media items (slides)
    const slides = mediaUrls.map((url, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';

        // Detect media type (image/video)
        if (url.endsWith('.mp4') || url.endsWith('.webm')) {
            const video = document.createElement('video');
            video.src = url;
            video.controls = true;
            slide.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = url;
            slide.appendChild(img);
        }

        slideshowContainer.appendChild(slide);
        return slide;
    });

    // Previous button
    const prevBtn = document.createElement('a');
    prevBtn.className = 'slideshow-prev';
    prevBtn.innerHTML = '&#10094;'; // Left arrow symbol
    prevBtn.onclick = function () {
        showSlide(currentSlideIndex - 1); // Move to previous slide
    };

    // Next button
    const nextBtn = document.createElement('a');
    nextBtn.className = 'slideshow-next';
    nextBtn.innerHTML = '&#10095;'; // Right arrow symbol
    nextBtn.onclick = function () {
        showSlide(currentSlideIndex + 1); // Move to next slide
    };

    slideshowContainer.appendChild(prevBtn);
    slideshowContainer.appendChild(nextBtn);

    // Navigation Dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slideshow-dots';
    const dots = mediaUrls.map((url, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = function () {
            showSlide(index); // Jump to the clicked dot's corresponding slide
        };
        dotsContainer.appendChild(dot);
        return dot;
    });

    slideshowContainer.appendChild(dotsContainer);
    document.body.appendChild(slideshowContainer);
    slideshowContainer.style.display = 'flex';

    function showSlide(index) {
        // Wrap around when reaching the end or beginning
        if (index >= mediaUrls.length) index = 0; // Go to first slide if at the end
        if (index < 0) index = mediaUrls.length - 1; // Go to last slide if at the beginning
        currentSlideIndex = index;

        // Update slides' visibility
        slides.forEach((slide, i) => {
            if (i === currentSlideIndex) {
                slide.classList.add('active-slide');
                slide.classList.remove('inactive-slide');
            } else {
                slide.classList.remove('active-slide');
                slide.classList.add('inactive-slide');
            }
        });

        // Update dot indicators to reflect the current slide
        dots.forEach((dot, i) => {
            dot.className = i === currentSlideIndex ? 'dot active' : 'dot';
        });
    }

    // Show the first slide
    showSlide(0);
}




    generateStars(200); // Generate 200 stars. Adjust the number as needed.


    document.querySelectorAll('.header-img').forEach(img => {
        img.addEventListener('mouseenter', function () {
            // Get the tooltip element
            const tooltip = document.querySelector('.header-tooltip');
            // Set the tooltip text to the title of the image
            tooltip.textContent = this.title;
            // Optional: make the tooltip visible if it's hidden by default
            tooltip.style.opacity = 1;
        });

        img.addEventListener('mouseleave', function () {
            // Clear the tooltip text when not hovering
            const tooltip = document.querySelector('.header-tooltip');
            tooltip.style.opacity = 0;

            // Optional: hide the tooltip when not hovering
        });
    });

    function getRandomColor() {
        const colors = ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#E6E6FA', '#F8F8FF']; // Example star colors
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function generateStars(numberOfStars) {
        const sky = document.getElementById('starry-sky');

        for (let i = 0; i < numberOfStars; i++) {
            let star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 7}px`; // Stars size between 1px and 3px
            star.style.height = star.style.width; // Keep the star size consistent
            star.style.borderRadius = '50%';
            star.style.backgroundColor = getRandomColor();
            sky.appendChild(star);
        }
    }


