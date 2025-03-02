import emailjs from '@emailjs/browser';
import ContentCard from './ContentCard';
import SocialIcons from '@/components/SocialIcons'
import React, { useState, FormEvent } from 'react';
import ContactInfoItem from './ContactInfoItem';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError('');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );

      setIsSent(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 bg-gray-800 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 bg-gray-800 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-2 bg-gray-800 rounded"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Message"
                className="w-full p-2 bg-gray-800 rounded"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[var(--primary-color-500)] text-white px-6 py-2 rounded font-bold hover:bg-[var(--primary-color-600)] transition-colors duration-300"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            {isSent && <p className="text-[var(--primary-color-500)] mt-2">Message sent successfully!</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </ContentCard>
  );
};

export default Contact;