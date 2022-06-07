import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/Date';
// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css';

/*
  getStaticProps and getStaticPaths run only 
  on the server-side and will never run on the client-side. Moreover, these 
  functions will not be included in the JS bundle for the browser. That 
  means you can write code such as direct database queries without sending 
  them to browsers. Read the Writing Server-Side code documentation to learn more.
*/

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }