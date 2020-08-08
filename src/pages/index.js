import React from "react"

import Layout from "src/components/Layout"
import HeaderButton from "src/components/HeaderButton"
import icon from "src/static/images/icon.png"

const Index = () => (
  <Layout>
    <Hero />
    <div class="section">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-narrow mr-4">
            <img
              style={{ borderRadius: "50%", maxWidth: "none", height: "10em" }}
              src={icon}
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
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <h2 class="has-text-centered mb-0" id="projects">
          Some things I've worked on...
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
          Off the Dial is a unique tournament organisation for Splatoon 2,
          dedicated to providing fresh tournament opportunities for free agents
          and teams alike.
        </p>
        <div class="columns is-vcentered">
          <div class="column">
            <Project
              title="Off the Dial Bot"
              link="https://otd.ink/bot"
              github="https://github.com/offthedial/bot"
            >
              This bot was created to help organize Off The Dial's tournaments
              easier and faster. It includes many commands that automate
              previously manual tasks.
            </Project>
          </div>
          <div class="column">
            <Project
              title="Off the Dial Website"
              link="https://otd.ink"
              github="https://github.com/offthedial/site"
            >
              A website to serve as a centralized place to find everything Off
              the Dial. This websites is currently in beta, more features are to
              come. Stay tuned!
            </Project>
          </div>
        </div>
      </div>
    </div>
    <h3 class="has-text-centered">Other stuff...</h3>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <OtherProject
              title="nautilus-chambers"
              github="https://github.com/LeptoFlare/nautilus-chambers"
            >
              🐚 A service/API for storing and synchronizing Splatoon 2 user
              profiles across multiple discord bots.
            </OtherProject>
          </div>
          <div class="column is-3">
            <OtherProject
              title="LeptoBot"
              github="https://github.com/LeptoFlare/LeptoBot"
            >
              A simple bot for the LeptoServer
            </OtherProject>
          </div>
          <div class="column is-3">
            <OtherProject
              title="lepto.tech"
              github="https://github.com/LeptoFlare/lepto.tech"
            >
              The static pages to my personal website.
            </OtherProject>
          </div>
          <div class="column is-3">
            <OtherProject
              title="boo-yah.ink"
              github="https://github.com/LeptoFlare/boo-yah.ink"
            >
              Hosting the image files for the Inklingcord's Boo-Yah Doc!
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
