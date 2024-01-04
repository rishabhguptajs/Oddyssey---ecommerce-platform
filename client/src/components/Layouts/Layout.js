import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast';

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{minHeight : '80vh'}}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  )
};

Layout.defaultProps = {
  title: "Home | Oddyssey - Buy unique and niche wooden products, handmade by some of India's finest craftsmen",
  description: "We are a small business that sells handmade products",
  keywords: "handmade, products, unique, niche products, wooden, local handmade furniture",
  author: "Rishabh Gupta",
}

export default Layout
