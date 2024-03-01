import React from 'react'
import Layout from '../components/Layouts/Layout'

const About = () => {
  return (
    <Layout title={"About Us | Oddyssey"} description={"Discover the coolest finds at Oddyssey - your one-stop-shop for all things awesome! 🌟 Shop now for trendy gear, gadgets, and more. Unleash the shopping spree! 🛍️💫"}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">About us</h1>
          <p className="text-lg mb-8">Discover the coolest finds at Oddyssey - your one-stop-shop for all things awesome! 🌟 Shop now for trendy gear, gadgets, and more. Unleash the shopping spree! 🛍️💫</p>

          <h2 className="text-2xl font-bold mb-4">Our mission</h2>

          <p className="text-lg mb-8">Our mission is to provide you with the best shopping experience possible. We want to make sure you have access to the latest and greatest products, all in one place. We're constantly updating our inventory, so you'll always find something new and exciting to add to your collection.</p>

          <h2 className="text-2xl font-bold mb-4">About developer</h2>

          <p className="text-lg mb-8">
            This website is developed by Rishabh Gupta. He is a full stack web developer and has a passion for creating beautiful and functional websites. He has a background in computer science and a love for all things tech. He's always looking for new ways to improve his skills and learn new things, and he's excited to share his work with you. You can find him on <a href="github.com/rishabhguptajs" className="text-blue-500">GitHub</a> and <a href="linkedin.com/in/rishabhguptajs" className="text-blue-500">LinkedIn</a>.
          </p>

          <h2 className="text-2xl font-bold mb-4">Contact us</h2>

          <p className="text-lg mb-8">If you have any questions or concerns, please don't hesitate to contact us. We're here to help you in any way we can, and we're always happy to hear from our customers. You can reach us by email at <a href="mailto:rishabhgupta4523@gmail.com" className="text-blue-500">here</a> or by phone at 123-456-7890.</p>
        </div>
    </Layout>
  )
}

export default About
