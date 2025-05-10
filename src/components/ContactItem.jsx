import "./ContactItem.css";

function ContactItem(contacts){
    return (
    <div className="contact-card">  
        <h2>Mario</h2>
        <p>📞 (69) 90054-7854</p>
        <p>📧 mail@mail.com</p>
        <div className="btns"> 
         <button>Editar</button>
            <button>Deletar</button>
        </div>
    </div>
    );
}
export default ContactItem;