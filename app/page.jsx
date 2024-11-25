import React from 'react'
import Form from '../components/Form'
import Qpage from './post-question/page'
const Homepage = () => {
  return (
    <><section className="w-full flex flex-col items-center justify-center py-10 bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-50">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 text-center">
              Discover and Share!
              <br className="hidden md:block" />
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 text-center max-w-2xl">
              Your ultimate tool for exploring and sharing ideas, where you can find answers to your questions and contribute to a growing community of knowledge.
          </p>
      </section>
      <section>
        <Qpage />
      </section>
      </>
    

  )
}

export default Homepage