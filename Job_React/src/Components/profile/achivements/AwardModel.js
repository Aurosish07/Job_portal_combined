import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './AwardModal.css';

const AwardModal = ({ isOpen, onClose, onSave, award }) => {
    const [formData, setFormData] = useState({
        awardName: '',
        awardingOrganization: '',
        dateReceived: '',
        description: ''
    });

    useEffect(() => {
        if (award) {
            setFormData({
                awardName: award.awardName,
                awardingOrganization: award.awardingOrganization || '',
                dateReceived: award.dateReceived.split('T')[0],
                description: award.description || ''
            });
        } else {
            setFormData({
                awardName: '',
                awardingOrganization: '',
                dateReceived: '',
                description: ''
            });
        }
    }, [award]);

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
                    <h3>{award ? 'Edit Award' : 'Add Award'}</h3>
                    <button onClick={onClose} className="close-button">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Award Name</label>
                        <input
                            type="text"
                            name="awardName"
                            value={formData.awardName}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Issuing Organization</label>
                        <input
                            type="text"
                            name="awardingOrganization"
                            value={formData.awardingOrganization}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Date Received</label>
                        <input
                            type="date"
                            name="dateReceived"
                            value={formData.dateReceived}
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

export default AwardModal;
