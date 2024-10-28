import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'; // Icons for UI
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import baseUrl from '../../../configBaseUrl';

// Mock components to avoid importing external UI libraries
const Button = ({ variant, size, children, ...props }) => (
    <button {...props} className={`px-4 py-2 rounded ${variant === 'outline' ? 'border border-gray-300' : ''} ${size === 'sm' ? 'text-sm' : ''}`}>
        {children}
    </button>
);

const Input = ({ className, ...props }) => (
    <input {...props} className={`border border-gray-300 rounded px-4 py-2 ${className}`} />
);

const Table = ({ children }) => <table className="min-w-full bg-white divide-y divide-gray-200">{children}</table>;
const TableHeader = ({ children }) => <thead className="bg-gray-100">{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableHead = ({ children }) => <th className="px-4 py-2 text-left text-sm font-semibold">{children}</th>;
const TableCell = ({ children }) => <td className="px-4 py-2 border-b border-gray-200">{children}</td>;

export default function JobApplicants() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { jobId } = useParams(); // Get jobId from URL

    const applicantsPerPage = 5;

    // Fetch job applicants by jobId
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
                    credentials: 'include', // Include credentials for authentication
                });
                if (!response.ok) {
                    const errorMessage = `Error: ${response.status} ${response.statusText}`;
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                console.log(data);
                setApplicants(data);
            } catch (error) {
                console.error("Error fetching applicants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId]);

    // Filter applicants by search term
    const filteredApplicants = applicants.filter(applicant =>
        applicant.User.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.User.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.skills?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastApplicant = currentPage * applicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
    const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);

    const totalPages = Math.ceil(filteredApplicants.length / applicantsPerPage);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <div className="py-2 bg-white ps-4">
                        <span><Link to="/">Home</Link></span>
                        <span className="px-2">&#47;</span>
                        <span>Job Applicants - {jobId}</span>
                    </div>
                    <div className="container-fluid px-4 py-2">
                        <div className="row">
                            <div className="col-xl-12 col-md-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <h1 className="text-2xl font-bold mb-0">Job Applicants - {jobId}</h1>
                                    </div>
                                    <div className="card-body">
                                        {/* Search Input */}
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="Search applicants..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="pl-10 pr-4 py-2 w-64"
                                                />
                                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Showing {indexOfFirstApplicant + 1} - {Math.min(indexOfLastApplicant, filteredApplicants.length)} of {filteredApplicants.length} applicants
                                            </div>
                                        </div>

                                        {/* Applicants Table */}
                                        {filteredApplicants.length === 0 ? (
                                            <div className="text-gray-500">No applicants found</div>
                                        ) : (
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Name</TableHead>
                                                        <TableHead>Email</TableHead>
                                                        <TableHead>Experience</TableHead>
                                                        <TableHead>Skills</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {currentApplicants.map((applicant) => (
                                                        <TableRow key={applicant.id}>
                                                            <TableCell>{applicant.User.name || 'N/A'}</TableCell>
                                                            <TableCell>{applicant.User.email}</TableCell>
                                                            <TableCell>{applicant.experience || 'N/A'}</TableCell>
                                                            <TableCell>{applicant.skills || 'N/A'}</TableCell>
                                                            <TableCell>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${applicant.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                                                        applicant.status === 'Interviewed' ? 'bg-blue-200 text-blue-800' :
                                                                            applicant.status === 'Rejected' ? 'bg-red-200 text-red-800' :
                                                                                'bg-green-200 text-green-800'}`}>
                                                                    {applicant.status || 'Unknown'}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="outline" size="sm">View Details</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        )}

                                        {/* Pagination */}
                                        <div className="flex justify-between items-center mt-6">
                                            <Button
                                                variant="outline"
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                aria-label="Previous Page"
                                            >
                                                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                                            </Button>
                                            <span className="text-sm text-gray-500">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <Button
                                                variant="outline"
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                aria-label="Next Page"
                                            >
                                                Next <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; 2024</div>
                            <div>
                                <Link to="#">Privacy Policy</Link>
                                &middot;
                                <Link to="#">Terms &amp; Conditions</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );

}
