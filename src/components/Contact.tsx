import emailjs from '@emailjs/browser';
import ContentCard from './ContentCard';
import SocialIcons from '@/components/SocialIcons'
import React, { useEffect, useState } from 'react';
import ContactInfoItem from './ContactInfoItem';
import Forms from './Forms';

const Contact: React.FC = () => {
  const [clientInfo, setClientInfo] = useState<{
    ip: string;
    userAgent: string;
    browserInfo: string;
  }>({ ip: 'Unknown', userAgent: 'Unknown', browserInfo: 'Unknown' });

  useEffect(() => {
    // Get user agent and browser info
    const userAgent = navigator.userAgent;
    const browserInfo = {
      browser: getBrowser(),
      os: getOS(),
      screenSize: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setClientInfo({
          ip: data.ip,
          userAgent,
          browserInfo: JSON.stringify(browserInfo)
        });
      })
      .catch(() => {
        setClientInfo({
          ip: 'Failed to retrieve',
          userAgent,
          browserInfo: JSON.stringify(browserInfo)
        });
      });
  }, []);

  // Helper function to detect browser
  const getBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
    if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
    if (userAgent.indexOf('Safari') > -1) return 'Safari';
    if (userAgent.indexOf('Edge') > -1) return 'Edge';
    if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) return 'Internet Explorer';
    return 'Unknown';
  };

  // Helper function to detect OS
  const getOS = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Win') > -1) return 'Windows';
    if (userAgent.indexOf('Mac') > -1) return 'MacOS';
    if (userAgent.indexOf('Linux') > -1) return 'Linux';
    if (userAgent.indexOf('Android') > -1) return 'Android';
    if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) return 'iOS';
    return 'Unknown';
  };

  const handleSubmit = async (formData: Record<string, string>) => {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      {
        from_name: formData.name,
        customer_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        client_ip: clientInfo.ip,
        user_agent: clientInfo.userAgent,
        browser_info: clientInfo.browserInfo
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
    );
  };

  return (
    <ContentCard subtitle="CONTACT" title="CONTACT ME">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <ContactInfoItem icon="fa-map-marker-alt" title="My Address">
            <p>{process.env.NEXT_PUBLIC_LOCATION}</p>
          </ContactInfoItem>
          <ContactInfoItem icon="fa-envelope" title="Email Me">
            <p>{process.env.NEXT_PUBLIC_EMAIL}</p>
          </ContactInfoItem>
          <ContactInfoItem icon="fa-share-alt" title="Connect with me">
            <SocialIcons withBackground={false} />
          </ContactInfoItem>
        </div>
        <div>
          <Forms
            fields={[
              {
                name: 'name',
                type: 'text',
                placeholder: 'Your Name',
                required: true
              },
              {
                name: 'email',
                type: 'email',
                placeholder: 'Your Email',
                required: true
              },
              {
                name: 'subject',
                type: 'text',
                placeholder: 'Subject',
                required: true
              },
              {
                name: 'message',
                type: 'textarea',
                placeholder: 'Message',
                required: true,
                rows: 5
              }
            ]}
            onSubmit={handleSubmit}
            submitButtonText="Send Message"
            loadingButtonText="Sending..."
            successMessage="Message sent successfully!"
          />
        </div>
      </div>
    </ContentCard>
  );
};

export default Contact;