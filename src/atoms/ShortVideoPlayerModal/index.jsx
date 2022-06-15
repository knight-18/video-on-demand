import View from "./view";
export default function VideoPlayerModal({
  user,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  isLoading, 
  setIsLoading
}) {
  return (
    <View
      user={user}
      isModalOpen={isModalOpen}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
}
