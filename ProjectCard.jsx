import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.github}>GitHub</a>
            <a href={project.liveDemo}>Live Demo</a>
        </div>
    );
};

export default ProjectCard;
