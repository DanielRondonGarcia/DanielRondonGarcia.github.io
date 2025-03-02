import React from 'react';
import Image from 'next/image'
import ContentCard from './ContentCard';
import Timeline, { TimelineItem } from './Timeline';

const Resume = () => {
  return (
    <ContentCard subtitle="RESUME" title="MY JOURNEY">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Timeline title="Summary">
              <TimelineItem title={process.env.NEXT_PUBLIC_NAME || 'RIKAM PALKAR'}>
                <p className="mb-4">Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing applications for desktop, web and mobile platforms.</p>
                <ul className="list-disc list-inside">
                  <li>Mumbai, India</li>
                  <li>rikampalkar@gmail.com</li>
                </ul>
              </TimelineItem>
            </Timeline>

            <Timeline title="Education">
              <TimelineItem 
                title="MASTER OF COMPUTER APPLICATION"
                period="2015 - 2018"
                location="VJTI, Mumbai"
              >
                <p>Java, Python, Data structures & algorithms, Data science, Computer architecture.</p>
              </TimelineItem>
              <TimelineItem 
                title="BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY"
                period="2010 - 2013"
                location="Mumbai University"
              >
                <p>.NET, IOT, Computer graphics.</p>
              </TimelineItem>
            </Timeline>
          </div>

          <div>
            <Timeline title="Professional Experience">
              <TimelineItem 
                title="SOFTWARE DEVELOPER II"
                period="April, 2021 - Present"
                location="Weatherford"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>Working with international team.</li>
                  <li>Lead in the design, development, and implementation of the WPF & Blazor applications.</li>
                  <li>Designing architecture for thin web client, & developing blazor components.</li>
                  <li>Delegate and supervise tasks of the 3 members of the development team and provide counsel on all aspects of the project.</li>
                  <li>Helped company to minimize project's budget cost by developing successful POCs and developing web app from the scratch.</li>
                  <li>Nominated for 2022's star performer award by CEO.</li>
                </ul>
              </TimelineItem>
              <TimelineItem 
                title="SOFTWARE DEVELOPER"
                period="Oct, 2019 - Apr, 2021"
                location="Datamatics"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>Worked on Mumbai Metro and Lucknow Metro.</li>
                  <li>Designing user interface in WPF for Ticket Vending Machine & Ticket Office Machine.</li>
                  <li>Programming card readers, Token Dispensing Machine & Automatic Fare Collection.</li>
                </ul>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
    </ContentCard>
  );
};

export default Resume;