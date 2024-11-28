import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, ExternalLink } from 'lucide-react';
import baseUrl from '../../../configBaseUrl';
import CertificationModal from './CertificationModal';
import "./Certificationsection.css"

const CertificationSection = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCertification, setEditingCertification] = useState(null);

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile/certifications`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch certifications');
            }

            const data = await response.json();
            setCertifications(data.certifications);
            setError(null);
        } catch (err) {
            setError('Failed to fetch certifications. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        try {
            const method = editingCertification ? 'PUT' : 'POST';
            const url = editingCertification
                ? `${baseUrl.mainUrl}/api/employee/certification/${editingCertification.id}`
                : `${baseUrl.mainUrl}/api/employee/profile/certifications`;

            const response = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save certification');
            }

            fetchCertifications();
            handleCloseModal();
        } catch (err) {
            setError('Failed to save certification. Please try again.');
        }
    };

    const handleEdit = (certification) => {
        setEditingCertification(certification);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this certification?')) {
            try {
                const response = await fetch(`${baseUrl.mainUrl}/api/employee/certification/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete certification');
                }

                fetchCertifications();
            } catch (err) {
                setError('Failed to delete certification. Please try again.');
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCertification(null);
    };

    return (
        <div className="certifications-section card">
            <div className="certifications-header">
                <div>
                    <h2 className="text-2xl font-semibold">Certifications</h2>
                    <p className="text-gray-600 mt-1">
                        Showcase your certifications and achievements
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
                <div className="certifications-list">
                    {certifications.map(cert => (
                        <div
                            key={cert.id}
                            className="certification-item card"
                        >
                            <div className="certification-info">
                                <div className="certification-header">
                                    <h3 className="certification-title">{cert.name}</h3>
                                    <div className="certification-actions">
                                        <button
                                            onClick={() => handleEdit(cert)}
                                            className="edit-button"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cert.id)}
                                            className="delete-button"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="certification-organization">{cert.issuingOrganization}</p>
                                <p className="certification-date">
                                    Completed on: {new Date(cert.completionDate).toLocaleDateString()}
                                </p>
                                {cert.certificationURL && (
                                    <a
                                        href={cert.certificationURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="certification-link"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        View Certificate
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                    {certifications.length === 0 && (
                        <p className="text-gray-500 text-center py-8">
                            No certifications added yet. Click "Add" to showcase your achievements.
                        </p>
                    )}
                </div>
            )}

            <CertificationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                certification={editingCertification}
            />
        </div>
    );
};

export default CertificationSection;
