import React from "react"

import Layout from "src/components/Layout"
import HeaderButton from "src/components/HeaderButton"

const Index = () => (
  <Layout pageTitle="Hey, I'm LeptoFlare">
    <div class="hero hero-image is-light">
      <div class="hero-body has-text-centered">
        <h1 class="title is-2">Hey, I'm LeptoFlare</h1>
        <p
          class="subtitle has-text-grey-dark"
          style={{ fontWeight: 300, fontStyle: "italic" }}
        >
          Preemptively compensating for inadequacy.
        </p>
      </div>
      <div class="hero-foot mb-1 columns is-centered has-text-centered">
        <div class="column">
          <h4>Links</h4>
          <div class="field is-grouped is-grouped-centered">
            <HeaderButton href="/blog" fa="fas fa-blog">
              Blog
            </HeaderButton>
            <HeaderButton href="/github/pages" fa="fab fa-github-square">
              Github Pages
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
  </Layout>
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
