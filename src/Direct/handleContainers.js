import React from 'react'



export default function handleContainers() {

  const contactsButton = useRef()
  const messagesButton = useRef()
  const contactsContainer = useRef()
  const messageContainer = useRef()
  const [contactClicked, setContactClicked] = useState(false)

  if (!contactClicked) {
    contactsContainer.current.className = "contacts-container active"
    messageContainer.current.className = "messages-container"
    contactsButton.current.style.display = "inline-block"
    messagesButton.current.style.display = "none"
  }
  else {
    contactsContainer.current.className = "contacts-container"
    messageContainer.current.className = "messages-container active"
    contactsButton.current.style.display = "none"
    messagesButton.current.style.display = "inline-block"
  }

  setContactClicked(p => !p)
  console.log(contactClicked)

  return  {messageContainer,contactsContainer,messagesButton,contactsButton,contactClicked} 
}

