import * as React from 'react'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import { graphql } from 'gatsby'
import Layout from "../components/Layout";

export default ({data: {markdownRemark: post}}) => {
    const disqusConfig = {
        identifier: post.id,
        title: post.frontmatter.title,
    };
    return (
        <Layout>
            <div className="bg-white">
                <div className="container m-auto p-4">
                    <h1 className="text-3xl mb-3">{post.frontmatter.title}</h1>
                    <CommentCount config={disqusConfig} placeholder={'...'} />
                    <h2 className="text-gray-500 text-sm mb-6"><i>{post.frontmatter.date}</i></h2>
                    <div className="text-base" dangerouslySetInnerHTML={{__html: post.html}} />
                    <div className="mt-5">
                        <Disqus config={disqusConfig} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      id
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY", locale: "fr")
      }
    }
  }
`;
