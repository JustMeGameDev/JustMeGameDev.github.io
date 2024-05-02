import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from './projects';  // Ensure this is correctly imported

const ProjectGrid = () => {
    return (
        <div>
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
    );
};

export default ProjectGrid;
