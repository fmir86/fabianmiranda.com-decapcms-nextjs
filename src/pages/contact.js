import { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO/SEO";
import SchemaMarkup from "../components/SEO/SchemaMarkup";
import Popup from '../components/Popup/Popup';
import NetworkBackground from '../components/NetworkBackground/NetworkBackground';
import styles from '../styles/contact.module.scss'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { loadHeaderData, loadFooterData } from "../libs/loadGlobalData";
import useIsMobile from "../hooks/useIsMobile";
import gsap from "gsap";

const Contact = ({ headerData, footerData }) => {
  const isMobile = useIsMobile();
  const [popupContent, setPopupContent] = useState(null);
  
  const formColumnRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!formRef.current || !titleRef.current) return;

    const inputsToAnimate = gsap.utils.toArray(formRef.current.querySelectorAll("[data-animate]"));

    gsap.killTweensOf([titleRef.current, textRef.current, ...inputsToAnimate]);

    // Initial State
    gsap.set([titleRef.current, textRef.current], { opacity: 0, y: 10 });
    gsap.set(inputsToAnimate, { opacity: 0, y: 10 });
    gsap.set(formColumnRef.current, { visibility: "visible" });

    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Title
    tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "expo.out"
    });

    // 2. Description
    tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "expo.out"
    }, "-=0.3");

    // 3. All form fields including button - same burn effect
    if (inputsToAnimate.length > 0) {
        const inputTl = gsap.timeline();

        inputTl.to(inputsToAnimate, {
            opacity: 1,
            y: 0,
            borderColor: "#26d6fc",
            boxShadow: "0 0 35px #26d6fc, inset 0 0 15px #26d6fc",
            backgroundColor: "rgba(38, 214, 252, 0.3)",
            color: "#26d6fc",
            duration: 0.7,
            ease: "expo.out",
            stagger: (i, target) => {
                // Extra delay for button (last element)
                const baseDelay = i * 0.07;
                return target.tagName === "BUTTON" ? baseDelay + 0.15 : baseDelay;
            }
        })
        .to(inputsToAnimate, {
            borderColor: "transparent",
            boxShadow: "none",
            backgroundColor: (i, target) => target.tagName === "BUTTON" ? "#26d6fc" : "rgba(35,35,35,0.8)",
            color: (i, target) => target.tagName === "BUTTON" ? "black" : "white",
            duration: 0.6,
            ease: "expo.out",
            stagger: (i, target) => {
                return target.tagName === "BUTTON" ? (i * 0.07) + 0.15 : i * 0.07;
            },
            clearProps: "borderColor,boxShadow",
            onComplete: () => {
                // Clear inline backgroundColor from button so CSS hover works
                const btn = formRef.current.querySelector("button");
                if (btn) {
                    btn.style.backgroundColor = "";
                    btn.style.color = "";
                }
            }
        }, "<0.1");

        tl.add(inputTl, "-=0.25");
    }

    return () => {
        tl.kill();
    };
  }, []);

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
        <NetworkBackground />
        <div className={styles['content-wrapper']}>
          <div className={styles['grid-layout']}>
          <div className={styles['form-column']} ref={formColumnRef} style={{visibility: 'hidden'}}>
            <h1 ref={titleRef}>Contact Me</h1>
            <p ref={textRef}>Contact me to tackle your digital production projects, web development needs, or any tech challenges. As an experienced full-stack developer and consultant I provide expert solutions to help bring your ideas to life. Let's connect and make your vision a reality.</p>

            <form 
              className={styles['form']} 
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              name="contact"
              method="post"
              action="#"
              onSubmit={submitForm}
              ref={formRef}
          >                
              <input type="hidden" name="form-name" value="contact" />
              <div className={styles['name-row']}>
                <input data-animate="true" type="text" id="firstname" name="firstname" placeholder="First Name *" required aria-required="true"/>
                <input data-animate="true" type="text" id="lastname" name="lastname" placeholder="Last Name *" required aria-required="true"/>
              </div>
              <input data-animate="true" type="email" id="email" name="email" placeholder="Email *" required aria-required="true"/>
              <div className={styles['custom-select']} data-animate="true">
                <select id="subject" name="subject" required defaultValue="">
                  <option value="" disabled>I want to talk about... *</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Digital Production">Digital Production</option>
                  <option value="Other">Other</option>
                </select>
                <FontAwesomeIcon icon={faChevronDown} className={styles['custom-arrow']} size="sm" />
              </div>
              <textarea data-animate="true" id="message" name="message" placeholder="Message *" required aria-required="true"></textarea>
              <button data-animate="true" type="submit">Submit</button>
            </form>   
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
