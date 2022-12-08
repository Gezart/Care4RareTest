import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from './Container';
import 'swiper/css';
import Link from 'next/link';


const Banner = ({ title, content, image, bannerSize, bannerServices, }) => {
  let bgImage = `http://13.38.32.150/wp-content/uploads/${image.mediaDetails.file}`
  const myLoader = () => {
    return `${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/wp-content/uploads/${image.mediaDetails.file}`;
  }
  return (
    <div className={`banner ${bannerSize}`} style={{ backgroundImage: `url(${image?.mediaItemUrl})` }}>
      <Container>
        <div className="banner-content">
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
        <div className="banner-services">
          <Swiper
            breakpoints={{
              640: {
                width: 640,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 2,
              },
              1200: {
                width: 1200,
                slidesPerView: 3,
              },

            }}
            autoHeight="true"
            spaceBetween={20}
          >
            {
              bannerServices?.map((service, index) =>
                <SwiperSlide key={index}>
                  <div className="service-content">
                    <Link href="/services">
                      <div className='link-to-services'>
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L19 8M19 8L12 15M19 8L1 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </Link>
                    <h3>{service.title}</h3>
                    <div className="icon" dangerouslySetInnerHTML={{ __html: service.icon }}></div>
                    <p>{service.content}</p>
                  </div>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>
      </Container>
    </div>
  )
}

export default Banner
