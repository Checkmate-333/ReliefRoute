import React, { useState } from 'react';
import { getContract } from '../utils/ethers';
import axios from 'axios';


export default function MintForm({ contractAddress }) {
const [metaURI, setMetaURI] = useState('');
const [status, setStatus] = useState('');


async function mint() {
try {
const contract = getContract(contractAddress);
// call contract mint - only owner can call in contract; this example assumes owner uses backend to mint
// For demo, we assume admin uses backend. Here we just POST to backend to create record.
const res = await axios.post(process.env.REACT_APP_API + '/api/packages', {
tokenId: Math.floor(Math.random()*1e6), // demo-only
metadataURI: metaURI,
donor: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0]
});
setStatus('Created off-chain record');
} catch (e) { setStatus('Error: '+e.message); }
}


return (
<div>
<input value={metaURI} onChange={e=>setMetaURI(e.target.value)} placeholder="metadata URI (IPFS)" />
<button onClick={mint}>Create Package (off-chain)</button>
<div>{status}</div>
</div>
);
}
