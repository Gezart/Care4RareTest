import { gql } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Banner from '../../components/Banner'
import Container from '../../components/Container'
import Layout from '../../components/Layout'
import Tabs from '../../components/Tabs'
import { client } from '../../lib/apollo'

const index = ({ jobs, blogOptions, contactData, menu }) => {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [countOfData, setCountOfData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState("");




  let mainMenu = menu?.edges[0]?.node?.menuItems?.nodes;
  let rightMenu = menu?.edges[1]?.node?.menuItems?.nodes;

  let jobSearchQuery = `
  query allJobs($bundesland: String = "", $offset: Int = 10, $search: String = "") {
    jobs(
      where: {bundesland: $bundesland, offsetPagination: {offset: $offset, size: 5}, search: $search}
    ) {
      pageInfo {
        offsetPagination {
          total
        }
      }
      nodes {
        title
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        jobDetails {
          bundesland
          abWann
        }
      }
    }
  }
  `
  let searchQueryVariables = { "offset": ((currentPage - 1) * 5), "search": search, "bundesland": location }

  const getData = async () => {
    try {
      let jobSearchData = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT}/graphql`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: jobSearchQuery,
            variables: searchQueryVariables
          })
        })

      let jobSearchDataJson = await jobSearchData.json();

      setJobsData(jobSearchDataJson.data.jobs.nodes);
      setCountOfData(jobSearchDataJson.data.jobs.pageInfo.offsetPagination.total);

      setNumberOfPages(Math.ceil(Number(jobSearchDataJson.data.jobs.pageInfo.offsetPagination.total) / 5));


      console.log('dataass', jobSearchDataJson)

    } catch (error) {

    }
  }


  useEffect(() => {

    getData();

  }, [search, location,currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  },[search, location])

  console.log('>>>>>>>>>>>', countOfData)

  console.log('>>>>>>>>>>>', numberOfPages)



  return (

    <Layout contactData={contactData} mainMenu={mainMenu} rightMenu={rightMenu}>
      <main className='page page-jobs'>
        <Banner title={blogOptions?.banner?.title} image={blogOptions?.banner?.image} />
        <Container>
          <Tabs jobsTitle={blogOptions?.jobsTitle} trainingTitle={blogOptions?.trainingTitle} />
          <div className="job-header">
            <div className="jobs-header-content" dangerouslySetInnerHTML={{ __html: blogOptions?.jobsHeader }}></div>
            <div className="search-filters">
              <input type="text" placeholder="Berufsbezeichnung oder nummer" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} />
              <input type="text" placeholder="PLZ oder Ort" value={location} onChange={(e) => setLocation(e.target.value.toLowerCase())} />
            </div>
          </div>
          <div className="all-jobs items">
            {



              jobsData?.map((job, index) =>
                <div className="job-item item" key={index}>
                  <div className="item-image">
                    {
                      job?.featuredImage &&
                      <img src={job?.featuredImage?.node?.mediaItemUrl} alt={job.title} />
                    }
                  </div>
                  <div className="item-content">
                    <h3>{job?.title}</h3>
                    <div className="job-details">
                      <div className="detail-item">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.714 11.8807C11.9864 12.6083 10.5188 14.0758 9.41335 15.1813C8.6323 15.9624 7.36751 15.9623 6.58646 15.1813C5.50084 14.0957 4.06038 12.6552 3.28587 11.8807C0.682378 9.27722 0.682378 5.05612 3.28587 2.45262C5.88937 -0.150874 10.1105 -0.150874 12.714 2.45262C15.3175 5.05612 15.3175 9.27722 12.714 11.8807Z" stroke="#4C9D10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.4999 7.16667C10.4999 8.54738 9.38063 9.66667 7.99992 9.66667C6.61921 9.66667 5.49992 8.54738 5.49992 7.16667C5.49992 5.78596 6.61921 4.66667 7.99992 4.66667C9.38063 4.66667 10.4999 5.78596 10.4999 7.16667Z" stroke="#4C9D10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p>{job?.jobDetails?.bundesland}</p>
                      </div>
                      <div className="detail-item">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66667 3.83333V0.5M11.3333 3.83333V0.5M3.83333 7.16667H12.1667M2.16667 15.5H13.8333C14.7538 15.5 15.5 14.7538 15.5 13.8333V3.83333C15.5 2.91286 14.7538 2.16667 13.8333 2.16667H2.16667C1.24619 2.16667 0.5 2.91286 0.5 3.83333V13.8333C0.5 14.7538 1.24619 15.5 2.16667 15.5Z" stroke="#4C9D10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <p>{job?.jobDetails?.abWann}</p>
                      </div>
                      <div className="link-to-post">
                        <Link href={`/jobs/${job?.slug}`}><a>Jetzt bewerben</a></Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

          </div>
          <div className="pagination">
            {
              [...Array(numberOfPages).keys()].map((item, index) => {
                return <div key={index} onClick={() => setCurrentPage(item + 1)}>{item + 1}</div>
              })

            }
          </div>
        </Container>
      </main>
    </Layout>
  )
}

export default index

export async function getServerSideProps({ params }) {

  const allJobs = gql`
      query allJobs($bundesland: String = "", $search: String = "") {
        jobs(where: {bundesland: $bundesland, search: $search, offsetPagination: {size: 12, offset: 0 }}) {
          pageInfo{
            offsetPagination{
              total
            }
          }
          nodes {
            title
            slug
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            jobDetails {
              bundesland
              abWann
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
        acfOptionsThemeOption {
            themeOptions {
              logo
              footerDescription
              footerMenuTitle
              footerMenu {
                title{
                  ...on Page{
                    title
                    uri
                  }
                }
              }
              policyTitle
              policyMenu{
                title{
                  ...on Page{
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
    query: allJobs,
    variables: {
      bundesland: params?.location,
      search: params?.search
    }
  })

  const jobs = response?.data?.jobs?.nodes
  const blogOptions = response?.data?.acfOptionsJobsOption?.blogOptions
  const contactData = response?.data?.acfOptionsThemeOption?.themeOptions
  const menu = response?.data?.menus
  return {
    props: {
      jobs,
      blogOptions,
      contactData,
      menu
    }
  }

}
