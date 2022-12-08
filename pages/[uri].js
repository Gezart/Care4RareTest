import { gql } from '@apollo/client';
import Head from 'next/head'
import Banner from '../components/Banner';
import ContactForm from '../components/ContactForm';
import Layout from '../components/Layout';
import PlainText from '../components/PlainText';
import Services from '../components/Services';
import TeamMember from '../components/TeamMember';
import Text from '../components/Text';
import { client } from '../lib/apollo';

export default function SlugPage({ page, contactData, menu }) {
  let sections = page?.sections?.sections
  let mainMenu = menu?.edges[0]?.node?.menuItems?.nodes;
  let rightMenu = menu?.edges[1]?.node?.menuItems?.nodes;
  return (
    <div>
      <Head>
        <title>{page?.title} - Care4Rare</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <Layout contactData = {contactData}  mainMenu={mainMenu} rightMenu={rightMenu}>
        <main className={`page page-${page?.slug}`}>
          {
           sections && sections.map((section, index) => {
              const typeName = section.__typename;
              switch (typeName) {
                case 'Page_Sections_Sections_Banner':
                  return <Banner {...section} key={index} />
                case 'Page_Sections_Sections_Text':
                  return <Text {...section} key={index} />
                case 'Page_Sections_Sections_PlainText':
                  return <PlainText {...section} key={index}/>
                case 'Page_Sections_Sections_TeamMembers':
                  return <TeamMember {...section} key={index}/>
                case 'Page_Sections_Sections_ContactForm':
                  return <ContactForm {...section} contactData={contactData} key={index}/>
                case 'Page_Sections_Sections_Services':
                  return <Services {...section} contactData={contactData} key={index}/>

                default:
                  return ''

              }
            })
          }

        </main>
      </Layout>
    </div>
  )
}


export async function getStaticProps({ params }) {
  const GET_PAGES_BY_URI = gql`
  query GetAllPages($id: ID!) {
    page(idType: URI, id: $id) {
      title
      slug
      uri
      sections {
        sections {
          ... on Page_Sections_Sections_Banner {
            title
            content
            image {
              mediaItemUrl
              mediaDetails {
                file
              }
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
          ... on Page_Sections_Sections_TeamMembers {
            teamMember {
              name
              jobTitle
              biography
              profilePicture {
                mediaDetails {
                  file
                }
              }
            }
          }
          ... on Page_Sections_Sections_ContactForm {
            title
            content
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
    query: GET_PAGES_BY_URI,
    variables: {
      id: params.uri
    }
  })
  const page = response?.data?.page
  const contactData = response?.data?.acfOptionsThemeOption?.themeOptions
  const menu = response?.data?.menus
  return {
    props: {
      page,
      contactData,
      menu
    }
  }
}

export async function getStaticPaths() {
  const paths = []
  return {
    paths,
    fallback: 'blocking'
  }
}

