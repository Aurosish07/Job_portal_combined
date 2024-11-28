import React, { useState, useEffect } from 'react';
import { Edit2, MapPin, Mail, Phone } from 'lucide-react';
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import baseUrl from '../../configBaseUrl';

export default function ProfileCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    currentLocation: '',
    email: '',
    mobile: '',
    profileSummary: '',
  });

  const [initialData, setInitialData] = useState({}); // Store initial form data

  const [statusMessage, setStatusMessage] = useState(null); // For user feedback

  // Fetch the employee profile data on component load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        const profile = data.employeeProfile;

        const initialData = {
          fullName: profile.User.name,
          currentLocation: profile.residency,
          email: profile.User.email,
          mobile: profile.phone,
          profileSummary: profile.profileSummary,
        };

        setFormData(initialData);
        setInitialData(initialData); // Save initial values for comparison
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Map front-end fields to back-end fields
  const mapToBackendFields = (updates) => {
    const fieldMapping = {
      fullName: 'name',
      currentLocation: 'residency',
      mobile: 'phone',
    };

    return Object.keys(updates).reduce((mapped, key) => {
      const backendField = fieldMapping[key] || key;
      mapped[backendField] = updates[key];
      return mapped;
    }, {});
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(false);

    // Dynamically track only changed fields
    const updates = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key]) {
        updates[key] = formData[key];
      }
    });

    // Exit early if there are no updates
    if (Object.keys(updates).length === 0) {
      setStatusMessage('No changes detected.');
      return;
    }

    const backendUpdates = mapToBackendFields(updates);
    console.log("Updates being sent:", backendUpdates);

    try {
      const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendUpdates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      console.log('Profile updated successfully:', result);
      setInitialData(formData); // Update initial data after a successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      setStatusMessage('Error updating profile. Please try again.');
    }
  };

  return (
    <>
      {/* Profile Card */}
      <Card className="shadow-sm mx-auto" style={{ maxWidth: '800px', borderRadius: '15px', border: 'none' }}>
        <Card.Body className="p-4">
          <Row className="align-items-start">
            <Col md={3} className="text-center text-md-start mb-4 mb-md-0">
              <div
                className="rounded-circle bg-primary bg-opacity-10 mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '48px',
                  color: '#0066ff',
                  backgroundColor: '#007bff',
                }}
              >
                <span>{formData.fullName.charAt(0)}</span>
              </div>
            </Col>
            <Col md={9}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2 className="mb-1">{formData.fullName}</h2>
                  <p className="text-muted mb-0">Software Engineer</p>
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setIsOpen(true)}
                  style={{ width: 'auto' }}
                >
                  <Edit2 size={18} />
                </Button>
              </div>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <MapPin size={16} className="text-muted me-2" />
                  <span>{formData.currentLocation || 'No location added'}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Mail size={16} className="text-muted me-2" />
                  <span>{formData.email}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Phone size={16} className="text-muted me-2" />
                  <span>{formData.mobile || 'No mobile number added'}</span>
                </div>
              </div>
              <div>
                <h3 className="h5 mb-3">Profile Summary</h3>
                <p className="text-muted">
                  {formData.profileSummary || 'No Profile Summary Added'}
                </p>
              </div>
              {statusMessage && (
                <p className="text-muted mt-3">{statusMessage}</p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Edit Profile Modal */}
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="currentLocation">
              <Form.Label>Current location</Form.Label>
              <Form.Control
                type="text"
                value={formData.currentLocation}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>Mobile number</Form.Label>
              <Form.Control
                type="text"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="profileSummary">
              <Form.Label>Profile Summary</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.profileSummary}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsOpen(false)}
                style={{ width: 'auto' }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ width: 'auto' }}
              >
                Save changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
