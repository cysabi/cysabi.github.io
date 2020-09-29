import React from "react"

import Layout from "src/components/Layout"
import HeaderButton from "src/components/HeaderButton"

const Index = () => (
  <Layout>
    <Hero />
    <div class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-narrow mr-4">
            <img
              style={{ borderRadius: "50%", maxWidth: "none", height: "10em" }}
              src="https://assets.lepto.tech/LeptoFlare/icon.png"
              alt=""
            />
          </div>
          <div class="column is-6">
            <h2>I'm a...</h2>
            <p class="is-size-5">
              Junior open source software developer / Backstage player for the
              competitive Splatoon community. / Competitive SSBU player, Inkling
              main. / Dedicated dualies main in Splatoon 2, with specialty in
              the Tetras. / Really bad pixel artist.
            </p>
            <h3>Things I do...</h3>
            <p class="is-size-5">
              Organization Head for <a href="https://otd.ink">Off the Dial</a>.
              <br />
              Technical Staff for <a href="https://iplabs.ink">Inkling Performance Labs</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h2 class="has-text-centered mb-0" id="projects">
          Some things that I've built...
        </h2>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h4 class="title">For...</h4>
        <div class="subtitle mb-1">
          <h3 class="mb-1">Off the Dial</h3>
        </div>
        <p class="mb-5">
          I'm a head TO for Off the Dial. I staffed many tournaments, and built
          many tools that Off the Dial now depends on to run.
        </p>
        <div class="columns">
          <div class="column">
            <Project
              title="Off the Dial Bot"
              link="https://otd.ink/bot"
              github="https://github.com/offthedial/bot"
            >
              I built the entirety of this bot, powered by discord.py, and a bit
              of both sendou.ink and smash.gg's graphql apis. I put a lot of
              care into designing the interface used to send the message embeds,
              such as an Alert and UI class.
            </Project>
          </div>
          <div class="column">
            <Project
              title="Off the Dial Website"
              link="https://otd.ink"
              github="https://github.com/offthedial/site"
            >
              I built the entirety of this site, it uses Gatsby and Bulma. It
              can parse markdown files as posts and pages. I put a lot of care
              into making sure the site easy to manage and modify.
            </Project>
          </div>
        </div>
      </div>
    </div>
    <h3 class="has-text-centered">A few more...</h3>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <OtherProject
              title="Nautilus Chambers"
              github="https://github.com/LeptoFlare/nautilus-chambers"
            >
              This is an api I built to learn about GraphQL API's, and web
              hosting. It's implemented using Ariadne, Flask, MongoDB, and
              Pydantic.
            </OtherProject>
          </div>
          <div class="column">
            <OtherProject
              title="Radia"
              github="https://github.com/IPL-Splat/radia"
            >
              The discord bot for IPL. I've rewritten the entire bot, and worked
              on many commands all the other times. It uses discord.py,
              sqlalchemy, and gspread.
            </OtherProject>
          </div>
          <div class="column">
            <OtherProject
              title="lepto.tech"
              github="https://github.com/LeptoFlare/lepto.tech"
            >
              The website you are currently looking at! Built with Gatsby and
              Bulma. There isn't much to say here, see it for yourself.
            </OtherProject>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

const Hero = () => (
  <div class="hero hero-image is-light">
    <div class="hero-body has-text-centered">
      <h1 class="title is-2">Hey, I'm LeptoFlare</h1>
      <p class="subtitle has-text-grey-dark has-text-weight-light is-italic">
        Preemptively compensating for inadequacy.
      </p>
    </div>
    <div class="hero-foot mb-2 columns is-centered has-text-centered">
      <div class="column">
        <h4>Links</h4>
        <div class="field is-grouped is-grouped-centered">
          <HeaderButton href="/github/pages" fa="fab fa-github-square">
            Github Pages
          </HeaderButton>
          <HeaderButton href="/#projects" fa="fas fa-code">
            Projects
          </HeaderButton>
        </div>
      </div>
      <div class="column is-narrow">
        <h4>Contact</h4>
        <div class="field is-grouped is-grouped-centered">
          <HeaderButton href="/discord" fa="fab fa-discord">
            Discord
          </HeaderButton>
          <HeaderButton href="/github" fa="fab fa-github">
            Github
          </HeaderButton>
          <HeaderButton href="/twitch" fa="fab fa-twitch">
            Twitch
          </HeaderButton>
          <HeaderButton href="/email" fa="fas fa-envelope">
            Email
          </HeaderButton>
        </div>
      </div>
      <div class="column">
        <h4>Support me!</h4>
        <div class="field is-grouped is-grouped-centered">
          <SupportKofi />
          <SupportPatreon />
        </div>
      </div>
    </div>
  </div>
)

const Project = ({ title, link, github, children }) => (
  <div class="card">
    <header class="card-header">
      <h4 class="card-header-title my-1">{title}</h4>
    </header>
    <div class="card-content">
      <blockquote>{children}</blockquote>
    </div>
    <footer class="card-footer">
      <a href={link} class="card-footer-item">
        <i class="fas fa-external-link-alt" />
      </a>
      <a href={github} class="card-footer-item">
        <i class="fab fa-github" />
      </a>
    </footer>
  </div>
)

const OtherProject = ({ title, github, children }) => (
  <div class="card">
    <header class="card-header">
      <h5 class="card-header-title my-1">{title}</h5>
    </header>
    <div class="card-content">
      <blockquote>{children}</blockquote>
    </div>
    <footer class="card-footer">
      <a href={github} class="card-footer-item">
        <i class="fab fa-github" />
      </a>
    </footer>
  </div>
)

const SupportPatreon = () => (
  <>
    <div class="is-hidden-touch">
      <a
        class="button is-medium is-text px-0 mx-1"
        href="https://www.patreon.com/join/leptoflare"
        target="_blank"
        rel="noreferrer"
      >
        <img
          height="36"
          style={{
            borderRadius: "8px",
            border: "0px",
            height: "36px",
            maxWidth: "none",
          }}
          src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png"
          border="0"
          alt="Become a Patron at patreon.com"
        />
      </a>
    </div>
    <div class="is-hidden-desktop">
      <a
        class="button is-medium is-text"
        href="https://www.patreon.com/join/leptoflare"
      >
        <span class="icon">
          <i class="fab fa-patreon" />
        </span>
      </a>
    </div>
  </>
)

const SupportKofi = () => (
  <>
    <div class="is-hidden-touch">
      <a
        class="button is-medium is-text px-0 mx-1"
        href="https://ko-fi.com/leptoflare"
        target="_blank"
        rel="noreferrer"
      >
        <img
          height="36"
          style={{ border: "0px", height: "36px", maxWidth: "none" }}
          src="https://cdn.ko-fi.com/cdn/kofi3.png?v=2"
          border="0"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </div>
    <div class="is-hidden-desktop">
      <a class="button is-medium is-text" href="https://ko-fi.com/leptoflare">
        <span class="icon">
          <i class="fas fa-coffee" />
        </span>
      </a>
    </div>
  </>
)

export default Index
