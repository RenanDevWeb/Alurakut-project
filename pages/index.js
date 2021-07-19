import {MainGrid} from '../src/components/MainGrid'
import {Box} from '../src/components/Box'
import {Depoimentos, DepoimentosText} from '../src/components/Depoimentos'
import {AlurakutMenu, OrkutNostalgicIconSet,AlurakutProfileSidebarMenuDefault} from '../src/lib/alurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

function ProfileSideBar({gitHubUser}){
  return (
    <Box >
    <img src={`https://github.com/${gitHubUser}.png`} style={{borderRadius: '8px'}} />
   <hr /> 
   <p>
    <a className="boxLink" href={`https://github.com/${gitHubUser}`}>
      @{gitHubUser}
    </a>
    </p>
  <hr /> 
    <AlurakutProfileSidebarMenuDefault />
   </Box>
  )
}

// function ProfileRelationsBoxWrapper(){
//   return(
//     <>
//   <h2 className='smallTitle'>
//   Pessoas da comunidade ({pessoas.length})
// </h2>
// <ul>
// {pessoasIndex.map((pessoas) => (  
//   <li>
//     <a href={`/users/${pessoas.login}`} key={pessoas.id} >
//         <img src={`https://github.com/${pessoas.login}.png`} />
//         <span>{pessoas.login}</span>
//     </a>
//   </li>
// ))}
// </ul>
//   <a className="boxLink">Ver Todos</a>
//    </>
//   )}



export default function Home() {
  let i;
  const githubUser = 'RenanDevWeb'
  const [pessoas,setPessoas] = useState([])
  const pessoasIndex = pessoas.slice(0,6)
  const [comunidades, setComunidades] = useState([])
  
  async function getData(){
    const {data}  = await Axios.get('https://api.github.com/users/RenanDevWeb/followers') 
      setPessoas(data)
    }
  async  function getDataComunites(){
     await fetch('https://graphql.datocms.com/',{
        method: 'POST',
        headers: {
          'Authorization': 'e6bfa06551e7b1aaaa9d9e899d2d14',
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({ "query": `query{
          allCommunities{
            title
            id
            imageurl
            creatorslug
          }
        }` })
      })
      .then(response =>   response.json())
      .then((respostaCompleta) => {
          const comunidades = respostaCompleta.data.allCommunities
          setComunidades(comunidades)
      })
      
  }

  useEffect(async () => {
    await getData()
    getDataComunites()
  },[])

  
 function handleSubmit(e) {
    e.preventDefault();
    const dadosFormulario = new FormData(e.target)
    const comunidade = {
      title: dadosFormulario.get('title'),
      imageUrl: dadosFormulario.get('image'),
      creatorSlug: 'algumacoisaqualquer'
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(comunidade)
    }).then(async (response) => {
      const dados = await response.json()
      const dadosRegistro = dados.registroCriado
      const comunidade = dadosRegistro
      const comunidadesAtualizadas = [...comunidades, comunidade]
      setComunidades(comunidadesAtualizadas)
    })

    
 }


  return (
    <>
    <AlurakutMenu />
    
   <MainGrid>
     <Box as="aside" className="profileArea" style={{gridArea: 'profileArea' }}>
        <ProfileSideBar gitHubUser={githubUser} />
     </Box>


     <div  className="welcomeArea" style={{gridArea: 'welcomeArea' }}>
      <Box >
        <h1 className="title">
        Bem Vindo 
        </h1>

       <OrkutNostalgicIconSet />
      </Box>
      <Box>
          <h3 className="subTitle">O que você deseja Fazer ?</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input 
            aria-label="title" 
            name="title" 
            type="text" 
            placeholder="Qual o nome da sua comunidade" 
            />
          </div>
          <div>
            <input 
            aria-label="capa" 
            name="image" 
            type="text" 
            placeholder="URL De capa" 
            />
          </div>
          <button
          
          type="submit" 
          value="Enviar">
          Criar Comunidade
          </button>
          </form>
      </Box>

      <Box>
     <h3 className="subTitle">Depoimentos</h3>
        <Depoimentos >
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/1200px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg'/>
            <DepoimentosText >
            <h4>Breidan Eich </h4>
            <p>O que falar desse cara que mal conheço e ja considero pacas</p>
            </DepoimentosText>
        </Depoimentos>
      </Box>
     </div>
     <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea' }}>
     <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        Pessoas da comunidade ({pessoas.length})
      </h2>
      <ul>
      {pessoasIndex.map((pessoas) => (  
        <li key={pessoas.id} >
          <a href={`/users/${pessoas.login}`}  >
              <img src={`https://github.com/${pessoas.login}.png`} />
              <span>{pessoas.login}</span>
          </a>
        </li>
      ))}

      </ul>
        <a className="boxLink">Ver Todos</a>
        </ProfileRelationsBoxWrapper>


      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Comunidades {comunidades.length}</h2>
          <ul>
          {
            comunidades.map((comunidade) => (
              <li key={comunidade.id}>
                <a href={'/users/'} >
              <img src={comunidade.imageurl}/>
              <span>{comunidade.title}</span>
         </a>
         </li>
            ))
            }
          </ul>
          <a className="boxLink">Ver Todos</a>
      </ProfileRelationsBoxWrapper>
  
 </div>
    
   </MainGrid>
  </>
  )
}


export async function getServerSideProps(ctx){
  const cookies = nookies.get(ctx)
  const token = cookies.USER_TOKEN
  const dado = jwt.decode(token)
  console.log(dado)
  
  return{
    props: {}
}
}
