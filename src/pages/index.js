import React from "react"

import Layout from "src/components/Layout"

const Index = () => (
  <Layout pageTitle="Hey, I'm LeptoFlare">
    <div class="hero hero-image is-light">
      <div class="hero-body has-text-centered">
        <h1 class="title is-1 ">Hey, I'm LeptoFlare</h1>
        <p
          class="subtitle has-text-grey-dark"
          style={{ fontWeight: 300, fontStyle: "italic" }}
        >
          Preemptively compensating for inadequacy.
        </p>
      </div>
      <div class="hero-foot mb-1 columns has-text-centered">
        <div class="column is-3">
          <h4 class="title is-4">Pages</h4>
          <div class="field is-grouped is-grouped-centered has-addons">
            <a href="/blog" class="button is-medium is-text">
              <span class="icon">
                <i class="fas fa-blog" />
              </span>
              <span>Blog</span>
            </a>
            <a
              href="https://leptoflare.github.io"
              class="button is-medium is-text"
            >
              <span class="icon">
                <i class="fab fa-github-square"></i>
              </span>
              <span>Github Pages</span>
            </a>
          </div>
        </div>
        <div class="column">
          <h4 class="title is-4">Contact</h4>
          <div class="field is-grouped is-grouped-centered has-addons">
            <a href="/discord" class="button is-medium is-text">
              <span class="icon">
                <i class="fab fa-discord" />
              </span>
              <span>Discord</span>
            </a>
            <a href="/github" class="button is-medium is-text">
              <span class="icon">
                <i class="fab fa-github" />
              </span>
              <span>Github</span>
            </a>
            <a href="/twitch" class="button is-medium is-text">
              <span class="icon">
                <i class="fab fa-twitch" />
              </span>
              <span>Twitch</span>
            </a>
            <a
              href="mailto:leptoflare@lepto.tech"
              class="button is-medium is-text"
            >
              <span class="icon">
                <i class="fas fa-envelope" />
              </span>
              <span>Email</span>
            </a>
          </div>
        </div>
        <div class="column is-3">
          <h4 class="title is-4">Support me!</h4>
          <div class="field is-grouped is-grouped-centered has-addons">
            <a
              class="button is-medium is-text px-0 mx-1"
              href="https://www.patreon.com/bePatron?u=22063151"
              target="_blank"
              rel="noreferrer"
            >
              <img
                height="36"
                style={{
                  borderRadius: "8px",
                  border: "0px",
                  height: "36px",
                  objectFit: "contain",
                }}
                src="https://c5.patreon.com/external/logo/become_a_patron_button.png"
                border="0"
                alt="Become a Patron at patreon.com"
              />
            </a>
            <a
              class="button is-medium is-text px-0 mx-1"
              href="https://ko-fi.com/R5R21YKM1"
              target="_blank"
              rel="noreferrer"
            >
              <img
                height="36"
                style={{ border: "0px", height: "36px", objectFit: "contain" }}
                src="https://cdn.ko-fi.com/cdn/kofi3.png?v=2"
                border="0"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default Index
