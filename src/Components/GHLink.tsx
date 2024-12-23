import './GHLink.css'

class GHLinkProps{
  repo!: string;
}

let GHLink = ( props: GHLinkProps ) => {
  let randid = Math.round(Date.now() / 3600000); // Changes every hour

  return (
    <a href={`https://github.com/${props.repo}`}><div class="gh-link" style={{
      background: `url('https://opengraph.githubassets.com/${randid}/${props.repo}')`,
    }}></div></a>
  )
}

export default GHLink;