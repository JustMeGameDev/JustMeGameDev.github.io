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
        <div style={{margin: '20px', padding: '10px', border: '2px dotted #ccc', display: 'flex'}}>
            <h3 style={{}}>{project.title}</h3>
            <img src={project.logo} alt={project.title} className={"project-logo"}/>
            <p>{project.description}</p>
            <button className={"center-carusel"}></button>
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
            logo:"./img/Other/Zombie_Survivors.png",
            image: ["./img/Other/Zombie_Survivors.png"],
            techStack: ['Unity', 'C#', 'PixelArt',"Arcade"],
            github: "https://github.com/Dakkaoui050/zombieSurviors",
            liveDemo: "https://kornee-hartlief.itch.io/zombie-survivors"
        },
        {
          id: 2,
          title: "Before NightFall",
          description: "About the game Before Nightfall (BNF for short). This game is a prototype game made for my study. BNF is a Towerdefance game in a fantesy setting, you play as an carpenter for hire to deffend someonce vilage or a castle. but where do you defend against? well there are multiple creaturs like a oger, giant, demon and a boss creature like the slime or dragon. For each contract you complete you get gems wich you can spend to upgrade the standard towers and abilety's. there are 3 modes to the game\n" +
              "\n\n" +
              "#1 is carreer mode where you complete contracts to earn gems to get more difficult contracts etc.\n" +
              "\n\n" +
              "#2\" is a endless mode where you get a random generated map and you need to clear as many waves you can.\n" +
              "\n\n" +
              "#3' is a custom mode where you set the parameters of the map generator your self, like how big the map is, the seed, the amount of waves and the difficulty.\n" +
              "\n\n" +
              "\n\n" +
              "so that is the game in short.",
            logo: "./img/Other/Before Nightfall.png",
            image: ["./img/Other/BNF_SS1.png", "./img/Other/BNF_SS2.png"],
            techStack: ['Unity', 'C#', 'PixelArt', '3D modeling'],
            github: "https://github.com/JustMeGameDev/Tower-defance",
            liveDemo: "not avalible"
        },
    ];

    return (
        <div>
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('react-root'));
