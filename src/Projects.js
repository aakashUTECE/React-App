import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

function Projects() {
    const [joinedProjects, setJoinedProjects] = useState([]);

    const projectList = [
        { id: 1, name: 'Project Name 1', hwSet1: 50, hwSet2: 0 },
        { id: 2, name: 'Project Name 2', hwSet1: 50, hwSet2: 0 },
        { id: 3, name: 'Project Name 3', hwSet1: 0, hwSet2: 0 }
    ];

    const handleJoinProject = async (projectId) => {
        const response = await fetch(`http://127.0.0.1:5000/join/${projectId}`, {
            method: 'POST'
        });
        const data = await response.json();
        alert(data.message);
        if (!joinedProjects.includes(projectId)) {
            setJoinedProjects([...joinedProjects, projectId]);
        }
    };

    const handleLeaveProject = async (projectId) => {
        const response = await fetch(`http://127.0.0.1:5000/leave/${projectId}`, {
            method: 'POST'
        });
        const data = await response.json();
        alert(data.message);
        setJoinedProjects(joinedProjects.filter(id => id !== projectId));
    };

    return (
        <div>
            <h2>Projects</h2>
            <div className="project-list">
                {projectList.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}
                        isJoined={joinedProjects.includes(project.id)}
                        onJoin={handleJoinProject}
                        onLeave={handleLeaveProject}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;
