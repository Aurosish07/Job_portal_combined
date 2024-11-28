import ProfileCard from './profileCard';
import EducationSection from './EducationCard/EducationCard';
import PreferenceSection from './preferanceCard/preferanceCard';
import SkillsSection from './skillsCard/skillsCard';
import EmployeeExperience from './experienceCard/ExperienceCard';
import ProjectsSection from './projectCard/ProjectsSection';
import CertificationSection from './certificateCard/certificationSection';
import AchievementsSection from './achivements/AchivementSection';
import ResumeSection from './resume/ResumeSection';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    return (
        <div style={{ backgroundColor: 'rgb(236, 240, 241)' }}>
            <div className="container mx-auto py-8">
                <br />
                <div className="mb-8">
                    <ProfileCard />
                </div>
                <br />

                <PreferenceSection />
                <EducationSection />
                <SkillsSection />
                <EmployeeExperience />
                <ProjectsSection />
                <CertificationSection />
                <AchievementsSection />
                <ResumeSection />
                <br />

            </div>
        </div>
    );
};

export default ProfilePage;