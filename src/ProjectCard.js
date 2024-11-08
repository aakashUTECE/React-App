import React, { useState } from 'react';

function ProjectCard({ project, onJoin, onLeave, fetchProjects }) {
    const [hwSet1Qty, setHwSet1Qty] = useState('');
    const [hwSet2Qty, setHwSet2Qty] = useState('');

    const handleAction = async (action, hwSet, qty) => {
        if (!qty || qty <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }
        const endpoint = `http://127.0.0.1:5000/${action}/${project.id}/${qty}`;
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok) {
                alert(`${data.qty} hardware ${action === 'checkin' ? 'checked in' : 'checked out'}`);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(`Error with ${action}:`, error);
        }
    };    

    const isJoined = project.authorized;

    return (
        <div className={`project-card ${isJoined ? 'joined' : ''}`}>
            <h3>{project.name}</h3>
            <p>Authorized users: list, of, authorized, users</p>
            <div className="hardware-info">
                <p>
                    HWSet1: {project.hwSet1.available}/{project.hwSet1.total}
                </p>
                <input
                    type="number"
                    placeholder="Enter qty"
                    value={hwSet1Qty}
                    onChange={(e) => setHwSet1Qty(e.target.value)}
                />
                <button
                    onClick={() =>
                        handleAction('checkin', 'hwSet1', Number(hwSet1Qty))
                    }
                    disabled={!isJoined}
                >
                    Check In
                </button>
                <button
                    onClick={() =>
                        handleAction('checkout', 'hwSet1', Number(hwSet1Qty))
                    }
                    disabled={!isJoined}
                >
                    Check Out
                </button>
            </div>
            <div className="hardware-info">
                <p>
                    HWSet2: {project.hwSet2.available}/{project.hwSet2.total}
                </p>
                <input
                    type="number"
                    placeholder="Enter qty"
                    value={hwSet2Qty}
                    onChange={(e) => setHwSet2Qty(e.target.value)}
                />
                <button
                    onClick={() =>
                        handleAction('checkin', 'hwSet2', Number(hwSet2Qty))
                    }
                    disabled={!isJoined}
                >
                    Check In
                </button>
                <button
                    onClick={() =>
                        handleAction('checkout', 'hwSet2', Number(hwSet2Qty))
                    }
                    disabled={!isJoined}
                >
                    Check Out
                </button>
            </div>
            <button onClick={() => (isJoined ? onLeave(project.id) : onJoin(project.id))}>
                {isJoined ? 'Leave' : 'Join'}
            </button>
        </div>
    );
}

export default ProjectCard;
