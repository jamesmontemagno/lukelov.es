import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="Now" />
    <h1>Here's what I'm up to right now:</h1>
    <p>
      <a href="https://livefromquarantine.club">livefromquarantine.club</a> –
      Some musicians I like have been doing daily or weekly streams from home so
      I built this site to make it easy to jump between songs in different
      videos. (Over-)engineering the automated data pipeline for{" "}
      <a href="https://livefromquarantine.club/bengibbard">multiple</a>{" "}
      <a href="https://livefromquarantine.club/benfolds">artists</a> has been a
      fun distraction right now. I also used it as an excuse to learn how state
      machines and TypeScript work together and that was a wild ride.
    </p>
    <p>
      <a href="https://photos.lukelov.es">photos.lukelov.es</a> – A photo blog
      thing I forked from{" "}
      <a href="https://github.com/maxvoltar/photo-stream">@maxvoltar</a>. It's
      been a lot of fun to edit photos with VSCO on my phone and commit them
      with Working Copy and it deploys with Netlify. I like that I can do the
      whole thing from my phone.
    </p>
    <p>
      <a href="https://running.lukekarrys.com">running.lukekarrys.com</a> –
      Running is fun for me. Last year I set some big goals and that was fun but
      so far this year I've had fun chilling out with it. I built this site so I
      could easily switch between training "plans". Running helps my mental
      state and just having something written down helps me stick to it. I'm
      doing some easy "Rebuild" stuff right now and it's just what the
      quarantine ordered.
    </p>
    <p>
      <a href="https://resume.lukekarrys.com/index.pdf">my pdf resume</a> – I
      like editing my resume in Markdown but it's always helpful to have it as a
      PDF so I built the PDF generation with Playwright as part of the build
      process. It runs on GitHub Actions since it can run on macOS there and
      give me those good Apple fonts.
    </p>
    <p>
      <a href="https://lukecod.es">lukecod.es</a> &amp;{" "}
      <a href="https://lukelov.es">lukelov.es</a> – I moved both these site to
      Gatsby and Netlify. It's pretty great to have an all JavaScript build
      process on them and I love Netlify deploy previews. I did a little
      experiment between the default Gatsby, no-js Gatsby, and Turbolinks Gatsby
      and got to test them all side by side.
    </p>
  </Layout>
)

export default NotFoundPage