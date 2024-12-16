import React from 'react';

const Resume = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">RESUME</h2>
        <h1 className="text-5xl font-bold mb-8">MY JOURNEY</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Summary</h3>
            <div className="mb-8">
              <h4 className="text-xl font-bold text-green-400 mb-2">Daniel Rondón García</h4>
              <p className="mb-4">Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing applications for desktop, web and mobile platforms.</p>
              <ul className="list-disc list-inside">
                <li>Mumbai, India</li>
                <li>rikampalkar@gmail.com</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-4">Education</h3>
            <div className="mb-6">
              <h4 className="text-xl font-bold text-green-400 mb-2">MASTER OF COMPUTER APPLICATION</h4>
              <p className="font-bold">2015 - 2018</p>
              <p>VJTI, Mumbai</p>
              <p>Java, Python, Data structures & algorithms, Data science, Computer architecture.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-green-400 mb-2">BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</h4>
              <p className="font-bold">2010 - 2013</p>
              <p>Mumbai University</p>
              <p>.NET, IOT, Computer graphics.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Professional Experience</h3>
            <div className="mb-8">
              <h4 className="text-xl font-bold text-green-400 mb-2">SOFTWARE DEVELOPER II</h4>
              <p className="font-bold mb-2">April, 2021 - Present</p>
              <p className="mb-2">Weatherford</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Working with international team.</li>
                <li>Lead in the design, development, and implementation of the WPF & Blazor applications.</li>
                <li>Designing architecture for thin web client, & developing blazor components.</li>
                <li>Delegate and supervise tasks of the 3 members of the development team and provide counsel on all aspects of the project.</li>
                <li>Helped company to minimize project's budget cost by developing successful POCs and developing web app from the scratch.</li>
                <li>Nominated for 2022's star performer award by CEO.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-green-400 mb-2">SOFTWARE DEVELOPER</h4>
              <p className="font-bold mb-2">Oct, 2019 - Apr, 2021</p>
              <p className="mb-2">Datamatics</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Worked on Mumbai Metro and Lucknow Metro.</li>
                <li>Designing user interface in WPF for Ticket Vending Machine & Ticket Office Machine.</li>
                <li>Programming card readers, Token Dispensing Machine & Automatic Fare Collection.</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4">Publications & Certifications</h3>
        {/* Add your publications and certifications here */}
      </div>
    </div>
  );
};

export default Resume;