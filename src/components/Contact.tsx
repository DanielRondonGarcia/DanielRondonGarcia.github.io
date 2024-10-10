import React, { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

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
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        },
        'YOUR_USER_ID' // Replace with your EmailJS user ID
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
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-green-500">CONTACT</h2>
        <h1 className="text-5xl font-bold mb-12">CONTACT ME</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <i className="fas fa-map-marker-alt text-green-500 mr-2"></i>
                My Address
              </h3>
              <p>Mumbai, India</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <i className="fas fa-envelope text-green-500 mr-2"></i>
                Email Me
              </h3>
              <p>rikampalkar@gmail.com</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <i className="fas fa-share-alt text-green-500 mr-2"></i>
                Connect with me
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-green-500"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-white hover:text-green-500"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white hover:text-green-500"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <i className="fas fa-code text-green-500 mr-2"></i>
                Let's code together
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-green-500"><i className="fab fa-github"></i></a>
                <a href="#" className="text-white hover:text-green-500"><i className="fab fa-stack-overflow"></i></a>
                <a href="#" className="text-white hover:text-green-500"><i className="fab fa-medium"></i></a>
              </div>
            </div>
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
                className="bg-green-500 text-black px-6 py-2 rounded font-bold hover:bg-green-600 transition-colors duration-300"
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
              {isSent && <p className="text-green-500 mt-2">Message sent successfully!</p>}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;