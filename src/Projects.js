import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

function Projects() {
    const [joinedProjects, setJoinedProjects] = useState([]);

    const projectList = [
        { name: 'Project A', description: 'Description for Project A' },
        { name: 'Project B', description: 'Description for Project B' },
        { name: 'Project C', description: 'Description for Project C' }
    ];

    const handleJoinProject = (projectName) => {
        if (!joinedProjects.includes(projectName)) {
            setJoinedProjects([...joinedProjects, projectName]);
        }
    };

    return (
        <div>
            <h2>Projects</h2>
            {projectList.map((project, index) => (
                <ProjectCard 
                    key={index} 
                    name={project.name} 
                    description={project.description} 
                    onJoin={handleJoinProject}
                />
            ))}
            <h3>Joined Projects</h3>
            <ul>
                {joinedProjects.map((project, index) => (
                    <li key={index}>{project}</li>
                ))}
            </ul>
        </div>
    );
}

export default Projects;
