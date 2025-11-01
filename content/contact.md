---
title: "Contact | Fabian Miranda - Creative Technologist"
description: "Contact | Fabian Miranda - Creative Technologist"
heading: "Contact Me"
intro_text: "Contact me to tackle your digital production projects, web development needs, or any tech challenges. As an experienced full-stack developer and consultant I provide expert solutions to help bring your ideas to life. Let's connect and make your vision a reality."
main_image: "/images/encounter.png"
form:
  netlify: true
  honeypot: "bot-field"
  name: "contact"
  fields:
    - type: "text"
      id: "firstname"
      name: "firstname"
      placeholder: "Firstname"
      required: true
    - type: "text"
      id: "lastname"
      name: "lastname"
      placeholder: "Lastname"
      required: true
    - type: "email"
      id: "email"
      name: "email"
      placeholder: "Email"
      required: true
    - type: "select"
      id: "subject"
      name: "subject"
      placeholder: "I want to talk about..."
      required: true
      options:
        - "Web Development"
        - "Consulting"
        - "Digital Production"
        - "Other"
    - type: "textarea"
      id: "message"
      name: "message"
      placeholder: "Message"
      required: true
  submit_button: "Submit"
  success_message:
    title: "Thank you for your message."
    text: "I will get back to you as soon as possible."
  error_message:
    title: "An Error Happened."
    text: "There was an error sending your message. Please try again later."
---
