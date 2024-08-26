document.addEventListener('DOMContentLoaded', function() {
    const defaultLang = localStorage.getItem('userLang') || 'en';
    switchLanguage(defaultLang); // Load initial language data

    document.getElementById('switchToEnglish').addEventListener('click', function() {
        switchLanguage('en');
    });

    document.getElementById('switchToDutch').addEventListener('click', function() {
        switchLanguage('nl');
    });

    generateStars(200); // Generate stars for the background
});

function switchLanguage(lang) {
    localStorage.setItem('userLang', lang);
    loadLanguageSkills(lang);
}

function loadLanguageSkills(lang) {
    const filepath = `${lang}/skills_${lang}.xml`;  // Correct path based on language
    fetch(filepath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const skillSets = data.getElementsByTagName('skill-set');
            renderSkillButtons(skillSets);
            applyTranslations(lang, data);
        })
        .catch(err => {
            console.error('Error loading the XML file:', err);
            alert('Failed to load language file: ' + filepath);  // Optionally add an alert for clarity
        });
}


function renderSkillButtons(skillSets) {
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.innerHTML = '';

    Array.from(skillSets).forEach(skillSet => {
        const skillSetName = skillSet.querySelector('name').textContent;
        const skillSetLogo = skillSet.querySelector('logo').textContent;

        const button = document.createElement('button');
        button.className = 'skill-button';
        button.innerHTML = `<img src="${skillSetLogo}" alt="${skillSetName}" title="${skillSetName}">`;
        button.addEventListener('click', () => {
            renderSkillSetDetails(skillSet);
            renderTOC(skillSet);
        });

        skillsContainer.appendChild(button);
    });
}

function renderTOC(skillSet) {
    const tocContainer = document.querySelector('.toc-container');
    tocContainer.innerHTML = '<ul>';

    const skills = skillSet.querySelectorAll('skills > skill');
    Array.from(skills).forEach(skill => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${skill.getAttribute('id')}`;
        link.textContent = skill.querySelector('name').textContent;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSkillDetail(skill.getAttribute('id'));
        });

        listItem.appendChild(link);
        tocContainer.querySelector('ul').appendChild(listItem);
    });
}

function renderSkillSetDetails(skillSet) {
    const detailsContainer = document.getElementById('skill-details');
    detailsContainer.innerHTML = '';

    const skills = skillSet.querySelectorAll('skills > skill');
    Array.from(skills).forEach(skill => {
        const detailDiv = document.createElement('div');
        detailDiv.id = skill.getAttribute('id');
        detailDiv.className = 'skill-detail';
        detailDiv.style.display = 'none'; // Initially hide all details

        const title = document.createElement('h3');
        title.textContent = skill.querySelector('name').textContent;
        detailDiv.appendChild(title);

        const description = document.createElement('p');
        description.textContent = skill.querySelector('description').textContent;
        detailDiv.appendChild(description);

        detailsContainer.appendChild(detailDiv);
    });
}

function showSkillDetail(skillId) {
    const allDetails = document.querySelectorAll('.skill-detail');
    allDetails.forEach(detail => {
        detail.style.display = 'none';
    });

    const targetDetail = document.getElementById(skillId);
    if (targetDetail) {
        targetDetail.style.display = 'block';
        targetDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function generateStars(numberOfStars) {
    const sky = document.getElementById('starry-sky');
    for (let i = 0; i < numberOfStars; i++) {
        let star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.backgroundColor = 'white';
        sky.appendChild(star);
    }
}

function applyTranslations(lang, xmlDoc) {
    document.querySelectorAll("[data-translation-id]").forEach(element => {
        const key = element.getAttribute('data-translation-id');
        const translationNode = xmlDoc.querySelector(`translation[id="${key}"]`);
        if (translationNode) {
            element.textContent = translationNode.textContent;
        }
    });
}
