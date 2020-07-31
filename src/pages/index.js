import React from "react"

import Layout from "src/components/Layout"

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
        <div class="column is-hidden-touch">
          <h4>Links</h4>
          <div class="field is-grouped is-grouped-centered has-addons">
            <a href="/blog" class="button is-medium is-text">
              <span class="icon">
                <i class="fas fa-blog" />
              </span>
              <span>Blog</span>
            </a>
            <a href="/github/pages" class="button is-medium is-text">
              <span class="icon">
                <i class="fab fa-github-square"></i>
              </span>
              <span>Github Pages</span>
            </a>
          </div>
        </div>
        <div class="column is-narrow is-hidden-touch">
          <h4>Contact</h4>
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
        <div class="column is-hidden-touch">
          <h4>Support me!</h4>
          <div class="field is-grouped is-grouped-centered has-addons">
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
                src="https://c5.patreon.com/external/logo/become_a_patron_button.png"
                border="0"
                alt="Become a Patron at patreon.com"
              />
            </a>
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
        </div>

        <div class="column is-hidden-desktop">
          <h4>Pages</h4>
          <div class="field is-grouped is-grouped-centered has-addons">
            <a href="/blog" class="button is-medium is-text">
              <span class="icon">
                <i class="fas fa-blog" />
              </span>
            </a>
            <a href="/github/pages" class="button is-medium is-text">
              <span class="icon">
                <i class="fab fa-github-square"></i>
              </span>
            </a>
          </div>
        </div>
        <div class="column is-narrow is-hidden-desktop">
          <h4>Contact</h4>
          <div class="field is-grouped is-grouped-centered has-addons">
            <a href="/discord" class="button is-medium is-text">
              <span class="icon">
                <i class="fab fa-discord" />
              </span>
            </a>
            <a href="/github" class="button is-medium is-text">
              <span class="icon">
                <i class="fab fa-github" />
              </span>
            </a>
            <a href="/twitch" class="button is-medium is-text">
              <span class="icon">
                <i class="fab fa-twitch" />
              </span>
            </a>
            <a
              href="mailto:leptoflare@lepto.tech"
              class="button is-medium is-text"
            >
              <span class="icon">
                <i class="fas fa-envelope" />
              </span>
            </a>
          </div>
        </div>
        <div class="column is-hidden-desktop">
          <h4>Support me!</h4>
          <div class="field is-grouped is-grouped-centered has-addons">
            <a class="button is-medium is-text" href="https://www.patreon.com/join/leptoflare">
              <span class="icon">
                <i class="fab fa-patreon" />
              </span>
            </a>
            <a class="button is-medium is-text" href="https://ko-fi.com/leptoflare">
              <span class="icon">
                <i class="fas fa-coffee" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default Index
