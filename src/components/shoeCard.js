import React from "react"
import { Link } from "gatsby"
import imageUrlBuilder from "@sanity/image-url"
import client from "../client"
import MediaQuery from "react-responsive"
const builder = imageUrlBuilder(client)
function urlFor(_ref) {
  return builder.image(_ref)
}
export default props => {
  return (
    <React.Fragment>
      <MediaQuery maxWidth={768}>
        {matches =>
          matches ? (
            <article
              className={`post-card ${`post-card-large`} ${props.postClass} 
    ${urlFor(props.node.mainImage.asset._ref) ? `with-image` : `no-image`}`}
              style={
                props.node.mainImage.asset._ref && {
                  backgroundImage: `url(${urlFor(
                    props.node.mainImage.asset._ref
                  ).url()})`,
                }
              }
            >
              <Link
                to={`/${props.node.slug.current}`}
                className="post-card-link"
              >
                <div className="post-card-content">
                  <h2 className="post-card-title">{props.node.title}</h2>
                </div>
              </Link>
            </article>
          ) : (
            // Large size info below
            <article
              className={`post-card ${false && `post-card-large`}} ${
                props.postClass
              } 
    ${urlFor(props.node.mainImage.asset._ref) ? `with-image` : `no-image`}`}
              style={
                props.node.mainImage.asset._ref && {
                  backgroundImage: `url(${urlFor(
                    props.node.mainImage.asset._ref
                  ).url()})`,
                }
              }
            >
              <Link
                to={`/${props.node.slug.current}`}
                className="post-card-link"
              >
                <div className="post-card-content">
                  <h2 className="post-card-title">{props.node.title}</h2>
                </div>
              </Link>
            </article>
          )
        }
      </MediaQuery>
    </React.Fragment>
  )
}
