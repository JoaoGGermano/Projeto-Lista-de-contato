import { useState } from "react";
import "./ContactForm.css";

function ContactForm({ onAdd, onClose, initialData = {} }) {
  const [name, setName] = useState(initialData.name || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [email, setEmail] = useState(initialData.email || "");

  function handleSubmit(event) {
    event.preventDefault();    //Evita que a página seja recarregada

    const newContact = {
      id: initialData.id,
      name: name,
      phone: phone,
      email: email,
    };

    //Chama a função, passa a props para salvar os dados
    onAdd(newContact);

    //Limpa os inputs
    setName("");
    setPhone("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Stop calm, stop calm"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        required
      />
      <div className="btn">
      <button type="submit">Adicionar</button>
      <button type="button" onClick={onClose}>
        Cancelar
      </button>
      </div>
    </form>
  );
}
export default ContactForm;
