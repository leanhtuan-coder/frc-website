import React, { useState, useEffect } from 'react';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { RecruitmentLanding } from '../components/RecruitmentLanding';
import { FAQSection } from '../components/FAQSection';

const RegistrationPage = () => {
    const [showForm, setShowForm] = useState(false);

    // Scroll to top when switching views
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [showForm]);

    const handleStartRegistration = () => {
        setShowForm(true);
    };

    const handleBackToInfo = () => {
        setShowForm(false);
    };

    return (
        <div className="flex flex-col items-center w-full bg-background min-h-screen">
            {!showForm ? (
                <>
                    {/* Landing Section */}
                    <RecruitmentLanding onScrollToForm={handleStartRegistration} />

                    {/* FAQ Section */}
                    <FAQSection />
                </>
            ) : (
                <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <RegistrationForm onBack={handleBackToInfo} />
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;
