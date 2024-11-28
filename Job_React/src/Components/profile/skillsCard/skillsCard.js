import React, { useState, useEffect } from 'react';
import './skillsCard.css';
import baseUrl from '../../../configBaseUrl';

function SkillsSection() {
    const [inputValue, setInputValue] = useState('');
    const [suggestedSkills, setSuggestedSkills] = useState([]);
    const [skills, setSkills] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSkillId, setSelectedSkillId] = useState(null);

    useEffect(() => {
        fetchSkillsForEmployee();
    }, []);

    useEffect(() => {
        const fetchSuggestedSkills = async () => {
            if (inputValue.trim() === '') {
                setSuggestedSkills([]);
                return;
            }

            try {
                const response = await fetch(`${baseUrl.mainUrl}/api/employee/skillsName?keyword=${inputValue}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setSuggestedSkills(data || []);
            } catch (error) {
                console.error('Error fetching suggested skills:', error);
            }
        };

        const debounceTimeout = setTimeout(fetchSuggestedSkills, 300); // Debounce the API call by 300ms
        return () => clearTimeout(debounceTimeout); // Cleanup timeout on input change
    }, [inputValue]);

    const fetchSkillsForEmployee = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile/skills`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setSkills(data.skills || []);
        } catch (error) {
            console.error('Error fetching skills for employee:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setSelectedSkillId(null); // Reset selected skill ID when input changes
    };

    const handleSkillSelect = (skill) => {
        setInputValue(skill.name);
        setSelectedSkillId(skill.id);
        setSuggestedSkills([]); // Clear suggestions after selection
    };

    const handleAddSkill = async () => {
        if (!selectedSkillId) return;

        try {
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile/skills`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ skillId: selectedSkillId }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const newSkill = await response.json();
            setSkills([...skills, newSkill]);
            setInputValue('');
            setIsAdding(false);
        } catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    return (
        <div className="skills-section">
            <button className="add-skill-button" onClick={() => setIsAdding(true)}>Add Skill</button>
            {isAdding && (
                <div className="add-skill-card">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search for skills..."
                        className="skill-input"
                    />
                    <ul className="suggested-skills-list">
                        {suggestedSkills.map((skill) => (
                            <li
                                key={skill.id}
                                className="suggested-skill-item"
                                onClick={() => handleSkillSelect(skill)}
                            >
                                {skill.name}
                            </li>
                        ))}
                    </ul>
                    <div className="add-skill-actions">
                        <button className="save-button" onClick={handleAddSkill}>Add</button>
                        <button className="cancel-button" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {loading ? (
                <div>Loading skills...</div>
            ) : error ? (
                <div className="error-message">Error: {error}</div>
            ) : skills.length === 0 ? (
                <div>No skills found. Please add your skills.</div>
            ) : (
                <div className="skills-list">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            {skill.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SkillsSection;
