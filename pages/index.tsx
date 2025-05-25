import { useState } from "react";
import { cards } from "../lib/cards";
import { useRouter } from "next/router";

export default function Home() {
  const [give, setGive] = useState(cards[0]);
  const [receive, setReceive] = useState(cards[1]);
  const router = useRouter();

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Tankopoly Exchange</h1>
      <label>Give:</label>
      <select value={give} onChange={e => setGive(e.target.value)}>
        {cards.map(c => <option key={c}>{c}</option>)}
      </select>
      <br />
      <label>Receive:</label>
      <select value={receive} onChange={e => setReceive(e.target.value)}>
        {cards.filter(c => c !== give).map(c => <option key={c}>{c}</option>)}
      </select>
      <br /><br />
      <button onClick={() => router.push(`/exchange/${give}/${receive}`)}>
        Go to Exchange Page
      </button>
    </div>
  );
}