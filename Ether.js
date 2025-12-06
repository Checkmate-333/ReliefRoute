import { ethers } from 'ethers';
import RelAbi from './ReliefRouteABI.json';


export function getProvider() {
const provider = new ethers.providers.Web3Provider(window.ethereum);
return provider;
}


export function getContract(address) {
const provider = getProvider();
return new ethers.Contract(address, RelAbi, provider.getSigner());
}
