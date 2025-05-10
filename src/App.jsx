
import './App.css'
import ContactItem from './components/ContactItem'

function App() {
const contatcs =[
  {id:1,name:"João",phone:"(69) 95465-5482",mail:"email@mail.com"},
  {id:2,name:"Guilherme",phone:"(69) 98755-4565",mail:"atumalaka@mail.com"},
];

  return (
    <>
     <h1>Agenda de contatos</h1>
     <ContactItem></ContactItem>
     <ContactItem></ContactItem>

  
    </>
  )
}

export default App
