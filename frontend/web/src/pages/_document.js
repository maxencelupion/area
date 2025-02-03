import Document, { Html, Head, Main, NextScript } from "next/document";

const style = `
html, body, #__next {
  -webkit-overflow-scrolling: touch;
  background: #011627;
}
#__next {
  display: flex;
  flex-direction: column;
  height: 100%;
}
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}
body {
  overflow-y: auto;
  overscroll-behavior-y: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: scrollbar;
}
@font-face {
  font-family: 'Montserrat';
  src: url('/assets/Montserrat/Montserrat-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Montserrat';
  src: url('/assets/Montserrat/Montserrat-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Montserrat';
  src: url('/assets/Montserrat/Montserrat-Italic.ttf') format('truetype');
  font-weight: 400;
  font-style: italic;
}
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = (
      <style
        key="global-styles"
        dangerouslySetInnerHTML={{ __html: style }}
      />
    );
    return { ...initialProps, styles: [...initialProps.styles, styles] };
  }

  render() {
    return (
      <Html style={{ height: "100%" }} lang={"en"}>
        <Head>
          <meta charSet="utf-8" content={""}/>
        </Head>
        <body style={{height: "100%", padding: 0, margin: 0, fontFamily: "Montserrat, sans-serif"}}>
        <title>Nexpo</title>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}
