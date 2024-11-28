import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Award } from 'lucide-react';
import baseUrl from '../../../configBaseUrl';
import AwardModal from './AwardModel';
import './AchievementsSection.css';

const AchievementsSection = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAward, setEditingAward] = useState(null);

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile/awards`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch awards');
            }

            const data = await response.json();
            setAwards(data.awards);
            setError(null);
        } catch (err) {
            setError('Failed to fetch awards. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        try {
            const method = editingAward ? 'PUT' : 'POST';
            const url = editingAward
                ? `${baseUrl.mainUrl}/api/employee/award/${editingAward.id}`
                : `${baseUrl.mainUrl}/api/employee/profile/award`;

            const response = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save award');
            }

            fetchAwards();
            handleCloseModal();
        } catch (err) {
            setError('Failed to save award. Please try again.');
        }
    };

    const handleEdit = (award) => {
        setEditingAward(award);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this award?')) {
            try {
                const response = await fetch(`${baseUrl.mainUrl}/api/employee/award/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete award');
                }

                fetchAwards();
            } catch (err) {
                setError('Failed to delete award. Please try again.');
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAward(null);
    };

    return (
        <div className="achievements-section card">
            <div className="achievements-header">
                <div>
                    <h2 className="text-2xl font-semibold">Achievements</h2>
                    <p className="text-gray-600 mt-1">
                        Showcase your awards and achievements
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="add-button"
                >
                    <Plus className="w-4 h-4" />
                    Add
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="achievements-list">
                    {awards.map(award => (
                        <div
                            key={award.id}
                            className="achievement-item card"
                        >
                            <div className="achievement-info">
                                <div className="achievement-header">
                                    <div className="achievement-icon">
                                        <Award className="w-10 h-10 text-yellow-500" />
                                    </div>
                                    <div>
                                        <h3 className="achievement-title">{award.awardName}</h3>
                                        <p className="achievement-organization">{award.awardingOrganization}</p>
                                        <p className="achievement-date">
                                            Received on: {new Date(award.dateReceived).toLocaleDateString()}
                                        </p>
                                        {award.description && (
                                            <p className="achievement-description">{award.description}</p>
                                        )}
                                    </div>

                                    <div className="achievement-actions">
                                        <button
                                            onClick={() => handleEdit(award)}
                                            className="edit-button"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(award.id)}
                                            className="delete-button"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                    {awards.length === 0 && (
                        <p className="text-gray-500 text-center py-8">
                            No awards added yet. Click "Add" to showcase your achievements.
                        </p>
                    )}
                </div>
            )}

            <AwardModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                award={editingAward}
            />
        </div>
    );
};

export default AchievementsSection;
