import Link from 'next/link'

export default function Introduction() {
  return (
    <section className="mb-8">
      <h1 className="text-6xl font-bold mb-4">{process.env.NEXT_PUBLIC_NAME}</h1>
      <p className="text-xl mb-4">
        I'm a passionate system engineer,<br />
        and an automation virtuoso, weaving security into every pipeline,
        crafting resilience and efficiency like an award-winning author.
      </p>
      <p className="text-lg mb-2">
        Dive into, <Link href="#" className="text-[var(--primary-color)] hover:underline">DevSecOps</Link>
      </p>
      <p className="text-lg mb-8">
        Explore my, <Link href="/portfolio" className="text-[var(--primary-color)] hover:underline">Portfolio</Link>
      </p>
    </section>
  )
}