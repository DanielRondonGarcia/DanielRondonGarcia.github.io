import Head from 'next/head'
import AI from '@/components/AI'
import About from '@/components/About'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Articles from '@/components/Articles'
import Projects from '@/components/Projects'
import SocialIcons from '@/components/SocialIcons'
import Introduction from '@/components/Introduction'

export default function Home() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('home')
  
  // Función para cambiar sección y actualizar URL
  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    if (section === 'home') {
      router.push('/', undefined, { shallow: true })
    } else {
      router.push(`/#${section}`, undefined, { shallow: true })
    }
  }
  
  // Efecto para leer la URL inicial y establecer la sección activa
  useEffect(() => {
    const hash = router.asPath.split('#')[1]
    if (hash) {
      setActiveSection(hash)
    } else {
      setActiveSection('home')
    }
  }, [router.asPath])

  // Obtener el nombre correctamente del environment
  const getName = () => {
    const name = process.env.NEXT_PUBLIC_NAME
    if (typeof name === 'string') {
      return name.replace(/"/g, '').trim()
    }
    return 'Portfolio'
  }

  const name = getName()

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-gray-900 dark:text-white relative overflow-hidden">
      <Head>
        <title>{`${name} - Portfolio`}</title>
        <meta name="description" content={`${name}'s portfolio`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 bg-[url('/curved-lines.svg')] bg-no-repeat bg-cover text-black dark:text-white opacity-20"></div>

      <Header activeSection={activeSection} setActiveSection={handleSectionChange} isScrolled={false} />

      <div className={`container mx-auto px-4 py-8 relative z-10 flex flex-col min-h-screen ${activeSection !== 'home' ? 'mt-20' : ''}`}>
        <main className={`flex-grow flex flex-col ${activeSection === 'home' ? 'justify-center' : ''}`}>
          <div className={`transition-opacity duration-500 ${activeSection === 'home' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Introduction />
                <SocialIcons />
              </div>
              <div className="hidden md:block">
                {/* You can add an image or any other content here */}
              </div>
            </div>
          </div>
          <div className={`transition-opacity duration-500 ${activeSection === 'about' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <About />
          </div>
          <div className={`transition-opacity duration-500 ${activeSection === 'resume' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <Resume />
          </div>
          <div className={`transition-opacity duration-500 ${activeSection === 'projects' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <Projects />
          </div>
          <div className={`transition-opacity duration-500 ${activeSection === 'articles' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <Articles />
          </div>
          <div className={`transition-opacity duration-500 ${activeSection === 'AI' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <AI />
          </div>
          <div className={`transition-opacity duration-500 ${activeSection === 'contact' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <Contact />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}