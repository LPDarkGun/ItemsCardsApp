import { Provider } from "react-redux";
import { store } from "@/store/store";
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div>
        <Head>
          <title>Items Cards App</title>
          <meta name="description" content="An app to manage items with descriptions, images, and tags." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://images-platform.99static.com//rRR3YN9O1E96UFKSvPA48mCXXTs=/0x2442:588x3032/fit-in/500x500/projects-files/43/4307/430721/8e7f19e8-bb21-4936-934d-3a8d85b360a6.jpg" />

        </Head>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
