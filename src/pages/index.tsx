import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import "../styles/index.scss"
import Carousel from "../components/Carousel";
import InputForm from "../components/InputForm";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <InputForm />
      <Carousel />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Random Anime Picker</title>
