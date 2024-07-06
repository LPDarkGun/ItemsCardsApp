import { useEffect } from 'react';
import { Provider } from "react-redux";
import { io } from 'socket.io-client';
import Head from 'next/head';
import { store } from "@/store/store";
import { addItem, removeItem, clearItems, editItem } from "@/store/itemSlice";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Handle item updates
    socket.on('itemUpdated', (data) => {
      // Assuming `data` contains the action type and payload
      switch (data.action) {
        case 'addItem':
          store.dispatch(addItem(data.payload));
          break;
        case 'removeItem':
          store.dispatch(removeItem(data.payload));
          break;
        case 'clearItems':
          store.dispatch(clearItems());
          break;
        case 'editItem':
          store.dispatch(editItem(data.payload));
          break;
        default:
          break;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
