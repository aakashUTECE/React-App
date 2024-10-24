import React from 'react';
import ProjectItem from './ProjectItem';

function Projects() {
    const projectList = ['Project A', 'Project B', 'Project C'];

    return (
        <div>
            <h2>Projects</h2>
            {projectList.map((project, index) => (
                <ProjectItem key={index} name={project} />
            ))}
        </div>
    );
}

export default Projects;
