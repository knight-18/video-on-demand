import View from './view'
export default function VideoPlayer({videoUrl, autoplay}) {
  console.log("Video Player component rendered")
  return (
    <View videoUrl={videoUrl} autoplay={autoplay}/>
  );
}
