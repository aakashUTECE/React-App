import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

function Projects() {
    const [projectList, setProjectList] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/projects');
            const data = await response.json();
            const projectsArray = Object.keys(data).map(id => ({
                id,
                ...data[id],
            }));
            setProjectList(projectsArray);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleJoinProject = async (projectId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/join/${projectId}`, {
                method: 'POST',
            });
            const data = await response.json();
            alert(`Joined ${data.projectId}`);
            fetchProjects(); // Refresh project data
        } catch (error) {
            console.error('Error joining project:', error);
        }
    };
    
    const handleLeaveProject = async (projectId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/leave/${projectId}`, {
                method: 'POST',
            });
            const data = await response.json();
            alert(`Left ${data.projectId}`);
            fetchProjects(); // Refresh project data
        } catch (error) {
            console.error('Error leaving project:', error);
        }
    };
    
    return (
        <div>
            <h2>Projects</h2>
            <div className="project-list">
                {projectList.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onJoin={handleJoinProject}
                        onLeave={handleLeaveProject}
                        fetchProjects={fetchProjects}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;
