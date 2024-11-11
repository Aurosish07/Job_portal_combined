import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import baseUrl from '../../../configBaseUrl';

const JobApplicants = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { jobId } = useParams();

    const applicantsPerPage = 5;

    useEffect(() => {
        const fetchApplicants = async () => {
            if (!jobId) {
                console.error("jobId is undefined");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${baseUrl.mainUrl}/api/role/employer/jobs/applications/${jobId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setApplicants(data);
            } catch (error) {
                console.error("Error fetching applicants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId]);

    const filteredApplicants = applicants.filter(applicant =>
        applicant.User.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.User.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.skills?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastApplicant = currentPage * applicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
    const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);

    const totalPages = Math.ceil(filteredApplicants.length / applicantsPerPage);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Job Applicants - {jobId}</h1>
                <nav>
                    <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link>
                    <span style={{ margin: '0 8px' }}>/</span>
                    <span>Job Applicants - {jobId}</span>
                </nav>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '4px', width: '250px' }}
                    />
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        Showing {indexOfFirstApplicant + 1} - {Math.min(indexOfLastApplicant, filteredApplicants.length)} of {filteredApplicants.length} applicants
                    </div>
                </div>

                {filteredApplicants.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: '20px 0' }}>No applicants found</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Name</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Experience</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Skills</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentApplicants.map((applicant) => (
                                <tr key={applicant.id}>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{applicant.User.name || 'N/A'}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{applicant.User.email}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{applicant.experience || 'N/A'}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{applicant.skills || 'N/A'}</td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '9999px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            backgroundColor:
                                                applicant.status === 'Pending' ? '#fef3c7' :
                                                    applicant.status === 'Interviewed' ? '#dbeafe' :
                                                        applicant.status === 'Rejected' ? '#fee2e2' :
                                                            '#d1fae5',
                                            color:
                                                applicant.status === 'Pending' ? '#92400e' :
                                                    applicant.status === 'Interviewed' ? '#1e40af' :
                                                        applicant.status === 'Rejected' ? '#991b1b' :
                                                            '#065f46'
                                        }}>
                                            {applicant.status || 'Unknown'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                                        <button style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#f3f4f6',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            cursor: 'pointer'
                                        }}>View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === 1 ? 0.5 : 1
                        }}
                    >
                        Previous
                    </button>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            opacity: currentPage === totalPages ? 0.5 : 1
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>

            <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
                <p>&copy; 2024 EINCA. All rights reserved.</p>
                <div style={{ marginTop: '8px' }}>
                    <Link to="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Privacy Policy</Link>
                    <span style={{ margin: '0 8px' }}>•</span>
                    <Link to="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Terms &amp; Conditions</Link>
                </div>
            </footer>
        </div>
    );
};

export default JobApplicants;