import Head from 'next/head'
import Header from '@/components/Header'
import Introduction from '@/components/Introduction'
import SocialIcons from '@/components/SocialIcons'
import About from '@/components/About'
import Resume from '@/components/Resume'
import Projects from '@/components/Projects'
import Articles from '@/components/Articles'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AI from '@/components/AI'
import { useState, useEffect } from 'react'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black text-white relative overflow-hidden">
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME} - Portfolio</title>
        <meta name="description" content={`${process.env.NEXT_PUBLIC_NAME}'s portfolio`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>

      <div className="absolute inset-0 bg-[url('/curved-lines.svg')] bg-no-repeat bg-cover opacity-20"></div>

      <Header activeSection={activeSection} setActiveSection={setActiveSection} isScrolled={isScrolled} />

      <div className={`container mx-auto px-4 py-8 relative z-10 flex flex-col min-h-screen ${activeSection !== 'home' ? 'mt-20' : ''}`}>
        <main className="flex-grow flex flex-col justify-center">
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