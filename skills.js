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


let currentLang = 'en'; // Global variable to store the current language

function switchLanguage(lang) {
    localStorage.setItem('userLang', lang); // Save the language preference
    currentLang = lang; // Update the current language

    // Load both static translations and skills from the XML file
    const filepath = `./${lang}/skills_${lang}.xml`;

    fetch(filepath)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            // Apply static translations to elements
            applyTranslations(lang, data);

            // Load and render skills for the selected language
            const skillSets = data.getElementsByTagName('skill-set');
            renderSkillButtons(skillSets); // Render the skill buttons

            // Automatically load the first skillset when available
            if (skillSets.length > 0) {
                const firstSkillSet = skillSets[0];
                renderSkillSetDetails(firstSkillSet);
                renderTOC(firstSkillSet);
            }
        })
        .catch(err => console.error('Error loading the XML file:', err));
}


function loadLanguageSkills(lang) {
    const filepath = `./${lang}/skills_${lang}.xml`;

    fetch(filepath)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const skillSets = data.getElementsByTagName('skill-set');
            renderSkillButtons(skillSets); // Render the skill buttons

            // Automatically load the first skillset when available
            if (skillSets.length > 0) {
                const firstSkillSet = skillSets[0];
                renderSkillSetDetails(firstSkillSet);
                renderTOC(firstSkillSet);
            }
        })
        .catch(err => console.error('Error loading the XML file:', err));
}

function renderSkillButtons(skillSets) {
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.innerHTML = ''; // Clear existing content

    // Show the container once buttons are populated
    if (skillSets.length > 0) {
        skillsContainer.classList.add('show');
    }

    Array.from(skillSets).forEach((skillSet, index) => {
        const skillSetName = skillSet.querySelector('name').textContent;
        const skillSetLogo = skillSet.querySelector('logo').textContent;

        const button = document.createElement('button');
        button.className = 'skill-button';
        button.innerHTML = `<img src="${skillSetLogo}" alt="${skillSetName}" title="${skillSetName}" />`;
        button.onclick = () => {
            renderSkillSetDetails(skillSet);
            renderTOC(skillSet);

            // Remove active class from all buttons and set for clicked one
            document.querySelectorAll('.skill-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        };

        skillsContainer.appendChild(button);

        // Automatically select the first skillset button
        if (index === 0) {
            button.classList.add('active');
        }
    });
}






function renderSkillSetDetails(skillSet) {
    const subskill1Container = document.getElementById('subskill1');
    const subskill2Container = document.getElementById('subskill2');
    subskill1Container.innerHTML = ''; // Clear previous content
    subskill2Container.innerHTML = ''; // Clear previous content

    const skills = Array.from(skillSet.querySelectorAll('skills > skill'));

    skills.forEach((skill, index) => {
        const subskillContainer = document.createElement('div');
        subskillContainer.className = 'subskill-container';

        // Generate a unique ID for each subskill
        const skillId = 'detail-' + skill.querySelector('name').textContent.replace(/\s+/g, '-').toLowerCase();
        subskillContainer.id = skillId; // Assign the ID to the subskill container

        // Title of the Subskill
        const title = document.createElement('h3');
        title.textContent = skill.querySelector('name').textContent;
        title.className = 'subskill-title';
        subskillContainer.appendChild(title);

        // Progress Bar
        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress-bar';

        const progress = document.createElement('div');
        progress.className = 'progress';
        const progressLevel = parseInt(skill.querySelector('level').textContent);
        progress.style.width = progressLevel + '%'; // Set progress width based on level

        // Add section markers (Intermediate, Advanced, Master)
        const intermediateMarker = document.createElement('div');
        intermediateMarker.className = 'section-marker-intermediate';

        const advancedMarker = document.createElement('div');
        advancedMarker.className = 'section-marker-advanced';

        const masterMarker = document.createElement('div');
        masterMarker.className = 'section-marker-master';

        progressBarContainer.appendChild(intermediateMarker);
        progressBarContainer.appendChild(advancedMarker);
        progressBarContainer.appendChild(masterMarker);

        // Add section labels (Beginner, Intermediate, Advanced, Master)
        const beginnerLabel = document.createElement('div');
        beginnerLabel.className = 'section-label section-label-beginner';
        beginnerLabel.textContent = 'Beginner';

        const intermediateLabel = document.createElement('div');
        intermediateLabel.className = 'section-label section-label-intermediate';
        intermediateLabel.textContent = 'Intermediate';

        const advancedLabel = document.createElement('div');
        advancedLabel.className = 'section-label section-label-advanced';
        advancedLabel.textContent = 'Advanced';

        const masterLabel = document.createElement('div');
        masterLabel.className = 'section-label section-label-master';
        masterLabel.textContent = 'Master';

        // Append labels to the progress bar
        progressBarContainer.appendChild(beginnerLabel);
        progressBarContainer.appendChild(intermediateLabel);
        progressBarContainer.appendChild(advancedLabel);
        progressBarContainer.appendChild(masterLabel);

        // Add the percentage text inside the progress bar
        const progressText = document.createElement('div');
        progressText.className = 'progress-text';
        progressText.textContent = `${progressLevel}%`;

        progressBarContainer.appendChild(progress);
        progress.appendChild(progressText);
        subskillContainer.appendChild(progressBarContainer);


        // Media and Subtext (up to 3 media items)
        const mediaItems = skill.querySelectorAll('media > item');
        mediaItems.forEach((item, mediaIndex) => {
            const mediaContainer = document.createElement('div');
            const media = createMediaItem(item); // Create the media (image/video)
            media.className = 'media-item';
            const mediaSubtext = document.createElement('p');
            mediaSubtext.className = 'media-subtext';
            mediaSubtext.textContent = item.querySelector('description').textContent;
            mediaContainer.appendChild(media);
            mediaContainer.appendChild(mediaSubtext);

            if (mediaIndex === 0) {
                mediaContainer.className = 'media-container-left1'; // Left media
                subskillContainer.appendChild(mediaContainer);
            } else if (mediaIndex === 1) {
                mediaContainer.className = 'media-container-left2'; // Left media
                subskillContainer.appendChild(mediaContainer);
            } else if (mediaIndex === 2) {
                // Third media (originally top-right), now bottom-right
                mediaContainer.className = 'media-container-right';
                subskillContainer.appendChild(mediaContainer);
            }
        });

        // Description for the Subskill (top-right now)
        const description = document.createElement('div');
        description.className = 'subskill-description';
        description.textContent = skill.querySelector('description').textContent;
        subskillContainer.appendChild(description);

        // Append to the appropriate container (alternating between subskill1 and subskill2)
        if (index % 2 === 0) {
            subskill1Container.appendChild(subskillContainer);
        } else {
            subskill2Container.appendChild(subskillContainer);
        }
    });
}




function renderTOC(skillSet) {
    const tocContainer = document.querySelector('.toc-container');
    tocContainer.innerHTML = ''; // Clear previously placed content

    const tocTitle = document.createElement('h3');
    tocTitle.textContent = 'Index:';
    tocContainer.appendChild(tocTitle);

    const list = document.createElement('ul');
    tocContainer.appendChild(list);

    const skills = skillSet.querySelectorAll('skills > skill');
    Array.from(skills).forEach((skill, index) => {
        const skillName = skill.querySelector('name').textContent;
        const skillId = 'detail-' + skillName.replace(/\s+/g, '-').toLowerCase(); // Generate an ID for each skill
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${skillId}`;
        link.textContent = skillName;

        // Add smooth scrolling behavior
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor jump

            const skillDetail = document.getElementById(skillId); // Target the specific skill detail
            if (skillDetail) {
                // Scroll into view and center the element using scrollIntoView with the block option
                skillDetail.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Add pulsing effect
                skillDetail.classList.add('pulse-highlight');
                setTimeout(() => {
                    skillDetail.classList.remove('pulse-highlight');
                }, 3000); // Remove the pulsing effect after 3 seconds
            }
        });

        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    // Ensure that the container is styled properly and visible
    tocContainer.style.display = 'flex';
    tocContainer.style.flexDirection = 'column';
    tocContainer.style.alignItems = 'center';
    list.style.listStyleType = 'none'; // No bullet points
    list.style.padding = 0;
}








function createMediaItem(item) {
    const mediaElement = document.createElement('div');

    if (item.querySelector('type').textContent === 'image') {
        const img = document.createElement('img');
        img.src = item.querySelector('src').textContent;
        mediaElement.appendChild(img);
    } else if (item.querySelector('type').textContent === 'video') {
        const video = document.createElement('video');
        video.src = item.querySelector('src').textContent;
        video.controls = true; // Allow video controls
        mediaElement.appendChild(video);
    }

    return mediaElement;
}
function applyTranslations(lang, xmlDoc) {
    document.querySelectorAll("[data-translation-id]").forEach(element => {
        const key = element.getAttribute('data-translation-id');
        const translationNode = Array.from(xmlDoc.getElementsByTagName("translation"))
            .find(tr => tr.getAttribute('id') === key);

        if (translationNode) {
            element.textContent = translationNode.textContent;
        }
    });
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

document.querySelectorAll('.header-img').forEach(img => {
    img.addEventListener('mouseenter', function () {
        const tooltip = document.querySelector('.header-tooltip');
        tooltip.textContent = this.title;
        tooltip.style.opacity = 1;
    });

    img.addEventListener('mouseleave', function () {
        const tooltip = document.querySelector('.header-tooltip');
        tooltip.style.opacity = 0;
    });
});

