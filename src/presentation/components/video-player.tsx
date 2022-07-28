import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  url: string | undefined
  playing: boolean
}

export function VideoPlayer (props: VideoPlayerProps) {
  return (
    <ReactPlayer
      url={props.url}
      playing={props.playing}
      controls={true}
      stopOnUnmount={true}
    />
  )
}
