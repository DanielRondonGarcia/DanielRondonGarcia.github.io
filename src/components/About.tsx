import Image from 'next/image'

export default function About() {
  const skills = [
    { name: '.NET', level: 90 },
    { name: 'C#', level: 80 },
    { name: 'WPF', level: 70 },
    { name: 'BLAZOR', level: 70 },
    { name: 'HTML', level: 50 },
    { name: 'CSS', level: 50 },
    { name: 'WEBAPI', level: 60 },
    { name: 'DATA STRUCTURE & ALGORITHMS', level: 80 },
  ]

  return (
    <div className="space-y-12 max-w-4xl mx-auto bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">LEARN MORE ABOUT ME</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Image src="/profile-image.jpg" alt="Daniel Rondón García" width={300} height={300} className="rounded-lg" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-green-400 text-center md:text-left">Software Engineer</h3>
            <div className="grid grid-cols-1 gap-4">
              <p><span className="font-semibold">Degree:</span> Master of Computer Application</p>
              <p><span className="font-semibold">College:</span> VJTI</p>
              <p><span className="font-semibold">My books:</span> Blazor Simplified, WPF Simplified</p>
              <p><span className="font-semibold">Achievement:</span> Verified author on Medium</p>
              <p><span className="font-semibold">Award:</span> Most Valuable Professional C#Corner</p>
              <p><span className="font-semibold">Nomination:</span> LinkedIn Creator's program</p>
              <p><span className="font-semibold">Medium:</span> Verified Author</p>
              <p><span className="font-semibold">City:</span> Mumbai, India</p>
              <p><span className="font-semibold">LinkedIn:</span> Top Voice</p>
              <p><span className="font-semibold">Creator at:</span> DSA Simplified</p>
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
    </div>
  )
}