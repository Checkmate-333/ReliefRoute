# ReliefRoute – Track Every Aid Packet Like a Speed Post

> Transparent, tamper-proof disaster relief tracking using blockchain, QR codes, and simple web apps.

ReliefRoute turns every physical relief kit (food, medicine, water, hygiene) into a uniquely trackable digital identity.  
From warehouse to survivor, every handoff is recorded on-chain, so donors, NGOs and governments share the same trusted view of what really happened.

---

## 🎯 Problem

During disasters (floods, earthquakes, cyclones, pandemics):

- Donations are collected, but **donors rarely see where their help actually goes**.  
- NGOs juggle **spreadsheets, WhatsApp groups and manual logs**.  
- Relief kits can be **delayed, duplicated, misplaced, or diverted**.  
- Governments and auditors struggle to answer basic questions like:
  - “How many kits reached this district?”
  - “Which regions are still under-served?”

Result:  
Low transparency → low trust → lower future donations → slower relief for people who need it most.

---

## ✅ Solution – What ReliefRoute Does

ReliefRoute provides **per-packet, on-chain visibility** for disaster relief operations:

1. **Mint a digital identity per kit**  
   - Each physical relief kit gets a unique ID (and optionally an NFT/token) on an EVM chain.

2. **Attach a QR code to each kit**  
   - Kits leaving the warehouse carry QR labels linked to their on-chain identity.

3. **Scan at every checkpoint**  
   - Volunteers scan the QR at warehouse, trucks, local depots, and final delivery.  
   - Each scan updates the kit’s status and (optionally) location.

4. **Write immutable events on-chain**  
   - Every status update emits a blockchain event.  
   - No silent modifications, no log tampering.

5. **Dashboards for everyone**  
   - **NGOs**: see live flow of kits and spot bottlenecks.  
   - **Donors**: see the journey of kits they funded.  
   - **Auditors/Govt**: verify who received what, and where.

---

## 🔍 Key Features

- **Per-packet traceability**  
  Not just “we sent 1000 kits” – track each kit independently.

- **QR-based volunteer workflow**  
  Works on low-end smartphones via a lightweight web scanner.

- **On-chain event log**  
  Immutable record of all key status changes on an EVM chain.

- **Role-based dashboards**
  - NGO admin: create batches, mint kits, monitor distribution.
  - Volunteer: scan QR, update status, optionally capture location.
  - Donor: view kits funded, their latest status, and a simple map.

- **Map-based visualization**  
  Show where kits are packed, in transit, and delivered.

- **Sponsor-aligned Web3 usage**  
  Built for Ethereum-compatible chains and can integrate wallet/NFT infra (e.g., Verbwire / ETHIndia ecosystem).

---

## 🧱 Architecture Overview

**Frontend**

- NGO Dashboard (web)
- Donor Dashboard (web)
- Volunteer Scanner (mobile-first web page or PWA)

**Backend**

- REST API server (Node.js / Express)
- Handles:
  - Authentication and roles
  - Batch and kit lifecycle
  - QR code generation and verification
  - Contract calls (create kit, update status)
  - Aggregation for dashboards and maps

**Blockchain Layer**

- EVM-compatible smart contracts (Solidity):
  - `ReliefRouteRegistry` (or similar):
    - Store kit metadata (id, donor, batch, region, current status)
    - Emit `KitCreated` and `StatusUpdated` events

**Database (Off-chain)**

- Stores:
  - Users and roles (NGO, volunteer, donor)
  - Kit metadata mirror (for fast reads)
  - Scan logs with timestamp and optional `(lat, lng)`
  - Mapping between QR secrets and kit IDs

**Supporting Services**

- QR code generator library
- Map rendering (Leaflet / Mapbox)
- Optional integration with sponsor infra for:
  - Contract deployment
  - NFT minting per kit
  - Wallet abstraction / asset data

---

## 🧩 Tech Stack (Suggested)

You can adjust based on your team’s preferences.

**Frontend**

- `Next.js` (React)
- `Tailwind CSS`
- `Axios` for API calls
- `Leaflet` / `react-leaflet` for maps
- `qrcode.react` or similar for QR rendering

**Backend**

- `Node.js` + `Express`
- `MongoDB` + `Mongoose` (or PostgreSQL)
- `ethers.js` (or sponsor SDK) for on-chain interactions
- `jsonwebtoken` / simple session auth (for roles)

**Blockchain**

- `Solidity` smart contracts
- `Hardhat` for compilation, testing, deployment
- EVM testnet (e.g., Polygon testnet / Ethereum testnet)

---

## 🧪 Core Smart Contract (Concept)

Example concept for `ReliefRouteRegistry`:

- `enum KitStatus { Created, Packed, InTransit, Delivered }`

- `struct Kit {`
  - `uint256 id;`
  - `address donor;`
  - `string batchId;`
  - `string disasterName;`
  - `string region;`
  - `KitStatus status;`
  - `// additional metadata if needed`
  - `}`

- `mapping(uint256 => Kit) public kits;`
- `uint256 public nextKitId;`

- Functions (examples):

  - `function createKit(address donor, string memory batchId, string memory disasterName, string memory region) external;`
  - `function updateStatus(uint256 kitId, KitStatus newStatus, string memory locationTag) external;`

- Events:

  - `event KitCreated(uint256 indexed kitId, address indexed donor, string batchId);`
  - `event StatusUpdated(uint256 indexed kitId, KitStatus newStatus, string locationTag, uint256 timestamp);`

---

## 🚀 Getting Started (High-Level)

### 1. Clone the repository

```bash
git clone https://github.com/Projects-098765/ReliefRoute.git
cd ReliefRoute
