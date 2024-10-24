import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function ProjectCard({ name, description, onJoin }) {
    return (
        <Card style={{ margin: '10px', padding: '10px' }}>
            <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => onJoin(name)}
                    style={{ marginTop: '10px' }}
                >
                    Join Project
                </Button>
            </CardContent>
        </Card>
    );
}

export default ProjectCard;
