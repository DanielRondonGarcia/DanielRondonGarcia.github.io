export default function Introduction() {
  return (
    <section className="mb-8">
      <h1 className="text-6xl font-bold mb-4">{typeof process.env.NEXT_PUBLIC_NAME === 'string' ? process.env.NEXT_PUBLIC_NAME.replace(/"/g, '').trim() : 'Your Name'}</h1>
      <p className="text-xl mb-4">
        I'm a passionate system engineer,<br />
        and an automation virtuoso, weaving security into every pipeline,
        crafting resilience and efficiency like an award-winning author.
      </p>
      <p className="text-lg mb-2">
        Dive into, <span className="text-[var(--primary-color)] hover:underline cursor-pointer">DevSecOps</span>
      </p>
      <p className="text-lg mb-8">
        Explore my, <span className="text-[var(--primary-color)] hover:underline cursor-pointer">Portfolio</span>
      </p>
    </section>
  )
}