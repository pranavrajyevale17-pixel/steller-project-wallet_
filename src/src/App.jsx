import { useState } from "react";
import { createAccount, getBalance, sendXLM } from "./stellar";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState([]);
  const [destination, setDestination] = useState("");

  const handleCreate = () => {
    setAccount(createAccount());
  };

  const handleBalance = async () => {
    if (!account) return alert("Create account first!");
    const bal = await getBalance(account.publicKey);
    setBalance(bal);
  };

  const handleSend = async () => {
    if (!account) return alert("Create account first!");
    if (!destination.trim()) return alert("Enter destination!");
    await sendXLM(account.secret, destination);
    setDestination("");
  };

  return (
    <div className="container">
      <h1>🚀 Stellar Wallet App</h1>

      <button onClick={handleCreate}>Create Account</button>
      <button onClick={handleBalance}>Check Balance</button>

      {account && (
        <div className="card">
          <p><b>Public Key:</b> {account.publicKey}</p>
          <p><b>Secret Key:</b> {account.secret}</p>
        </div>
      )}

      <h3>Balance</h3>
      <ul>
        {balance.map((b, i) => (
          <li key={i}>{b.balance} XLM</li>
        ))}
      </ul>

      <h3>Send XLM</h3>
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination Address"
      />
      <button onClick={handleSend}>Send 10 XLM</button>
    </div>
  );
}

export default App;
