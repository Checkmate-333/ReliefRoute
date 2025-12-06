import React, { useState } from 'react';
import axios from 'axios';


export default function Tracker() {
const [id, setId] = useState('');
const [pkg, setPkg] = useState(null);


async function fetchPkg(){
try{
const res = await axios.get(process.env.REACT_APP_API + '/api/packages/' + id);
setPkg(res.data);
}catch(e){ setPkg(null); }
}


return (
<div>
<input value={id} onChange={e=>setId(e.target.value)} placeholder="tokenId" />
<button onClick={fetchPkg}>Fetch</button>
{pkg && (
<div>
<div>Token: {pkg.tokenId}</div>
<div>Metadata: {pkg.metadataURI}</div>
<div>Logs:</div>
<ul>{pkg.logs.map((l,i)=>(<li key={i}>{l.timestamp} - {l.status} - {l.note||''}</li>))}</ul>
</div>
)}
</div>
);
}
