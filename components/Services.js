import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import Container from './Container'


const Services = ({ services }) => {
    const [expanded, setExpanded] = useState(services[0].title)
    const [showContent, setShowContent] = useState(services[0].subservices[0].title)

    return (
        <Container>
            <div className="services-wrapper">
                <div>
                {
                    services && services.map((service, index) =>
                        <div className="services" key={index}>
                            <h2 onClick={() => setExpanded(service.title)}>{service.title}</h2>
                            {
                                expanded == service.title &&
                                <div className="subservice">
                                    {
                                        service.subservices && service.subservices.map((subservice, index) =>
                                            <h3 key={index} onClick={() => setShowContent(subservice.title)}>{subservice.title}</h3>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    )

                }
                </div>
                <div>
                {
                    services && services.map((service, index) =>
                        <div className="subservices-content hidden">
                            {
                                service.subservices && service.subservices.map((subservice, index) => {
                                    return (
                                        showContent == subservice.title && 
                                        <>
                                            <img src={subservice.image?.mediaItemUrl} />
                                            <div className="content" key={index} dangerouslySetInnerHTML={{ __html: subservice.content }} ></div>
                                        </>

                                    )
                                }
                                )
                            }
                        </div>
                    )

                }
                </div>

            </div>

        </Container>
    )
}



export default Services
