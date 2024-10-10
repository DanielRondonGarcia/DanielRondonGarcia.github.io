export default function Skills() {
  const skills = ['JavaScript', 'React', 'Next.js', 'Node.js', 'CSS', 'HTML']

  return (
    <section id="skills" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-10">My Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="bg-white p-4 rounded shadow text-center">
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}