import { gql } from '@apollo/client';
import React from 'react'
import Banner from '../../components/Banner';
import Layout from '../../components/Layout';
import Post from '../../components/Post';
import { client } from '../../lib/apollo';

const Training = ({ training, blogOptions, contactData, menu }) => {
  let mainMenu = menu?.edges[0]?.node?.menuItems?.nodes;
  let rightMenu = menu?.edges[1]?.node?.menuItems?.nodes;
  return (
    <Layout contactData={contactData} mainMenu={mainMenu} rightMenu={rightMenu}>
      <main className='post post-job'>
        <Banner title={blogOptions?.banner?.title} image={blogOptions?.banner?.image} />
        <Post post={training} from={"training"} />
      </main>
    </Layout>
  )
}

export default Training

export async function getStaticProps({ params }) {
  const GET_POSTS_BY_URI = gql`
    query NewQuery($id: ID!) {
        training(id: $id, idType: URI) {
          title
          content
          uri
          date
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          jobDetails{
            companyLogo{
              mediaItemUrl
            }
            vertragsart
            anstellungsart
            ort
            einrichtung
            abWann
            zeitmodell
            bundesland
            region
            stellennummer
            tel
            website
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
        menus{
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
        acfOptionsJobsOption {
            blogOptions {
              banner {
                title
                image {
                  mediaItemUrl
                  mediaDetails {
                    file
                  }
                }
              }
              jobsTitle {
                title
                url
              }
              jobsHeader
              trainingTitle {
                title
                url
              }
            }
        }
      }
    `
  const response = await client.query({
    query: GET_POSTS_BY_URI,
    variables: {
      id: params.uri
    }
  })
  const training = response?.data?.training
  const blogOptions = response?.data?.acfOptionsJobsOption?.blogOptions
  const contactData = response?.data?.acfOptionsThemeOption?.themeOptions
  const menu = response?.data?.menus
  return {
    props: {
      training,
      blogOptions,
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