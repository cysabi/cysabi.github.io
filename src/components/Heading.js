import React from "react"
import styled from "styled-components"

import banner from "src/static/images/banner.png"

const StyledHeading = styled.h1`
  background-image: url(${banner});
  background-size: cover;
  background-position: 0 80%;
  padding: 18px;
  border-radius: 3px;
`

const Heading = ({ children }) => (
  <div class="my-4">
    <StyledHeading>{children}</StyledHeading>
  </div>
)

export default Heading
