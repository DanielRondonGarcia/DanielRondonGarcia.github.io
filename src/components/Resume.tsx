import React from 'react';
import Image from 'next/image'
import ContentCard from './ContentCard';
import Timeline, { TimelineItem } from './Timeline';

const Resume = () => {
  return (
    <ContentCard subtitle="RESUME" title="MY JOURNEY">

      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-12 lg:col-span-6">

          <Timeline title="Summary">
            <TimelineItem title={process.env.NEXT_PUBLIC_NAME || 'RIKAM PALKAR'}>
              <p className="mb-4">DevOps and SRE with +3 years in CI/CD, automation, and vulnerability detection. Studying a master's in Cybersecurity. Collaborate in agile teams, passionate about efficiency, with QA experience and focus on continuous improvement.</p>
              <ul className="list-disc list-inside">
                <li>Bucaramanga, CO</li>
                <li>{process.env.NEXT_PUBLIC_EMAIL}</li>
              </ul>
            </TimelineItem>
          </Timeline>

          <Timeline title="Education">
            <TimelineItem
              title="MAESTRÍA OFICIAL EN CIBERSEGURIDAD"
              period="2024 - Present"
              location="Universidad Internacional de Valencia, España">
              <p>Auditing of information systems, Governance and management of information technologies, Development and implementation of systems, Protection of information assets.</p>
            </TimelineItem>
            <TimelineItem
              title="INGENIERÍA DE SISTEMAS"
              period="2017 - 2023"
              location="Universidad de Investigación y Desarrollo - UDI, Bucaramanga (Colombia)"
            >
              <p>Nivel 6 EQF-MEC</p>
            </TimelineItem>
          </Timeline>

        </div>

        <div className="col-span-12 lg:col-span-6">

          <Timeline title="Certifications">
            <TimelineItem
              title="CRASH COURSE ON PYTHON"
              period="2023"
              location="Coursera. Online"
            >
              <p>Certificado: <a href="https://www.coursera.org/account/accomplishments/certificate/H6MPJMV8K5TH" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">H6MPJMV8K5TH</a></p>
            </TimelineItem>
            <TimelineItem
              title="USING PYTHON TO INTERACT WITH OPERATING SYSTEM"
              period="2023"
              location="Coursera. Online"
            >
              <p>Certificado: <a href="https://www.coursera.org/account/accomplishments/certificate/I3WI7EG8HYCH" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">I3WI7EG8HYCH</a></p>
            </TimelineItem>
          </Timeline>

          <Timeline title="Professional Experience">
            <TimelineItem
              title="DEVOPS ENGINEER & QA LEAD / CYBERSECURITY"
              period="17/02/2022 - Present"
              location="ACTSIS LTDA, Bucaramanga, Colombia">
              <ul className="list-disc list-inside space-y-2">
                <li>Began as a Junior Developer for 6 months, specializing in PL/SQL Oracle for commercial systems.</li>
                <li>Advanced to DevOps Engineer and QA Lead role.</li>
                <li>Expanded responsibilities to include cybersecurity expertise.</li>
                <li>Conducted requirement analysis and ensured robust system performance.</li>
              </ul>
            </TimelineItem>
            <TimelineItem
              title="FULL-STACK ENGINEER"
              period="01/08/2019 - 01/02/2020"
              location="Conexión Educativa S.A.S, Bucaramanga, Colombia"
            >
              <ul className="list-disc list-inside space-y-2">
                <li>Developed CMS-based websites tailored for schools and the educational sector.</li>
                <li>Collaborated with a web development team to design, create, and deploy client-requested projects.</li>
                <li>Utilized CSS, HTML, JavaScript, PHP, and Java to build and enhance system functionalities.</li>
              </ul>
            </TimelineItem>
          </Timeline>
        </div>

      </div>
    </ContentCard>
  );
};

export default Resume;