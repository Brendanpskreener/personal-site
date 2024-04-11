import { useContext, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { StoreContext } from "../../store/StoreContext"

export default function LoginModal({ className = '' }) {
  const dialog = useRef()
  const { modalOpen, toggleModal, handleUserLoggedIn } = useContext(StoreContext)

  function onLogin() {
    handleUserLoggedIn('63d53f91-4ea5-4bc5-92e4-c9191687f11d')
    toggleModal(false)
  }

  useEffect(() => {
    const modal = dialog.current

    if (modalOpen) {
      modal.showModal()
    }
    return () => modal.close()
  }, [modalOpen])

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={() => toggleModal(false)}>
      <h2>You need to login</h2>
      <form className="login-form">
        <p>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </p>
      </form>
      <button onClick={() => toggleModal(false)}>Cancel</button>
      <button>Register</button>
      <button onClick={onLogin}>Login</button>
    </dialog>
    , document.getElementById('modal'))
}