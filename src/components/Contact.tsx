import emailjs from '@emailjs/browser';
import ContentCard from './ContentCard';
import SocialIcons from '@/components/SocialIcons'
import React from 'react';
import ContactInfoItem from './ContactInfoItem';
import Forms from './Forms';

const Contact: React.FC = () => {
  const handleSubmit = async (formData: Record<string, string>) => {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
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