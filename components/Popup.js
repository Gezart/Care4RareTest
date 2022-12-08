import React from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const Popup = ({ togglePopup, title, from }) => {
    const closePopup = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" fill="#fff" viewBox="0 0 460.775 460.775" style="enable-background:new 0 0 460.775 460.775;" xml:space="preserve"><path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/></svg>`

    const initialValues = {
        job: "",
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
    
        formData.append(`${from}`, title);
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("email", values.email);
        formData.append("message", values.message);
    
        await axios.post(`${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-json/contact-form-7/v1/contact-forms/578/feedback`, formData, {
          headers: {
            Authorization: `Basic ${process.env.NEXT_AUTH_TOKEN}`
          }
        });
    
        onSubmitProps.resetForm();
      };

    return (
        <>
            <div className="popup">
                <div className='popup-form'>
                <div className='close-popup' onClick={togglePopup} dangerouslySetInnerHTML={{__html: closePopup}}></div>
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
                                            <span>Bewerben</span>
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 0.75L6 6L0.75 11.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </button>
                                    </Form>
                                )



                            }}

                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

const TextError = () => {
    return (
      <p style={{ color: "red", marginTop: "5px" }}>This field is required</p>
    )
  }

export default Popup






