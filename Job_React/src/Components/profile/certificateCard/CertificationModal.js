import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import "./certificationModel.css"

const CertificationModal = ({ isOpen, onClose, onSave, certification }) => {
    const [formData, setFormData] = useState({
        name: '',
        issuingOrganization: '',
        completionDate: '',
        certificationURL: ''
    });

    useEffect(() => {
        if (certification) {
            setFormData({
                name: certification.name,
                issuingOrganization: certification.issuingOrganization || '',
                completionDate: certification.completionDate.split('T')[0],
                certificationURL: certification.certificationURL || ''
            });
        } else {
            setFormData({
                name: '',
                issuingOrganization: '',
                completionDate: '',
                certificationURL: ''
            });
        }
    }, [certification]);

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
                    <h3>{certification ? 'Edit Certification' : 'Add Certification'}</h3>
                    <button onClick={onClose} className="close-button">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Certification Name</label>
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
                        <label>Issuing Organization</label>
                        <input
                            type="text"
                            name="issuingOrganization"
                            value={formData.issuingOrganization}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Completion Date</label>
                        <input
                            type="date"
                            name="completionDate"
                            value={formData.completionDate}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Certification URL</label>
                        <input
                            type="url"
                            name="certificationURL"
                            value={formData.certificationURL}
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

export default CertificationModal;
