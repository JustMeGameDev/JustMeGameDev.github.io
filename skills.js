document.addEventListener('DOMContentLoaded', function() {
    const defaultLang = localStorage.getItem('userLang') || 'en';
    switchLanguage(defaultLang); // Load initial language data on document ready

    document.getElementById('switchToEnglish').addEventListener('click', function() {
        switchLanguage('en');
    });

    document.getElementById('switchToDutch').addEventListener('click', function() {
        switchLanguage('nl');
    });

    generateStars(200); // Generate stars for the background
});

let currentLang = 'en'; // Global variable to store the current language

function switchLanguage(lang) {
    localStorage.setItem('userLang', lang); // Save the language preference
    currentLang = lang; // Update the current language
    loadLanguageSkills(lang); // Load and render skills for the selected language
}

function loadLanguageSkills(lang) {
    const filepath = `./${lang}/skills_${lang}.xml`;

    fetch(filepath)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const skillSets = data.getElementsByTagName('skill-set');
            renderSkillButtons(skillSets);
            applyTranslations(lang, data); // Apply translations after loading skills
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
        button.innerHTML = `<img src="${skillSetLogo}" alt="${skillSetName}" title="${skillSetName}" />`;
        button.onclick = () => {
            renderSkillSetDetails(skillSet);
            renderTOC(skillSet);
        };

        skillsContainer.appendChild(button);
    });
}

function renderTOC(skillSet) {
    const tocContainer = document.querySelector('.toc-container');
    tocContainer.innerHTML = '<h3>Index:</h3><ul style="list-style-type: disc;">';

    const skills = skillSet.querySelectorAll('skills > skill');
    Array.from(skills).forEach(skill => {
        const skillId = skill.getAttribute('id');
        const skillName = skill.querySelector('name').textContent;
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${skillId}`;
        link.textContent = skillName;
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Voorkom de standaard hyperlinkactie
            showSkillDetail(skillId); // Pas deze functie aan om de view te beheren
        });
        listItem.appendChild(link);
        tocContainer.querySelector('ul').appendChild(listItem);
    });
}


function renderSkillSetDetails(skillSet) {
    const detailsContainer = document.getElementById('skill-details');
    detailsContainer.innerHTML = ''; // Wis eerder content

    const skills = skillSet.querySelectorAll('skills > skill');
    Array.from(skills).forEach(skill => {
        const skillDetailDiv = document.createElement('div');
        skillDetailDiv.id = skill.getAttribute('id');
        skillDetailDiv.className = 'skill-detail fade-out'; // Standaard verborgen
        skillDetailDiv.style.display = 'none'; // Verberg de div initieel

        const title = document.createElement('h3');
        title.textContent = skill.querySelector('name').textContent;
        skillDetailDiv.appendChild(title);
        skillDetailDiv.appendChild(createSeparator());

        const description = document.createElement('p');
        description.textContent = skill.querySelector('description').textContent;
        skillDetailDiv.appendChild(description);

        // Voeg de progress bar toe
        const level = skill.querySelector('level').textContent;
        const progressBar = createProgressBar(level);
        skillDetailDiv.appendChild(progressBar);

        skillDetailDiv.appendChild(createSeparator());

        const mediaItems = skill.querySelectorAll('media > item');
        const mediaList = document.createElement('div');
        mediaList.style.textAlign = "center"; // Center media items
        mediaItems.forEach(item => {
            mediaList.appendChild(createMediaItem(item));
            mediaList.appendChild(createSeparator());
        });

        skillDetailDiv.appendChild(mediaList);
        detailsContainer.appendChild(skillDetailDiv);
    });

    window.addEventListener('scroll', fadeSkillsOnScroll);

}

function showSkillDetail(skillId) {
    const skillDetails = document.querySelectorAll('.skill-detail');
    skillDetails.forEach(detail => {
        if (detail.id === skillId) {
            detail.style.display = 'block';
            detail.classList.add('fade-in');
            window.scrollTo({
                top: detail.offsetTop,
                behavior: 'smooth'
            });
        } else {
            detail.style.display = 'none';
            detail.classList.remove('fade-in');
        }
    });
}

function fadeSkillsOnScroll() {
    const skillDetails = document.querySelectorAll('.skill-detail');
    const windowHeight = window.innerHeight;

    skillDetails.forEach(detail => {
        const elementTop = detail.getBoundingClientRect().top;
        if (elementTop < windowHeight && elementTop > 0) {
            detail.classList.remove('fade-out');
            detail.classList.add('fade-in');
            detail.style.display = 'block';
        } else {
            detail.classList.remove('fade-in');
            detail.classList.add('fade-out');
        }
    });
}



function createProgressBar(level) {
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar';

    const progress = document.createElement('div');
    progress.className = 'progress';
    progress.style.width = `${level}%`;

    progressBarContainer.appendChild(progress);
    return progressBarContainer;
}

function createMediaItem(item) {
    const itemType = item.querySelector('type').textContent;
    const itemSrc = item.querySelector('src').textContent;
    const itemDescription = item.querySelector('description').textContent;

    let mediaElement;
    if (itemType === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.src = itemSrc;
        mediaElement.alt = itemDescription;
        mediaElement.style.maxWidth = '100%';
    } else if (itemType === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
        const source = document.createElement('source');
        source.src = itemSrc;
        source.type = 'video/mp4';
        mediaElement.appendChild(source);
        mediaElement.innerHTML += 'Your browser does not support the video tag.';
    }

    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'media-item';
    mediaDiv.style.margin = "0 auto"; // Center media
    mediaDiv.appendChild(mediaElement);
    const caption = createTextElement('p', itemDescription);
    caption.style.textAlign = "left"; // Left-align the text description
    mediaDiv.appendChild(caption);

    return mediaDiv;
}

function createTextElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

function createSeparator() {
    const separator = document.createElement('div');
    separator.className = 'separator';
    return separator;
}

function applyTranslations(lang, xmlDoc) {
    document.querySelectorAll("[data-translation-id]").forEach(element => {
        const key = element.getAttribute('data-translation-id');
        const translationNode = Array.from(xmlDoc.getElementsByTagName("translation")).find(tr => tr.getAttribute('id') === key);
        if (translationNode) {
            element.textContent = translationNode.textContent;
        }
    });

    const skillSets = xmlDoc.getElementsByTagName('skill-set');
    renderSkillButtons(skillSets); // Herlaad de knoppen zodat deze ook vertaald worden
}

function generateStars(numberOfStars) {
    const sky = document.getElementById('starry-sky');
    for (let i = 0; i < numberOfStars; i++) {
        let star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.borderRadius = '50%';
        star.style.backgroundColor = getRandomColor();
        sky.appendChild(star);
    }
}

function getRandomColor() {
    const colors = ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#E6E6FA', '#F8F8FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}
