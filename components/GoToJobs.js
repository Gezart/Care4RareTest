import Link from 'next/link'
import React from 'react'
import Container from './Container'

const GoToJobs = ({ goToJobs }) => {
    return (
        <Container>
            <div className="gotojobs">
                {
                    goToJobs && goToJobs.map((item, index) =>
                        <div className="item" key={index}>
                            <img src={item?.image?.mediaItemUrl} alt="go to jobs image" />
                            <h3>{item.title}</h3>
                            <div className="link-to-jobs">
                                <Link href={item?.link?.url}><a>
                                    <span>{item?.link?.title}</span>
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L19 8M19 8L12 15M19 8L1 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </a></Link>
                            </div>
                        </div>
                    )

                }
            </div>
        </Container>
    )
}

export default GoToJobs