import md5 from 'md5'
import Image from 'next/image'
import ContentCard from './ContentCard';

export default function About() {
  const email = process.env.NEXT_PUBLIC_EMAIL || ''
  const gravatarHash = md5(email.toLowerCase().trim())
  const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?s=300`

  const skills = [
    { name: '.NET', level: 90 },
    { name: 'C#', level: 80 },
    { name: 'BLAZOR', level: 70 },
    { name: 'HTML', level: 50 },
    { name: 'CSS', level: 50 },
    { name: 'WEBAPI', level: 60 },
    { name: 'DevOps', level: 80 },
    { name: 'Unit Testing', level: 70 },
    { name: 'Automation', level: 90 },
    { name: 'SQL', level: 70 },
    { name: 'Docker', level: 80 },
    { name: 'Kubernetes', level: 70 },
  ]

  return (
    <ContentCard subtitle="ABOUT" title="LEARN MORE ABOUT ME" isTransparent={true}>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Image
              src={gravatarUrl}
              alt={process.env.NEXT_PUBLIC_NAME || 'Profile Picture'}
              width={300}
              height={300}
              className="rounded-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-green-400 text-center md:text-left">{process.env.NEXT_PUBLIC_OCCUPATION}</h3>
            <div className="grid grid-cols-1 gap-4">
              <p><span className="font-semibold">Degree:</span> {process.env.NEXT_PUBLIC_DEGREE}</p>
              <p><span className="font-semibold">College:</span> {process.env.NEXT_PUBLIC_COLLEGE}</p>
              <p><span className="font-semibold">City:</span> {process.env.NEXT_PUBLIC_LOCATION}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6 text-center">SKILLS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ContentCard>

  )
}