import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import baseUrl from '../../../configBaseUrl';
import ExperienceModal from './ExperienceModal';
import './ExperienceCard.css';

const EmployeeExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile/experiences`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch experiences');
            }

            const data = await response.json();
            setExperiences(data.experiences);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveExperience = async (experience) => {
        try {
            const method = editingExperience ? 'PUT' : 'POST';
            const url = editingExperience
                ? `${baseUrl.mainUrl}/api/employee/experience/${editingExperience.id}`
                : `${baseUrl.mainUrl}/api/employee/profile/experience`;

            const response = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(experience),
            });

            if (!response.ok) {
                throw new Error('Failed to save experience');
            }

            const result = await response.json();
            console.log('Experience saved successfully:', result);
            fetchExperiences();
            setIsModalOpen(false);
            setEditingExperience(null);
        } catch (error) {
            console.error('Error saving experience:', error);
            setError('Error saving experience. Please try again.');
        }
    };

    const handleAddExperience = () => {
        setEditingExperience(null);
        setIsModalOpen(true);
    };

    const handleEditExperience = (experience) => {
        setEditingExperience(experience);
        setIsModalOpen(true);
    };

    const handleDeleteExperience = async (id) => {
        try {
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/experience/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete experience');
            }

            fetchExperiences();
        } catch (error) {
            console.error('Error deleting experience:', error);
            setError('Error deleting experience. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="experience-section card">
            <div className="experience-header">
                <h2>Experience</h2>
                <button className="add-button" onClick={handleAddExperience}>
                    <Plus size={20} />
                    Add Experience
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="experience-list">
                    {experiences.map((experience) => (
                        <div key={experience.id} className="experience-item card">
                            <div className="experience-info">
                                <h3>{experience.companyName}</h3>
                                <p>{experience.designation}</p>
                                <p>{experience.responsibilities}</p>
                                <p>{formatDate(experience.startDate)} - {experience.isCurrent ? 'Present' : formatDate(experience.endDate)}</p>
                            </div>
                            <div className="experience-actions">
                                <button className="edit-button" onClick={() => handleEditExperience(experience)}>
                                    <Pencil size={20} />
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteExperience(experience.id)}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ExperienceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveExperience}
                experience={editingExperience}
            />
        </div>
    );
};

export default EmployeeExperience;