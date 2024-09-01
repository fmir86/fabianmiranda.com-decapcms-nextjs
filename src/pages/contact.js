import Head from "next/head"
import Layout from "../components/Layout/Layout";
import styles from '../styles/contact.module.scss'
import Image from "next/image";


const Contact = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    await fetch('/__forms.html', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(formData).toString()
    });
    
}

  return (
    <Layout>
      <Head>
        <title>Contact | Fabian Miranda - Creative Technologist</title>
        <meta name="description" content={'About | Fabian Miranda - Creative Technologist'} />
      </Head>

      <div className={styles['page-wrapper']}>
        <div className="w-full text-white max-w-7xl mx-auto py-10 md:py-20 z-[1]">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">

          <div className="col-span-6 order-2 md:order-1">
            <h1>Contact Me</h1>

            <p>Contact me to tackle your digital production projects, web development needs, or any tech challenges. As an experienced full-stack developer and consultant I provide expert solutions to help bring your ideas to life. Let's connect and make your vision a reality.</p>

            <form 
              className={styles['form']} 
              onSubmit={handleSubmit}
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              name="contact-form"
              method="post"
              action="#"
            >                
              {/* You still need to add the hidden input with the form name to your JSX form */}
              <input type="hidden" name="form-name" value="contact-form" />

              <div className="flex flex-col md:flex-row gap-4">
                <input type="text" id="firstname" name="firstname" placeholder="Firstame" required/>
                <input type="text" id="lastname" name="lastname" placeholder="Lastname" required/>
              </div>

              <input type="email" id="email" name="email" placeholder="Email" required/>

              <textarea id="message" name="message" placeholder="Message" required>
              </textarea>

              <button type="submit">Submit</button>
            </form>   
          </div>        

          <div className="col-span-6 flex justify-center items-center order-1 md:order-2">
            <Image className={styles['main-img']} src={'/images/cyber-david.png'} width={435} height={513} alt="A futuristic version of Michelangelo's David" />
          </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact;