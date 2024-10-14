import { useState, useEffect } from 'react';

function DecksPage({ setAuthenticated }) {
  const [decks, setDecks] = useState([]);
  const [deckName, setDeckName] = useState(''); // Зберігаємо назву колоди

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch('server/decks');
        const data = await response.json();
        setDecks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDecks();
  }, []);

  const logout = async() =>{
    await setAuthenticated(false);
    localStorage.removeItem('authenticated');
    document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; 
  };

    const handleSubmit = async (e) => {
      console.log(deckName); // Тепер ви можете зберігати або обробляти deckName
      try {
        const response = await fetch('server/decks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deckname: deckName }),
        });
    
        if (response.ok) {
          console.log('Deck added');
        } else {
          console.error('Failed to add deck');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setDeckName(''); 
    };

  return (
    <div>
      <h1>Мої Колоди</h1>
      <button id="logoutButton" onClick={logout}>Вийти з аккаунту</button>

      <table id="decksTable">
        <thead>
          <tr>
            <th>№</th>
            <th>Назва</th>
            <th>Кількість карток</th>
            <th>Операції</th>
          </tr>
        </thead>
        <tbody>
          {decks.map((deck, index) => (
            <tr key={deck._id}>
              <td>{index + 1}</td>
              <td>{deck.name}</td>
              <td>{deck.cards.length || 0}</td>
              <td>
                <button>Змінити</button>
                <button>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Введіть назву колоди" 
          value={deckName} 
          onChange={(e) => setDeckName(e.target.value)} // Оновлюємо значення стану при введенні
          required 
        />
        <button type="submit">Додати Колоду</button>
      </form>
    </div>
  );
}

export default DecksPage;
