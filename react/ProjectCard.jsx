import React from 'react/react';

function ProjectCard({ project }) {
    return (
        <div className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul className="tech-stack">
                {project.techStack.map(tech => <li key={tech}>{tech}</li>)}
            </ul>
            <div className="links">
                <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a>
            </div>
        </div>
    );
}
