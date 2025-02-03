import Head from "next/head";
import Navbar from "@/pages/Components/Navbar/navbar";
import BodyTemplate from "@/pages/Components/BodyTemplate/Body";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Navbar connected={false}/>
      <BodyTemplate component={<Component {...pageProps} />}/>
    </>
  );
}

export default App;