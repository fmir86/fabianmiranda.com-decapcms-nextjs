import { useState } from "react";
import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import SchemaMarkup from "../components/SEO/SchemaMarkup";
import Popup from '../components/Popup/Popup';
import styles from '../styles/contact.module.scss'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";
import useIsMobile from "../hooks/useIsMobile";



const Contact = ({ headerData, footerData }) => {
  const isMobile = useIsMobile();
  const [popupContent, setPopupContent] = useState(null);

  const successMsg = (
    <>
      <h3 className={styles['popup-title-success']}>Thank you for your message.</h3>
      <p className={styles['popup-text']}>I will get back to you as soon as possible.</p>
    </>
  );

  const errorMsg = (
    <>
      <h3 className={styles['popup-title-error']}>An Error Happened.</h3>
      <p className={styles['popup-text']}>There was an error sending your message. Please try again later.</p>
    </>
  );

  const submitForm = (event)=> {
    event.preventDefault()

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/__forms.html", {
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
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title="Contact | Fabian Miranda - Creative Technologist"
        description="Get in touch for your digital production projects, web development needs, or tech challenges. Expert solutions from an experienced full-stack developer and consultant."
        image="/images/encounter.png"
      />
      <SchemaMarkup
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact' }
        ]}
      />

      <div className={styles['page-wrapper']}>
        <div className={styles['content-wrapper']}>

          <div className={styles['grid-layout']}>

          <div className={styles['form-column']}>
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

              <div className={styles['name-row']}>
                <input type="text" id="firstname" name="firstname" placeholder="First Name *" required aria-required="true"/>
                <input type="text" id="lastname" name="lastname" placeholder="Last Name *" required aria-required="true"/>
              </div>

              <input type="email" id="email" name="email" placeholder="Email *" required aria-required="true"/>

              <div className={styles['custom-select']}>
                <select id="subject" name="subject" required defaultValue="">
                  <option value="" disabled>I want to talk about... *</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Digital Production">Digital Production</option>
                  <option value="Other">Other</option>
                </select>
                <FontAwesomeIcon icon={faChevronDown} className={styles['custom-arrow']} size="sm" />
              </div>

              <textarea id="message" name="message" placeholder="Message *" required aria-required="true"></textarea>

              <button type="submit">Submit</button>
            </form>   
          </div>        

          <div className={styles['image-column']}>
            <Image
              className={styles['main-img']}
              src={'/images/encounter.png'}
              width={350}
              height={413}
              alt="Contact Fabian Miranda for AI consulting and web development services"
              sizes="(max-width: 768px) 100vw, 350px"
              quality={isMobile ? 50 : 100}
            />
          </div>

          </div>
        </div>
      </div>

      {popupContent && <Popup content={popupContent} onClose={() => setPopupContent(null) }/>}
    </Layout>
  )
}

export async function getStaticProps() {
  const headerData = loadHeaderData();
  const footerData = loadFooterData();

  return {
    props: {
      headerData,
      footerData
    }
  };
}

export default Contact;