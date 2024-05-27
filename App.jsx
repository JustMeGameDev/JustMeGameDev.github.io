const Tabs = ({ currentTab, onTabClick }) => {
    return (
        <div className="tabs">
            <button onClick={() => onTabClick('games')} className={currentTab === 'games' ? 'active' : ''}>Games/Prototypes</button>
            <button onClick={() => onTabClick('artwork')} className={currentTab === 'artwork' ? 'active' : ''}>Artwork</button>
            <button onClick={() => onTabClick('design')} className={currentTab === 'design' ? 'active' : ''}>Design Documents</button>
        </div>
    );
};

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <img src={project.image} alt={project.title} />
        </div>
    );
};

const App = () => {
    const [currentTab, setCurrentTab] = useState('games');

    const projects = {
        games: [
            { title: 'Game 1', description: 'Description for game 1', image: 'path/to/image1.jpg' },
            { title: 'Game 2', description: 'Description for game 2', image: 'path/to/image2.jpg' },
        ],
        artwork: [
            { title: 'Artwork 1', description: 'Description for artwork 1', image: 'path/to/image3.jpg' },
            { title: 'Artwork 2', description: 'Description for artwork 2', image: 'path/to/image4.jpg' },
        ],
        design: [
            { title: 'Design Document 1', description: 'Description for design document 1', image: 'path/to/image5.jpg' },
            { title: 'Design Document 2', description: 'Description for design document 2', image: 'path/to/image6.jpg' },
        ],
    };

    return (
        <div className="portfolio">
            <Tabs currentTab={currentTab} onTabClick={setCurrentTab} />
            <div className="projects">
                {projects[currentTab].map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </div>
    );
};


// App component definition
function displayTabs() {
    return <Tabs currentTab={currentTab} />;
}

// Render the App component
ReactDOM.render(<App />, document.getElementById('react-root'));
