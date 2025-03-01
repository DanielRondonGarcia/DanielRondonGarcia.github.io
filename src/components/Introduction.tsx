import Link from 'next/link'

export default function Introduction() {
  return (
    <section className="mb-8">
      <h1 className="text-6xl font-bold mb-4">{process.env.NEXT_PUBLIC_NAME}</h1>
      <p className="text-xl mb-4">
        I'm a passionate system engineer,<br />
        & an automation virtuoso, weaving security into every pipeline,
        like an award-winning author crafting resilience and efficiency.
      </p>
      <p className="text-lg mb-2">
        Dive into, <Link href="/blazor-simplified" className="text-green-400 hover:underline">DevSecOps</Link>
      </p>
      <p className="text-lg mb-8">
        Explore my, <Link href="/portfolio" className="text-green-400 hover:underline">Portfolio</Link>
      </p>
    </section>
  )
}