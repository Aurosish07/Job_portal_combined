import React, { useState, useEffect } from 'react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import './EducationSection.css';
import baseUrl from '../../../configBaseUrl';

const EducationSection = () => {
    const [educations, setEducations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEducation, setCurrentEducation] = useState({
        degree: '',
        courseName: '',
        institution: '',
        specialization: '',
        gpaOrScore: '',
        graduationDate: ''
    });
    const [customDegree, setCustomDegree] = useState('');
    const [showCustomDegreeInput, setShowCustomDegreeInput] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEducations();
    }, []);

    const fetchEducations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile/education`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch educations');
            }

            const data = await response.json();
            setEducations(data.educationEntries || []);
        } catch (error) {
            console.error('Error fetching educations:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addEducation = async (education) => {
        setError(null);
        try {
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile/education`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(education),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add education');
            }

            const data = await response.json();
            setEducations([...educations, data.education]);
        } catch (error) {
            console.error('Error adding education:', error);
            setError(error.message);
        }
    };

    const updateEducation = async (id, updates) => {
        setError(null);
        try {
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/education/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update education');
            }

            fetchEducations();
        } catch (error) {
            console.error('Error updating education:', error);
            setError(error.message);
        }
    };

    const deleteEducation = async (id) => {
        setError(null);
        try {
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/education/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete education');
            }

            fetchEducations();
        } catch (error) {
            console.error('Error deleting education:', error);
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading educations...</div>;
    }

    return (
        <div className="education-section">
            <div className="education-header">
                <h2>Education</h2>
                <button className="add-button" onClick={() => setIsEditing(true)}>
                    <Plus size={16} /> Add Education
                </button>
            </div>
            {error && <div className="error-message">Error: {error}</div>}
            {educations.length === 0 ? (
                <div>No education records found. Please add your education details.</div>
            ) : (
                <div className="education-content">
                    {educations.map((education, index) => (
                        <div key={index} className="education-item">
                            <div className="education-info">
                                <h3>{education.degree}</h3>
                                <p>{education.courseName}</p>
                                <p>{education.institution}</p>
                                <p>{education.specialization}</p>
                                <p>{education.gpaOrScore}</p>
                                <p>{new Date(education.graduationDate).toLocaleDateString()}</p>
                            </div>
                            <div className="education-actions">
                                <button className="edit-button" onClick={() => {
                                    setCurrentEducation(education);
                                    setIsEditing(true);
                                }}>
                                    <Edit2 size={16} />
                                </button>
                                <button className="delete-button" onClick={() => deleteEducation(education.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isEditing && (
                <div className="education-form-overlay">
                    <form className="education-form" onSubmit={(e) => {
                        e.preventDefault();
                        addEducation(currentEducation);
                        setIsEditing(false);
                    }}>
                        <h3>Add/Edit Education</h3>
                        <div className="form-group">
                            <label>Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={currentEducation.degree}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Course Name</label>
                            <input
                                type="text"
                                name="courseName"
                                value={currentEducation.courseName}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, courseName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Institution</label>
                            <input
                                type="text"
                                name="institution"
                                value={currentEducation.institution}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Specialization</label>
                            <input
                                type="text"
                                name="specialization"
                                value={currentEducation.specialization}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, specialization: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>GPA or Score</label>
                            <input
                                type="text"
                                name="gpaOrScore"
                                value={currentEducation.gpaOrScore}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, gpaOrScore: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Graduation Date</label>
                            <input
                                type="date"
                                name="graduationDate"
                                value={currentEducation.graduationDate}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, graduationDate: e.target.value })}
                            />
                        </div>
                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="save-button">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EducationSection;