import React from "react"

const HeaderButton = ({ href, fa, children }) => (
  <a href={href} class="button is-medium is-text">
    <span class="icon">
      <i class={fa} />
    </span>
    <div class="is-hidden-touch">
      <span>{children}</span>
    </div>
  </a>
)

export default HeaderButton
