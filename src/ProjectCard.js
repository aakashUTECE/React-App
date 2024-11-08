import React, { useState } from 'react';

function ProjectCard({ project, isJoined, onJoin, onLeave }) {
    const [hwSet1Qty, setHwSet1Qty] = useState(0);
    const [hwSet2Qty, setHwSet2Qty] = useState(0);

    const handleAction = async (action, qty = 0) => {
        const endpoint = `http://127.0.0.1:5000/${action}/${project.id}/${qty}`;
        try {
            const response = await fetch(endpoint, {
                method: 'POST'
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(`Error with ${action}:`, error);
        }
    };

    return (
        <div className={`project-card ${isJoined ? 'joined' : ''}`}>
            <h3>{project.name}</h3>
            <p>Authorized users: list, of, authorized, users</p>
            <div className="hardware-info">
                <p>HWSet1: {project.hwSet1}/100</p>
                <input 
                    type="number" 
                    placeholder="Enter qty" 
                    value={hwSet1Qty} 
                    onChange={(e) => setHwSet1Qty(e.target.value)} 
                />
                <button onClick={() => handleAction('checkin', hwSet1Qty)}>Check In</button>
                <button onClick={() => handleAction('checkout', hwSet1Qty)}>Check Out</button>
            </div>
            <div className="hardware-info">
                <p>HWSet2: {project.hwSet2}/100</p>
                <input 
                    type="number" 
                    placeholder="Enter qty" 
                    value={hwSet2Qty} 
                    onChange={(e) => setHwSet2Qty(e.target.value)} 
                />
                <button onClick={() => handleAction('checkin', hwSet2Qty)}>Check In</button>
                <button onClick={() => handleAction('checkout', hwSet2Qty)}>Check Out</button>
            </div>
            <button onClick={() => isJoined ? onLeave(project.id) : onJoin(project.id)}>
                {isJoined ? 'Leave' : 'Join'}
            </button>
        </div>
    );
}

export default ProjectCard;
