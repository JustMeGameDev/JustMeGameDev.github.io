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
    skillsContainer.innerHTML = ''; // Verwijder bestaande inhoud

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

    // Stijlen voor centreren van de knoppen
    skillsContainer.style.display = 'flex';
    skillsContainer.style.justifyContent = 'center';
    skillsContainer.style.flexWrap = 'wrap';
    skillsContainer.style.gap = '20px';
}



function renderSkillSetDetails(skillSet) {
    const detailsContainer = document.querySelector('#skill-details');
    detailsContainer.innerHTML = ''; // Clear previous content

    Array.from(skillSet.querySelectorAll('skills > skill')).forEach(skill => {
        const skillDetailDiv = document.createElement('div');
        skillDetailDiv.className = 'skill-detail-box';

        const title = document.createElement('h3');
        title.textContent = skill.querySelector('name').textContent;
        skillDetailDiv.appendChild(title);

        const progressBar = createProgressBar(skill.querySelector('level').textContent);
        skillDetailDiv.appendChild(progressBar);

        const description = document.createElement('p');
        description.textContent = skill.querySelector('description').textContent;
        skillDetailDiv.appendChild(description);

        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-container';

        const mediaItems = skill.querySelectorAll('media > item');
        mediaItems.forEach(item => {
            mediaContainer.appendChild(createMediaItem(item));
        });

        skillDetailDiv.appendChild(mediaContainer);
        detailsContainer.appendChild(skillDetailDiv);
    });
}


function renderTOC(skillSet) {
    const tocContainer = document.querySelector('.toc-container');
    tocContainer.innerHTML = ''; // Eerder geplaatste inhoud wissen

    const tocTitle = document.createElement('h3');
    tocTitle.textContent = 'Index:';
    tocContainer.appendChild(tocTitle);

    const list = document.createElement('ul');
    tocContainer.appendChild(list);

    const skills = skillSet.querySelectorAll('skills > skill');
    Array.from(skills).forEach(skill => {
        const skillName = skill.querySelector('name').textContent;
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#detail-' + skillName.replace(/\s+/g, '-').toLowerCase();
        link.textContent = skillName;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSkillDetail(link.getAttribute('href').substring(1));
        });
        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    // Stijlen voor centreren
    tocContainer.style.display = 'flex';
    tocContainer.style.flexDirection = 'column';
    tocContainer.style.alignItems = 'center';
    list.style.listStyleType = 'none';
    list.style.padding = 0;
}



function showSkillDetail(skillId) {
    const skillDetail = document.getElementById(skillId);
    if (skillDetail) {
        skillDetail.scrollIntoView({ behavior: 'smooth' }); // Gebruikt de soepele scroll animatie
    }
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
    const container = document.createElement('div');
    container.className = 'media-text-container';

    const mediaBox = document.createElement('div');
    mediaBox.className = 'media-box';

    const mediaItem = document.createElement('div');
    mediaItem.className = 'media-item';
    // Afhankelijk van het type (image/video), stel je de bron in
    if (item.type === 'image' || item.type === 'video') {
        const media = item.type === 'image' ? document.createElement('img') : document.createElement('video');
        media.src = item.src;
        media.style.width = '100%'; // Zorgt dat de media de container vult
        mediaItem.appendChild(media);
    }

    const subtext = document.createElement('div');
    subtext.textContent = item.description;
    subtext.className = 'subtext';

    mediaBox.appendChild(mediaItem);
    mediaBox.appendChild(subtext);

    const textBox = document.createElement('div');
    textBox.className = 'text-box';
    textBox.textContent = item.additionalText; // Aanvullende tekst voor het media-item

    container.appendChild(mediaBox);
    container.appendChild(textBox);

    return container;
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
