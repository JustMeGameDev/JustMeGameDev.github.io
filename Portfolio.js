// script.js

const projects = [
    {
        titleId: "longLivePichoTitle",
        descriptionId: "longLivePichoDescription",
        pdfId: "gameDesignDocPath",
        badges: [
            { textId: "badgeAwardWinning", color: "#f39c12" },
            { textId: "badgeGameJam", color: "#12f3bf" },
            { textId: "badgeDropped", color: "#d60000" }
        ],
        title: "Long Live Picho",
        description: "This game is a prototype game made in a weekend...",
        engine: "./img/Other/Logo_T1_MadeWith_White_RGB.png",
        category: "games",
        cover: "./img/Other/logo.png",
        github: "https://github.com/Klaas18/Global_Game_Jam_2023",
        itch: "https://kornee-hartlief.itch.io/long-live-picho",
        pdf: null,
        images: [
            "./img/Other/award_01.jpg",
            "./img/Other/award_02.jpg",
        ]
    },
    {
        title: "Before Nightfall",
        engine: "./img/Other/Logo_T1_MadeWith_White_RGB.png",
        category: "games",
        description: "About the game Before Nightfall (BNF for short). This game is a prototype game made for my study. BNF is a Tower defence game in a fantasy setting, you play as an carpenter for hire to defend someone's village or a castle. but where do you defend against? well there are multiple creatures like a oger, giant, demon and a boss creature like the slime or dragon. For each contract you complete you get gems which you can spend to upgrade the standard towers and ability's. there are 3 modes to the game" +
            "\n" +
            "#1\" is career mode where you complete contracts to earn gems to get more difficult contracts etc.\n" +
            "\n" +
            "#2\" is a endless mode where you get a random generated map and you need to clear as many waves you can.\n" +
            "\n" +
            "#3' is a custom mode where you set the parameters of the map generator your self, like how big the map is, the seed, the amount of waves and the difficulty.\n" +
            "\n" +
            "\n" +
            "so that is the game in short.",
        cover: "./img/Other/Before Nightfall.png",
        badges: [
            {text: "School", color: "#970093" },
            {text: "Beta Stage", color: "#fff500" },
            { text: "Dropped", color: "#d60000" }
        ],
        github: "https://github.com/JustMeGameDev/Tower-defance",
        itch: null,
        pdf: null,
        images: [
            "./img/Other/BNF_SS1.png",
            "./img/Other/BNF_SS2.png",
        ]
    },
    {
        title: "Big Cheese Donte",
        engine: "./img/Other/Logo_T1_MadeWith_White_RGB.png",
        category: "games",
        description:"This is a RPG prototype game based around a 1920 chicago mafia setting. You play as the son of a low ranking mafia boss. He has asked you to proof your capable of taking over his empire.\n" +
            "\n" +
            "therefore you need to collect grunts and battle other crime bosses in the city to take over their territory. The ultimate goal is to take over the biggest rival of your dad's empire (Big Faluci).\n" +
            "\n" +
            "when you won that battle you get the name Big Cheese Donte and you are the new kingpin of the city!",
        cover: "./img/Other/logo_big_cheese.png",
        badges: [
            {text: "School", color: "#970093" },
            {text: "Beta Stage", color: "#fff500" },
            { text: "Dropped", color: "#d60000" }
        ],
        github: "https://github.com/JustMeGameDev/pokeclone",
        itch: null,
        pdf: null,
        images: [
            "./img/Other/bigcheese_code_snipit.png"
        ]
    },
    {
        title: "Zombie Survivors",
        engine: "./img/Other/Logo_T1_MadeWith_White_RGB.png",
        category: "games",
        description:"Zombie Survivors is a game based on the idea of the Vampire Survivors Game. The controls of the game are a bit unconventional that is because it was developed for an arcade for my school.",
        cover: "./img/Other/Zs.png",
        badges: [
            {text: "School", color: "#970093" },
            {text: "Beta Stage", color: "#fff500" },
            { text: "Dropped", color: "#d60000" }
        ],
        github: "https://github.com/JustMeGameDev/pokeclone",
        itch: "https://kornee-hartlief.itch.io/zombie-survivors",
        pdf: null,
        images: [
            "./img/Other/bigcheese_code_snipit.png",
            "./img/Other/blackplaceholder.png",
        ]
    },
    {
        title: "Time Puzzler",
        engine: "./img/Other/Logo_T1_MadeWith_White_RGB.png",
        category: "games",
        description:"For the Noorderpoort Game-jam 2024 i made this vr game in 4 days with 3 of my friends and fellow students, this was our first real try at a vr game and we have won 2 awards with this Game-jam: overall winner (first place/most votes) and most complete game (self explanatory) . We do want to work on it further but we need to find the time for it.",
        cover: "./img/Other/Time Puzz.webp",
        badges: [
            { text: "Award Winning", color: "#f39c12" },
            { text: "Game-Jam", color: "#12f3bf" },
            {text: "Beta Stage", color: "#fff500" },
            { text: "On Hold", color: "#ff5106" }
        ],
        github: "https://github.com/itsfinn2004/VrJam/tree/main",
        itch: null,
        pdf: null,
        images: [
          null
        ]
    },


//documents
    {
        title: "test",
        engine: null,
        category: "documents",
        description:"test",
        cover: "./img/Other/blackplaceholder.png",
        badges: [
            {text: "School", color: "#970093" },
            {text: "W.I.P.", color: "#0dc808"}
    ],
        github: null,
        itch: null,
        pdf: null,
        images: [
            null
        ]
    },
    //art work
    {
        title: "test",
        engine: null,
        category: "art",
        description:"test",
        cover: "./img/Other/blackplaceholder.png",
        badges: [
            {text: "School", color: "#970093" },
            {text: "3D.", color: "#0dc808"},
            {text: "2D.", color: "#fff500"},
            {text: "Pixel Art.", color: "#002aff"},
            {text: "Low Polly", color: "#ff0000"},

        ],
        github: null,
        itch: null,
        pdf: null,
        images: [
            null
        ]
    },

    // Add more projects here...
];

function filterProjects(category) {
    const lang = localStorage.getItem('userLang') || 'en';  // Ensure we're using the current language setting
    const filename = `portfolio_${lang}.xml`;
    const filepath = `${lang}/${filename}`;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            applyTranslationsAndDisplay(this.responseXML, category);
        }
    };
    xhttp.open("GET", filepath, true);
    xhttp.send();
}
function applyTranslationsAndDisplay(xmlDoc, category) {
    const container = document.getElementById('project-container');
    container.innerHTML = '';

    const filteredProjects = projects.filter(project => project.category === category);
    filteredProjects.forEach(project => {
        project.translatedTitle = xmlDoc.querySelector(`translation[id="${project.titleId}"]`)?.textContent || project.title;
        project.translatedDescription = xmlDoc.querySelector(`translation[id="${project.descriptionId}"]`)?.textContent || project.description;
        project.translatedPdf = xmlDoc.querySelector(`translation[id="${project.pdfId}"]`)?.textContent || project.pdf;

        let badgesHTML = project.badges.map(badge => {
            const badgeText = xmlDoc.querySelector(`translation[id="${badge.textId}"]`)?.textContent || badge.text;
            return `<span class="badge" style="background-color: ${badge.color}">${badgeText}</span>`;
        }).join(' ');

        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <h3>${project.translatedTitle}</h3>
            <p>${project.translatedDescription}</p>
            <div class="badges-container">${badgesHTML}</div>
            ${project.translatedPdf ? `<a href="${project.translatedPdf}" target="_blank">Download Document</a>` : ''}
            <!-- Other dynamic elements like images, links, etc. -->
        `;
        container.appendChild(projectCard);
    });
}




function openSlideshow(index) {
    const modal = document.getElementById('slideshowModal');
    const content = document.getElementById('slideshowContent');
    content.innerHTML = '';
    projects[index].images.forEach((img, i) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `<img src="${img}" alt="Image ${i + 1}">`;
        content.appendChild(slide);
    });
    showSlides(slideIndex = 1);
    modal.style.display = "block";
}

function closeSlideshow() {
    const modal = document.getElementById('slideshowModal');
    modal.style.display = "none";
}

let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
    filterProjects('games'); // Default to displaying games
});