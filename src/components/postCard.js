import React from "react"
import { Link } from "gatsby"
import imageUrlBuilder from "@sanity/image-url"
import client from "../client"
const builder = imageUrlBuilder(client)
function urlFor(_ref) {
  return builder.image(_ref)
}
export default props => {
  console.log("Post Card: ", props.node)
  const link = urlFor(props.node.images[0].asset._ref).url()
  console.log("Card Link: ", link)
  return (
    <article
      className={`post-card ${props.count % 3 === 0 && `post-card-large`} ${
        props.postClass
      } 
    ${urlFor(props.node.images[0].asset._ref) ? `with-image` : `no-image`}`}
      style={
        props.node.images[0].asset._ref && {
          backgroundImage: `url(${urlFor(
            props.node.images[0].asset._ref
          ).url()})`,
        }
      }
    >
      <Link to={`/${props.node.slug.current}`} className="post-card-link">
        <div className="post-card-content">
          <h2 className="post-card-title">{props.node.title}</h2>
        </div>
      </Link>
    </article>
  )
}
