import Image from 'next/image'
import React from 'react'
import Container from './Container'

const TeamMember = ({ teamMember }) => {
    return (
        <Container>
            <div className="team-member">
                {
                    teamMember?.map((member, index) =>
                        <div className="member" key={index}>
                            <div className="image">
                                <img src={`${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${member?.profilePicture?.mediaDetails?.file}`} alt={member?.name} />
                            </div>
                            <div className="content">
                                <h3>{member?.name}</h3>
                                <p className="job-title">{member?.jobTitle}</p>
                                <p>{member?.biography}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </Container>
    )
}

export default TeamMember