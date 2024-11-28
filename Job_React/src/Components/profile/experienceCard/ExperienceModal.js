import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './ExperienceModal.css';

const ExperienceModal = ({ isOpen, onClose, onSave, experience }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        designation: '',
        responsibilities: '',
        startDate: '',
        endDate: '',
        isCurrent: false
    });

    useEffect(() => {
        if (experience) {
            setFormData({
                companyName: experience.companyName,
                designation: experience.designation,
                responsibilities: experience.responsibilities || '',
                startDate: experience.startDate.split('T')[0],
                endDate: experience.endDate ? experience.endDate.split('T')[0] : '',
                isCurrent: experience.isCurrent
            });
        } else {
            setFormData({
                companyName: '',
                designation: '',
                responsibilities: '',
                startDate: '',
                endDate: '',
                isCurrent: false
            });
        }
    }, [experience]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{experience ? 'Edit Experience' : 'Add Experience'}</h3>
                    <button onClick={onClose} className="close-button">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Responsibilities</label>
                        <textarea
                            name="responsibilities"
                            value={formData.responsibilities}
                            onChange={handleInputChange}
                            rows="3"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            disabled={formData.isCurrent}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group form-checkbox">
                        <input
                            type="checkbox"
                            id="isCurrent"
                            name="isCurrent"
                            checked={formData.isCurrent}
                            onChange={handleInputChange}
                            className="form-checkbox-input"
                        />
                        <label htmlFor="isCurrent" className="form-checkbox-label">
                            Current Job
                        </label>
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

export default ExperienceModal;