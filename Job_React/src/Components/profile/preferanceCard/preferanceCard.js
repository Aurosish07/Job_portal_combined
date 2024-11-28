import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import "./PreferenceSection.css";
import baseUrl from "../../../configBaseUrl";

const PreferenceSection = () => {
    const [preferences, setPreferences] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newLocation, setNewLocation] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Added a loading state

    // Fetch preferences on component load and when editing is complete
    useEffect(() => {
        if (!isEditing) fetchPreferences();
    }, [isEditing]);

    const fetchPreferences = async () => {
        setLoading(true); // Show loading while fetching
        setError(null); // Clear previous errors
        try {
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch preferences");

            const data = await response.json();
            setPreferences(
                data.employeeProfile || {
                    preferredWorkLocation: [],
                    preferredJobType: "",
                    preferredWorkTime: "Full Time",
                    workEnvironment: "1 Month",
                }
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Hide loading after fetch
        }
    };

    const handleSavePreferences = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before save
        try {
            const method = preferences.id ? "PUT" : "POST";
            const response = await fetch(`${baseUrl.mainUrl}/api/employee/profile`, {
                method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(preferences),
            });

            if (!response.ok) throw new Error("Failed to save preferences");

            setIsEditing(false); // Exit editing mode to trigger a refresh
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddLocation = (e) => {
        e.preventDefault();
        if (newLocation.trim()) {
            setPreferences((prev) => ({
                ...prev,
                preferredWorkLocation: [...(prev?.preferredWorkLocation || []), newLocation.trim()],
            }));
            setNewLocation("");
        }
    };

    const handleDeleteLocation = (indexToRemove) => {
        setPreferences((prev) => ({
            ...prev,
            preferredWorkLocation: (prev?.preferredWorkLocation || []).filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPreferences((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) {
        return <div>Loading preferences...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="preference-section">
            <div className="preference-header">
                <h2>Preferences</h2>
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                    <Edit2 size={16} />
                </button>
            </div>
            {isEditing ? (
                <form onSubmit={handleSavePreferences}>
                    <div className="form-group">
                        <label>Preferred Work Location</label>
                        <div className="locations-container">
                            {(preferences?.preferredWorkLocation || []).map((location, index) => (
                                <div key={index} className="location-chip">
                                    {location}
                                    <button
                                        type="button"
                                        className="delete-location"
                                        onClick={() => handleDeleteLocation(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            placeholder="Add a new location"
                        />
                        <button type="button" onClick={handleAddLocation}>
                            Add
                        </button>
                    </div>
                    <div className="form-group">
                        <label>Preferred Job Type</label>
                        <input
                            type="text"
                            name="preferredJobType"
                            value={preferences.preferredJobType}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Preferred Work Time</label>
                        <select
                            name="preferredWorkTime"
                            value={preferences.preferredWorkTime}
                            onChange={handleInputChange}
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Work Environment</label>
                        <select
                            name="workEnvironment"
                            value={preferences.workEnvironment}
                            onChange={handleInputChange}
                        >
                            <option value="1 Month">1 Month</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                        </select>
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
            ) : (
                <div className="preference-content">
                    <div className="preference-group">
                        <label>Preferred Work Location</label>
                        <div className="locations-container">
                            {(preferences?.preferredWorkLocation || []).map((location, index) => (
                                <div key={index} className="location-chip">
                                    {location}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="preference-group">
                        <label>Preferred Job Type</label>
                        <p>{preferences.preferredJobType || "Not specified."}</p>
                    </div>
                    <div className="preference-group">
                        <label>Preferred Work Time</label>
                        <p>{preferences.preferredWorkTime || "Not specified."}</p>
                    </div>
                    <div className="preference-group">
                        <label>Work Environment</label>
                        <p>{preferences.workEnvironment || "Not specified."}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreferenceSection;
