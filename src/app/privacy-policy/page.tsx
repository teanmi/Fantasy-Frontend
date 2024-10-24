// pages/privacy-policy.tsx
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-[#03045e] mb-6">Privacy Policy</h1>
            <p>This is the privacy policy for Playoff Pulse. We are committed to protecting your personal information and your right to privacy.</p>
            
            <h2 className="text-xl font-semibold text-[#0077b6] mt-6">Information We Collect</h2>
            <p>We collect personal information such as your name, email address, and account details when you sign up to use our service. We may also collect usage data such as the pages you visit on our site.</p>

            <h2 className="text-xl font-semibold text-[#0077b6] mt-6">How We Use Your Information</h2>
            <p>Your information is used to provide, operate, and improve Playoff Pulse. We may also use your information to communicate with you regarding your account or services.</p>

            <h2 className="text-xl font-semibold text-[#0077b6] mt-6">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Please contact us if you would like to exercise these rights.</p>

            <p className="mt-6">If you have any questions about this policy, please contact us at playoffPulse.com.</p>
        </div>
    );
};

export default PrivacyPolicy;
