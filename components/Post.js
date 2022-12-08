import React from 'react'
import { useState } from 'react'
import Container from './Container'
import Popup from './Popup'

const Post = ({ post, from }) => {
    const [openPopup, setOpenPopup] = useState(false);
    const togglePopup = () =>{
        setOpenPopup(!openPopup)
    }
    return (
        <>
            <Container>
                <div className="post-wrapper">
                    <div className="post-details">
                        <h3>Details</h3>
                        <img src={post?.jobDetails?.companyLogo?.mediaItemUrl} alt="" />
                        <div className="details">
                            <div className="detail">
                                <div className="name">Vertragsart:</div>
                                <div className="value">{post?.jobDetails?.vertragsart}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Anstellungsart:</div>
                                <div className="value">{post?.jobDetails?.anstellungsart}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Ort:</div>
                                <div className="value">{post?.jobDetails?.ort}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Einrichtung:</div>
                                <div className="value">{post?.jobDetails?.einrichtung}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Ab wann:</div>
                                <div className="value">{post?.jobDetails?.abWann}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Zeitmodell:</div>
                                <div className="value">{post?.jobDetails?.zeitmodell}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Bundesland:</div>
                                <div className="value">{post?.jobDetails?.bundesland}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Region:</div>
                                <div className="value">{post?.jobDetails?.region}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Stellennummer:</div>
                                <div className="value">{post?.jobDetails?.stellennummer}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Tel:</div>
                                <div className="value">{post?.jobDetails?.tel}</div>
                            </div>
                            <div className="detail">
                                <div className="name">Website:</div>
                                <div className="value">{post?.jobDetails?.website}</div>
                            </div>
                        </div>
                    </div>
                    <div className="image-content">
                        <div className="post-image">
                            <img src={post?.featuredImage?.node?.mediaItemUrl} alt={post?.title} />
                        </div>
                        <div className="post-content">
                            <h1>{post?.title}</h1>
                            <div className="content" dangerouslySetInnerHTML={{ __html: post?.content }}></div>
                            <button onClick={togglePopup}>
                                <span>Jetzt Bewerben</span>
                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 0.75L6 6L0.75 11.25" stroke="white" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
           {
                openPopup &&
                <Popup togglePopup={togglePopup} title={post?.title} from={from}/>
           }
        </>
    )
}

export default Post