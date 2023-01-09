import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Style } from "util";

type Props = {
  children: any;
  style?: Object;
  className?: string;
};

const BgImage = ({children, style, className}: Props) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "bg.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div style={{ ...style, position: "relative" }} className={className}>
      {children}
      <Img
        fluid={data.file.childImageSharp.fluid}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default BgImage;
