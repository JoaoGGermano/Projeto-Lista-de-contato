import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:3001/contacts")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setContacts(data);
      })
      .catch(function (error) {
        console.error("Erro ao buscar contatos:", error);
      });
  }, []);

  function addContact(newContact) {
    console.log(newContact)
    fetch("http://localhost:3001/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setContacts([...contacts, data]);
        setShowForm(false); //Esconde o form depois de adicionado
      })
      .catch(function (error) {
        console.log("Erro ao adicionar contato! ", error);
      });
  }

  function deleteContact(id) {
    fetch(`http://localhost:3001/contacts/${id}`, {
      method: "DELETE",
    })
      .then(function (response) {
        if (response.ok) {
          setContacts(contacts.filter((contact) => contact.id != id));
        } else {
          console.error("Erro ao deletar contato!");
        }
      })
      .catch(function (error) {
        console.error("Erro na requisição: ", error);
      });
  }

  function handleEdit(contact) { 
setEditingContact(contact); 
} 

function updateContact(updatedContact) { 
  fetch(`http://localhost:3001/contacts/${updatedContact.id}`, { 
    method: "PUT", 
    headers: { 
      "Content-Type": "application/json", 
    }, 
    body: JSON.stringify(updatedContact), 
  }) 
    .then((res) => res.json()) 
    .then((data) => { 
      const updatedList = contacts.map((contact) => 
        contact.id === data.id ? data : contact 
      ); 
      setContacts(updatedList); 
      setEditingContact(null); 
    }) 
    .catch((err) => console.error("Erro ao editar contato:", err)); 
}

  return (
    <div className="App">
      <h1>Agenda de Contatos</h1>
      {/*Botão para deixar o formulário visível */}
      {!showForm && !editingContact && ( 
      <button className="btnAdd" onClick={() => setShowForm(true)}> 
      Novo Contato 
      </button> 
      )} 
      {/*Faz o formulário aparecer */}
      {showForm && (
        <ContactForm onAdd={addContact} onClose={() => setShowForm(false)} />
      )}
      {editingContact && ( 
      <ContactForm 
      initialData={editingContact} 
       onAdd={updateContact} 
      onClose={() => setEditingContact(null)} 
  /> 
      )} 
      <ContactList onEdit={handleEdit} contacts={contacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
