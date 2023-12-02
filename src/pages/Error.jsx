import MainNavigation from "../components/UI/MainNavigation";

export default function Error() {
  return (
    <>
      <MainNavigation />
      <div className="title">
        <h1>An error occurred</h1>
        <p>This page does not exist</p>
      </div>
    </>
  )
}