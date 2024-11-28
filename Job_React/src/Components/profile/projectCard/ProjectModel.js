import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        technologiesUsed: '',
        duration: '',
        projectURL: ''
    });

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                description: project.description,
                technologiesUsed: project.technologiesUsed || '',
                duration: project.duration || '',
                projectURL: project.projectURL || ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                technologiesUsed: '',
                duration: '',
                projectURL: ''
            });
        }
    }, [project]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{project ? 'Edit Project' : 'Add Project'}</h3>
                    <button onClick={onClose} className="close-button">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Project Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Technologies Used</label>
                        <input
                            type="text"
                            name="technologiesUsed"
                            value={formData.technologiesUsed}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Project URL</label>
                        <input
                            type="url"
                            name="projectURL"
                            value={formData.projectURL}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="save-button">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectModal;