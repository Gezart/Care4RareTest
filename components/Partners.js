import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Container from './Container'
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Partners = ({ backgroundImage, partnersTitle, partner }) => {
    return (
        <Container>
            <div className='partners' style={{ backgroundImage: `url(${backgroundImage?.mediaItemUrl})` }}>
                <h2>{partnersTitle}</h2>
                <Swiper className="mySwiper"
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            width: 640,
                            slidesPerView: 1,
                        },
                        768: {
                            width: 768,
                            slidesPerView: 3,
                        },
                        1200: {
                            width: 991,
                            slidesPerView: 4,
                        },

                    }}
                >
                    {
                        partner && partner.map((item, index) =>
                            <SwiperSlide key={index}>
                                <div className='partner'>
                                    <a href={item?.link?.url} target="_blank"><img src={item?.image?.mediaItemUrl} alt="partner image" /></a>
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </Container>
    )
}

export default Partners