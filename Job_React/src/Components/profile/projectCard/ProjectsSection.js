import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, LinkIcon } from 'lucide-react';
import baseUrl from '../../../configBaseUrl';
import ProjectModal from './ProjectModel';
import './ProjectsSection.css';

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/projects`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const data = await response.json();
            setProjects(data.projects);
            setError(null);
        } catch (err) {
            setError('Failed to fetch projects. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        try {
            const method = editingProject ? 'PUT' : 'POST';
            const url = editingProject
                ? `${baseUrl.mainUrl}/api/employee/project/${editingProject.id}`
                : `${baseUrl.mainUrl}/api/employee/projects`;

            const response = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save project');
            }

            fetchProjects();
            handleCloseModal();
        } catch (err) {
            setError('Failed to save project. Please try again.');
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`${baseUrl.mainUrl}/api/employee/project/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete project');
                }

                fetchProjects();
            } catch (err) {
                setError('Failed to delete project. Please try again.');
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    return (
        <div className="projects-section card">
            <div className="projects-header">
                <div>
                    <h2 className="text-2xl font-semibold">Projects</h2>
                    <p className="text-gray-600 mt-1">
                        Talk about your projects that made you proud and contributed to your learnings
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
                <div className="projects-list">
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className="project-item card"
                        >
                            <div className="project-info">
                                <div className="project-header">
                                    <h3 className="project-title">{project.name}</h3>
                                    <div className="project-actions">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="edit-button"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="delete-button"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="project-description">{project.description}</p>
                                {project.technologiesUsed && (
                                    <div className="project-technologies">
                                        {project.technologiesUsed.split(',').map((tech, index) => (
                                            <span
                                                key={index}
                                                className="technology-tag"
                                            >
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="project-details">
                                    {project.duration && (
                                        <span className="project-duration">
                                            Duration: {project.duration}
                                        </span>
                                    )}
                                    {project.projectURL && (
                                        <a
                                            href={project.projectURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <LinkIcon className="w-3 h-3" />
                                            Project Link
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <p className="text-gray-500 text-center py-8">
                            No projects added yet. Click "Add" to showcase your work.
                        </p>
                    )}
                </div>
            )}

            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                project={editingProject}
            />
        </div>
    );
};

export default ProjectsSection;
