import { useState } from "react";
import Head from "next/head"
import Layout from "../components/Layout/Layout";
import Popup from '../components/Popup/Popup';
import styles from '../styles/contact.module.scss'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const Contact = () => {

  const [popupContent, setPopupContent] = useState(null);

  const successMsg = (
    <>
      <h3 className="text-2xl fon-thin uppercase text-lightblue mb-4">Thank you for your message.</h3>
      <p className="text-base fon-thin">I will get back to you as soon as possible.</p>
    </>
  );

  const errorMsg = (
    <>
      <h3 className="text-2xl fon-thin uppercase text-magenta mb-4">An Error Happened.</h3>
      <p className="text-base fon-thin">There was an error sending your message. Please try again later.</p>
    </>
  );

  const submitForm = (event)=> {
    event.preventDefault()

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    }).then(() => {
       console.log("Form successfully submitted")
       setPopupContent(successMsg)
       myForm.reset();
       window.scrollTo(0, 0, 'smooth');
    }).catch((error) => {
      setPopupContent(errorMsg)
    })
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
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              name="contact"
              method="post"
              action="#"
              onSubmit={submitForm}
          >                
              {/* You still need to add the hidden input with the form name to your JSX form */}
              <input type="hidden" name="form-name" value="contact" />

              <div className="flex flex-col md:flex-row gap-4">
                <input type="text" id="firstname" name="firstname" placeholder="Firstame" required/>
                <input type="text" id="lastname" name="lastname" placeholder="Lastname" required/>
              </div>

              <input type="email" id="email" name="email" placeholder="Email" required/>

              <div class={styles['custom-select']}>
                <select id="subject" name="subject" required>
                  <option value="" disabled selected>I want to talk about...</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Digital Production">Digital Production</option>
                  <option value="Other">Other</option>
                </select>
                <FontAwesomeIcon icon={faChevronDown} className={styles['custom-arrow']} />
              </div>

              <textarea id="message" name="message" placeholder="Message" required></textarea>

              <button type="submit">Submit</button>
            </form>   
          </div>        

          <div className="col-span-6 flex justify-center items-center order-1 md:order-2">
            <Image className={styles['main-img']} src={'/images/encounter.png'} width={435} height={513} alt="" />
          </div>

          </div>
        </div>
      </div>

      {popupContent && <Popup content={popupContent} onClose={() => setPopupContent(null) }/>}
    </Layout>
  )
}

export default Contact;