document.addEventListener('DOMContentLoaded', function() {
    const defaultLang = localStorage.getItem('userLang') || 'en';
    loadSkills(defaultLang);

    document.getElementById('switchToEnglish').addEventListener('click', function() {
        switchLanguage('en');
    });

    document.getElementById('switchToDutch').addEventListener('click', function() {
        switchLanguage('nl');
    });
});

function switchLanguage(lang) {
    localStorage.setItem('userLang', lang); // Save the language preference
    loadSkills(lang); // Load and render skills for the selected language
}

function loadSkills(lang) {
    const filepath = `./${lang}/skills_${lang}.xml`; // Adjust the path as needed

    fetch(filepath)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const skillSets = data.getElementsByTagName('skill-set');
            const translations = data.getElementsByTagName('translation');
            renderSkillButtons(skillSets); // Render skillset buttons
            updateTextContent(translations); // Update static text according to the selected language
        })
        .catch(err => console.error('Error loading the XML file:', err));
}

function renderSkillButtons(skillSets) {
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.innerHTML = ''; // Clear previous content

    Array.from(skillSets).forEach(skillSet => {
        const skillSetName = skillSet.querySelector('name').textContent;
        const skillSetLogo = skillSet.querySelector('logo').textContent;

        const button = document.createElement('button');
        button.className = 'skill-button';
        button.onclick = () => renderSkillSetDetails(skillSet);
        button.innerHTML = `<img src="${skillSetLogo}" alt="${skillSetName}" title="${skillSetName}" />`;

        skillsContainer.appendChild(button);
    });
}

function renderSkillSetDetails(skillSet) {
    const detailsContainer = document.getElementById('skill-details');
    detailsContainer.innerHTML = ''; // Clear previous content

    const skillSetName = skillSet.querySelector('name').textContent;

    // Create skill set title
    const skillSetTitle = document.createElement('h2');
    skillSetTitle.textContent = skillSetName;
    detailsContainer.appendChild(skillSetTitle);

    // Create separator
    const separator = document.createElement('div');
    separator.className = 'border-line';
    detailsContainer.appendChild(separator);

    const skillsList = skillSet.querySelectorAll('skills skill');

    skillsList.forEach(subSkill => {
        // Create skill title
        const subSkillName = subSkill.querySelector('name').textContent;
        const skillTitle = document.createElement('h3');
        skillTitle.textContent = subSkillName;
        detailsContainer.appendChild(skillTitle);

        // Create smaller separator
        const smallSeparator = document.createElement('div');
        smallSeparator.className = 'small-border-line';
        detailsContainer.appendChild(smallSeparator);

        // Create progress bar
        const level = subSkill.querySelector('level').textContent;
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress" style="width: ${level}%;"></div>
        `;
        detailsContainer.appendChild(progressBar);

        // Create description
        const description = subSkill.querySelector('description').textContent;
        const desc = document.createElement('p');
        desc.textContent = description;
        detailsContainer.appendChild(desc);

        const smallSeparator2 = document.createElement('div');
        smallSeparator2.className = 'small-border-line';
        detailsContainer.appendChild(smallSeparator2);

        // Create media items
        const media = subSkill.querySelectorAll('media item');
        media.forEach(item => {
            const mediaType = item.querySelector('type').textContent;
            const src = item.querySelector('src').textContent;
            const mediaDesc = item.querySelector('description').textContent;

            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'media-item';

            if (mediaType === 'image') {
                mediaDiv.innerHTML = `<img src="${src}" alt="${mediaDesc}" />`;
            } else if (mediaType === 'video') {
                mediaDiv.innerHTML = `
                    <video controls>
                        <source src="${src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            }

            detailsContainer.appendChild(mediaDiv);
        });

        // Create smaller separator after each skill
        const endSeparator = document.createElement('div');
        endSeparator.className = 'small-border-line';
        detailsContainer.appendChild(endSeparator);
    });
}

function updateTextContent(translations) {
    var currentYear = new Date().getFullYear();
    var previousYear = 2023;
    var yearText = `${previousYear}-${currentYear}`; // Generates "2023-2024"

    document.querySelectorAll("[data-translation-id]").forEach(element => {
        const key = element.getAttribute('data-translation-id');
        const translationNode = Array.from(translations).find(tr => tr.getAttribute('id') === key);
        if (translationNode) {
            var text = translationNode.textContent.replace('{year}', yearText);
            element.textContent = text;
        }
    });

    // Update the current year in the footer
    document.getElementById('currentYear').textContent = currentYear;
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
