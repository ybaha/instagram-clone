import NavbarTop from './Navbar/Navbar'
import Page from './Page/Page';
import StoryUI from './Page/Stories/StoryUI'

function App() {
  return (
    <div className="App">
      <>
        <StoryUI />
      </>

      <>
        <NavbarTop />
        <Page />
      </>

    </div>
  );
}

export default App;
