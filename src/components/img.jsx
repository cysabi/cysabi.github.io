const Img = props => {
  const content = props.src.endsWith(".webm") ? (
    <video
      controls={props.title === "controls"}
      muted={props.title !== "controls"}
      autoplay={props.title !== "controls"}
      loop={props.title !== "controls"}
    >
      <source src={props.src} alt={props.alt} type="video/webm" />
    </video>
  ) : (
    <img src={props.src} alt={props.alt} />
  )

  return props.alt.length > 0 ? (
    <figure>
      {content}
      <figcaption>{props.alt}</figcaption>
    </figure>
  ) : (
    <>{content}</>
  )
}

export default Img
