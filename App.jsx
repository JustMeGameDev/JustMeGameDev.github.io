// Assuming ProjectGrid is another component that needs to be included in the same file
function ProjectGrid() {
    return (
        projectgrid()
    );
}

function App() {
    return <ProjectGrid />;
}
function ProjectCard({ project }) {
    return (
        <div style={{margin: '20px', padding: '10px', border: '2px dotted #ccc'}}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <img src={project.logo} alt={project.title} className={"project-logo"}/>
            <div className={"dropdown"}>
                <button className="dropbtn"  onClick={ClickDrop} >More Images</button>
                <div className="dropdown-content" id={"myDropdown"}>
                    {project.image.map((image) => <img src={image} className={"project-img"}/>)}
                </div>
            </div>
            <ul>
                {project.techStack.map(tech => <li key={tech} className={"tech-stack"}>{tech}</li>)}
            </ul>
            <a href={project.github} target={"_blank"} className={"links"}>GitHub Repo</a><br/>
            <a href={project.liveDemo} target={"_blank"} className={"links"}>Online Demo/file Download</a>
        </div>
    );
}

function projectgrid() {
    const projects = [
        {
            id: 1,
            title: "Long Live Picho",
            description: "This was a GlobalGameJame 2023 game.This game is a prototype game made in a weekend by 4 students game development of the Secondary vocational education level 4.  we are proud of the workings of the game but visually  it could be improved. It did win an award for the uniqe mechanics. ",
            logo:"./img/Other/logo.png",
            image: ["./img/Other/award_01.jpg", "./img/Other/award_02.jpg", "./img/Other/pinchio.png"],
            techStack: ['Unity', 'C#', 'PixelArt'],
            github: "https://github.com/Klaas18/Global_Game_Jam_2023",
            liveDemo: "https://kornee-hartlief.itch.io/long-live-picho"
        },
        {
            id: 2,
            title: "Zombie Survivors",
            description: "Zombie Survivors is a game based on the idea of the Vampire Survivors Game. The controls of the game are a bit unconventional that is because it was developed for an arcade for my school.",
            logo:"url-to-weather-app-image.jpg",
            image: ["url-to-weather-app-image.jpg", "./img/Other/logo.png"],
            techStack: ['Unity', 'C#', 'PixelArt',"Arcade"],
            github: "https://github.com/Dakkaoui050/zombieSurviors",
            liveDemo: "https://kornee-hartlief.itch.io/zombie-survivors"
        },
    ];

    return (
        <div>
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('react-root'));
