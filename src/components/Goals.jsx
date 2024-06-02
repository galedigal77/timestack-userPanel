import React, { useState } from 'react';
import '../styles/Goals.css';

const sampleGoals = [
    {
        id: 1,
        name: 'Complete React Training',
        description: 'Finish the React training module by the end of the month.',
        deadline: '2024-06-30',
    },
    {
        id: 2,
        name: 'Submit Project Proposal',
        description: 'Submit the project proposal for the new client by next week.',
        deadline: '2024-06-10',
    },
    {
        id: 3,
        name: 'Team Building Activity',
        description: 'Participate in the team building activity scheduled for next month.',
        deadline: '2024-07-15',
    },
    {
        id: 4,
        name: 'Client Feedback Review',
        description: 'Review and summarize client feedback for the previous quarter.',
        deadline: '2024-06-20',
    },
];

const Goals = () => {
    const [goals, setGoals] = useState(sampleGoals);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [message, setMessage] = useState('');

    const handleJoin = (goalId) => {
        setMessage(`Successfully joined the goal with ID: ${goalId}`);
    };

    const handleWithdraw = (goalId) => {
        setMessage(`Successfully withdrew from the goal with ID: ${goalId}`);
    };

    return (
        <div className="goals-container">
            <h2>Goals</h2>
            {message && <p className="message">{message}</p>}
            <div className="goals-list">
                {goals.map((goal) => (
                    <div key={goal.id} className="goal-item" onClick={() => setSelectedGoal(goal)}>
                        <h3>{goal.name}</h3>
                        <p>Deadline: {goal.deadline}</p>
                    </div>
                ))}
            </div>
            {selectedGoal && (
                <div className="goal-details">
                    <h3>{selectedGoal.name}</h3>
                    <p>{selectedGoal.description}</p>
                    <p>Deadline: {selectedGoal.deadline}</p>
                    <div className="goal-actions">
                        <button onClick={() => handleJoin(selectedGoal.id)}>Join</button>
                        <button onClick={() => handleWithdraw(selectedGoal.id)}>Withdraw</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goals;
