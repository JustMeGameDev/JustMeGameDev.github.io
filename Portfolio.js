// script.js

const projects = [
    {
        title: "Long Live Picho",
        category: "games",
        description: "This game is a prototype game made in a weekend by 4 students game development of the Secondary vocational education level 4.  we are proud of the workings of the game but visually it could be improved. It did win an award for the unique mechanics. (Global Game-jam Groningen Award \"Great interaction\" most unique game mechanics/controls)",
        cover: "./img/Other/logo.png",
        badges: ["Award Winning"], // Array of badges
        github: "https://github.com/Klaas18/Global_Game_Jam_2023",
        itch: "https://kornee-hartlief.itch.io/long-live-picho",
        pdf: null,
        images: [
            "./img/Other/award_01.jpg",
            "./img/Other/award_02.jpg",
        ]
    },
    
    // Add more projects here...
];

function filterProjects(category) {
    const container = document.getElementById('project-container');
    container.innerHTML = '';
    const filteredProjects = projects.filter(project => project.category === category);
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        let badgesHTML = project.badges ? project.badges.map(badge => `<span class="badge">${badge}</span>`).join(' ') : '';
        projectCard.innerHTML = `
        ${badgesHTML}
        <h3>${project.title}</h3>
        
        <img src="${project.cover}" alt="${project.title}">
        <p>${project.description}</p>
        <div class="project-links" style="font-size: xx-large">
            ${project.github ? `<a href="${project.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
            ${project.itch ? `<a href="${project.itch}" target="_blank"><i class="fab fa-itch-io"></i></a>` : ''}
            ${project.pdf ? `<a href="${project.pdf}" target="_blank"><i class="fa-solid fa-file-pdf"></i></a>` : ''}
        </div>
        <button class="show-more" onclick="openSlideshow(${projects.indexOf(project)})">Show More Images</button>
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
