import React from 'react'
// import { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Container from './Container';


const ContactForm = ({ title, content, contactData }) => {

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });


  const onSubmit = async (values, onSubmitProps) => {


    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("message", values.message);

    await axios.post(`${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-json/contact-form-7/v1/contact-forms/980/feedback`, formData, {
      headers: {
        Authorization: `Basic ${process.env.NEXT_AUTH_TOKEN}`
      }
    });

    onSubmitProps.resetForm();
  };

  return (
    <Container>
      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="content">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
          <div className="form-contact">
            <div className="contact-item">
              <div className="icon" dangerouslySetInnerHTML={{ __html: contactData?.locationIcon }}></div>
              <div className="item-content">
                <h3>{contactData?.locationTitle}</h3>
                <p>{contactData?.location}</p>
                <p>{contactData?.location2}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon" dangerouslySetInnerHTML={{ __html: contactData?.emailIcon }}></div>
              <div className="item-content">
                <h3>{contactData?.emailTitle}</h3>
                <a href={contactData?.email.url}>{contactData?.email?.title}</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon" dangerouslySetInnerHTML={{ __html: contactData?.phoneIcon }}></div>
              <div className="item-content">
                <h3>{contactData?.phoneTitle}</h3>
                <a href={contactData?.phone.url}>{contactData?.phone?.title}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="form">
          <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            {(formik) => {
              return (
                <Form className="name">

                  <div className="name">
                    <div className="form-data">
                      <label htmlFor="firstName">First Name</label>
                      <Field type="text" name="firstName" id="firstName" />
                      <ErrorMessage name="firstName" component={TextError} />

                    </div>

                    <div className="form-data">
                      <label htmlFor="lastName">Last Name</label>
                      <Field type="text" name="lastName" id="lastName" />
                      <ErrorMessage name="lastName" component={TextError} />

                    </div>
                  </div>
                  <div className="form-data">
                    <label htmlFor="email">Email</label>
                    <Field type="text" name="email" id="email" />
                    <ErrorMessage name="email" component={TextError} />

                  </div>

                  <div className="form-data">
                    <label htmlFor="message">Message</label>
                    <Field as="textarea" rows={5} name="message" id="message" />
                    <ErrorMessage name="message" component={TextError} />

                  </div>
                  <button type='submit'>
                    <span>Submit</span>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 0.75L6 6L0.75 11.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </Form>
              )



            }}

          </Formik>
        </div>
      </div>
    </Container>
  )
}

const TextError = () => {
  return (
    <p style={{ color: "red", marginTop: "5px" }}>This field is required</p>
  )
}

export default ContactForm
