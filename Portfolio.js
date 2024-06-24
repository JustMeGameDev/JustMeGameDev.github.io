document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
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
        const category = project.querySelector('category')?.textContent; // This pulls the category from your XML
        const description = project.querySelector('description')?.textContent;
        const engineImg = project.querySelector('engine')?.textContent;
        const coverImg = project.querySelector('cover')?.textContent;
        const images = Array.from(project.querySelectorAll('images image')).map(img => img.textContent);
        const badges = project.querySelectorAll('badges badge');
        const github = project.querySelector('links github')?.textContent;
        const itch = project.querySelector('links itch')?.textContent;
        const pdf = project.querySelector('links pdf')?.textContent;

        // Skip if essential fields are missing
        if (!title || !description || !engineImg || !coverImg) return;

        let cardHtml = `<div class="project-card" data-category="${category}">
                            ${engineImg ? `<img src="${engineImg}" class="engine-badge" alt="Engine Badge">` : ''}
                            <div class="badges-container">`;
        badges.forEach(badge => {
            cardHtml += `<span class="badge" style="background-color:${badge.getAttribute('color')}">${badge.textContent}</span>`;
        });
        cardHtml += `    </div>
                        <h3>${title}</h3>
                        <img src="${coverImg}" class="cover-image">
                        <p>${description}</p>
                        ${pdf ? `<a href="${pdf}" target="_blank"><i class="fa-regular fa-file-pdf"></i></a>` : ''}
                        <div class="project-links">
                        ${github ? `<a href="${github}" target="_blank"><i class="fa-brands fa-github"></i></a>` : ''}
                        ${itch ? `<a href="${itch}" target="_blank"><i class="fa-brands fa-itch-io"></i></a>` : ''}
                        </div>
                        ${images.length > 0 ? `<button class="show-more" onclick="showSlideshow(${images.map(img => `'${img}'`).join(', ')})">Show More</button>` : ''}
                        </div>`; // Close project-card div

        container.innerHTML += cardHtml;
    })
    }

function showSlideshow(images) {
    // Check if images is a string and convert it to an array
    if (typeof images === 'string') {
        images = [images]; // Convert single image URL to an array
    }

    // Proceed only if images is an array
    if (!Array.isArray(images)) {
        console.error('Expected an array of images, received:', images);
        return; // Exit the function if not an array
    }

    const slideshowContainer = document.createElement('div');
    slideshowContainer.className = 'slideshow-modal';

    // Close Button for Slideshow
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.className = 'close';
    closeBtn.onclick = function() {
        slideshowContainer.style.display = 'none';
        document.body.removeChild(slideshowContainer);
    };

    // Adding images to slideshow
    images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        const img = document.createElement('img');
        img.src = imgSrc;
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    });

    document.body.appendChild(slideshowContainer);
    slideshowContainer.style.display = 'block';
}



function closeSlideshow() {
        document.querySelector('.slideshow-modal').remove();
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


