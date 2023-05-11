import { useState, useEffect } from "react";
import RoleContext from "./RoleContext";
import { useContext } from "react";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { isAdmin } = useContext(RoleContext);

  useEffect(() => {
    fetch("azil.json")
      .then((response) => response.json())
      .then((data) => setNotifications(data.obavijesti))
      .catch((error) => console.error(error));
  }, []);

  function addNotification(title, text, important) {
    const newNotification = {
      id: notifications.length + 1,
      naslov: title,
      tekst: text,
      vazno: important,
      datum: new Date().toISOString().slice(0, 10),
    };
    setNotifications([...notifications, newNotification]);
  }

  function deleteNotification(id) {
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(updatedNotifications);
  }

  return (
    <div className="notifications">
      <div className="nova-obavijest">
        <h2>Nova obavijest</h2>
        {<NewNotificationForm onSubmit={addNotification} />}
      </div>
      <div className="obavijesti">
        <h2>Obavijesti</h2>

        <table>
          {notifications
            .sort((a, b) => b.datum.localeCompare(a.datum))
            .map((notification) => (
              <tbody
                key={notification.id}
                className={notification.vazno ? "important" : ""}
              >
                <tr
                  className="vazno"
                  style={{
                    backgroundColor: notification.vazno ? "#E54B4B" : "#60992d",
                  }}
                >
                  {notification.naslov}
                  {notification.vazno}
                  {notification.datum}
                </tr>

                <tr>
                  <td>
                    {notification.tekst}
                    {isAdmin && (
                      <button
                        onClick={() => deleteNotification(notification.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}

function NewNotificationForm({ onSubmit }) {
  const { isAdmin } = useContext(RoleContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [important, setImportant] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(title, text, important);
    setTitle("");
    setText("");
    setImportant(false);
  }

  return (
    <div className="notifications">
      {!isAdmin ? (
        <form onSubmit={handleSubmit}>
          <label>
            Naslov obavijesti:
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={20}
            />
          </label>
          <label>
            Tekst obavijesti:
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              required
              minLength={10}
            />
          </label>
          <button type="submit">Dodaj</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Naslov obavijesti:
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={20}
            />
          </label>
          <label>
            Tekst obavijesti:
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              required
              minLength={10}
              maxLength={200}
            />
          </label>

          <label>
            Važno:
            <input
              type="checkbox"
              checked={important}
              onChange={(event) => setImportant(event.target.checked)}
              className={important ? "important" : ""}
            />
          </label>
          <button type="submit">Dodaj</button>
        </form>
      )}
    </div>
  );
}
export default Notifications;
