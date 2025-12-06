import React from 'react';
import MintForm from './components/MintForm';
import Tracker from './components/Tracker';


export default function App(){
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT;
return (
<div className="p-8">
<h1 className="text-2xl mb-4">ReliefRoute</h1>
<MintForm contractAddress={CONTRACT_ADDRESS} />
<hr />
<Tracker />
</div>
);
}
