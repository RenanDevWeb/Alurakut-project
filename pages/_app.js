import {createGlobalStyle} from 'styled-components'
import {AlurakutStyles} from '../src/lib/alurakutCommons'


const GlobalStyle = createGlobalStyle`
  *{
      margin:0;
      padding: 0;
      box-sizing: border-box;
  } 
  body{
      background: #d9e6f6;
      font-family: sans-serif;
  }
  #_next{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  } 
  img{
    max-width: 100%;
    height: auto;
    display: block
  }

  ${AlurakutStyles}
`; 

function MyApp({ Component, pageProps }) {
  return(
    <>
    <GlobalStyle />
          <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
