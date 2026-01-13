import React from 'react';
import { RegistrationForm } from '../components/registration/RegistrationForm';

const RegistrationPage = () => {
    return (
        <div className="flex flex-col items-center w-full bg-background">
            <RegistrationForm />
        </div>
    );
};

export default RegistrationPage;
