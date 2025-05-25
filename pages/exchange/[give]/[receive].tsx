import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ExchangePage() {
  const router = useRouter();
  const { give, receive } = router.query;
  const [entries, setEntries] = useState<any[]>([]);
  const [link, setLink] = useState("");
  const [discord, setDiscord] = useState("");

  useEffect(() => {
    if (give && receive) {
      fetch(`/api/exchange/${give}/${receive}/list`)
        .then(res => res.json())
        .then(setEntries);
    }
  }, [give, receive]);

  const addEntry = async () => {
    await fetch(`/api/exchange/${give}/${receive}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link, discord }),
    });
    setLink("");
    setDiscord("");
    fetch(`/api/exchange/${give}/${receive}/list`)
      .then(res => res.json())
      .then(setEntries);
  };

  const deleteEntry = async (id: number) => {
    await fetch(`/api/exchange/${give}/${receive}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetch(`/api/exchange/${give}/${receive}/list`)
      .then(res => res.json())
      .then(setEntries);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Exchange: Give <b>{give}</b> for <b>{receive}</b></h2>
      <div>
        <input
          placeholder="Your exchange link"
          value={link}
          onChange={e => setLink(e.target.value)}
          style={{ width: "60%" }}
        />
        <input
          placeholder="Discord (optional)"
          value={discord}
          onChange={e => setDiscord(e.target.value)}
          style={{ width: "30%", marginLeft: 8 }}
        />
        <button onClick={addEntry} disabled={!link}>Add</button>
      </div>
      <ul>
        {entries.map(e => (
          <li key={e.id}>
            <a href={e.link} target="_blank" rel="noopener noreferrer">{e.link}</a>
            {e.discord && <> | Discord: {e.discord}</>}
            <button onClick={() => deleteEntry(e.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}