import Head from 'next/head';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import Text from '../components/Text';
import PlainText from '../components/PlainText';
import Services from '../components/Services';
import Partners from '../components/Partners';
import GoToJobs from '../components/GoToJobs';

export default function Home({ homeData, contactData, menu }) {
  let sections = homeData.sections.sections
  let mainMenu = menu?.edges[0]?.node?.menuItems?.nodes;
  let rightMenu = menu?.edges[1]?.node?.menuItems?.nodes;
  return (
    <>
      <Head>
        <title>Care4Rare</title>
        <link rel="icon" href="favicon.ico"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
      </Head>
      <Layout contactData ={contactData} mainMenu={mainMenu} rightMenu={rightMenu}>
          <main className='page page-home'>
            {
              sections?.map((section, index) => {
                  const typeName = section.__typename;
                  switch(typeName){
                  case 'Page_Sections_Sections_Banner':
                      return <Banner {...section} key={index}/>
                  case 'Page_Sections_Sections_Text':
                    return <Text {...section} key={index}/>
                  case 'Page_Sections_Sections_PlainText':
                    return <PlainText {...section} key={index}/>
                  case 'Page_Sections_Sections_Services':
                    return <Services {...section} contactData={contactData} key={index}/>
                  case 'Page_Sections_Sections_Partners':
                  return <Partners {...section}  key={index}/>
                  case 'Page_Sections_Sections_GoToJobs':
                    return <GoToJobs {...section}  key={index}/>
                      
                  default: 
                  return ''
                  
                  }              
              })
            }
          </main>
      </Layout>

    </>
  )
}

export async function getServerSideProps(){

  const homeQuery = gql`
  query homeQuery {
    pages(where: {title: "Home"}) {
      nodes {
        title
        slug
        uri
        sections {
          sections {
            ... on Page_Sections_Sections_Banner {
              bannerSize
              title
              content
              image {
                mediaItemUrl
                mediaDetails {
                  file
                }
              }
              bannerServices {
                icon
                title
                content
              }
            }
            ... on Page_Sections_Sections_Text {
              title
              content
            }
            ... on Page_Sections_Sections_PlainText {
              content
              button {
                title
                url
              }
              images {
                mediaDetails {
                  file
                }
              }
            }
            ... on Page_Sections_Sections_Services {
              services {
                title
                subservices {
                  title
                  content
                  image {
                    mediaItemUrl
                    mediaDetails {
                      file
                    }
                  }
                }
              }
            }
            ... on Page_Sections_Sections_Partners {
              partnersTitle
              backgroundImage {
                mediaItemUrl
              }
              partner {
                link {
                  url
                }
                image {
                  mediaItemUrl
                }
              }
            }
            ... on Page_Sections_Sections_GoToJobs {
              goToJobs {
                title
                link {
                  title
                  url
                }
                image {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
    acfOptionsThemeOption {
      themeOptions {
        logo
        footerDescription
        footerMenuTitle
        footerMenu {
          title {
            ... on Page {
              title
              uri
            }
          }
        }
        policyTitle
        policyMenu {
          title {
            ... on Page {
              title
              uri
            }
          }
        }
        locationIcon
        locationTitle
        location
        location2
        emailIcon
        emailTitle
        email {
          title
          url
        }
        phoneIcon
        phoneTitle
        phone {
          title
          url
        }
        mobileMenu {
          icon
          page {
            url
            title
          }
        }
      }
    }
    menus {
      edges {
        node {
          slug
          menuItems {
            nodes {
              uri
              label
            }
          }
        }
      }
    }
  }

  `

  const response = await client.query({
    query: homeQuery
  })
  const homeData = response?.data?.pages?.nodes[0]
   
  const contactData = response?.data?.acfOptionsThemeOption?.themeOptions
  const menu = response?.data?.menus
  return {
    props: {
      homeData,
      contactData, 
      menu
    }
  }
}
