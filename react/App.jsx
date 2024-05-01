import React from 'react/react';
import ProjectGrid from './ProjectGrid';
import projects from './ProjectCard'; // Assume projects data is imported

function App() {
    return (
        <div className="App">
            <h1>My Portfolio</h1>
            <ProjectGrid projects={projects} />
        </div>
    );
}

export default App;
