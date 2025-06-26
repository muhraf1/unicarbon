# Unicarbon


This repository provides a starter template for building applications on **Unicarbon**, a decentralized exchange (DEX) dedicated to the Voluntary Carbon Market, powered by [Uniswap V4](https://uniswap.org/). Unicarbon features a _Buffer Pool_, _Carbon Credit Quality_ assessment, and _Dynamic Fees_ to enhance trading efficiency and transparency in the carbon market.

![Screenshot](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IW-avX3xvKfQ2uuCQjoHbw.png)

## How to Run the Program

Follow the steps below to set up and run the application:

### Front-End Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/muhraf1/unicarbon
    ```
   
2. **Navigate to the project directory:**
  ```bash
  cd unicarbondex
 ```
3.  **Install the required dependencies:**
  ```bash
   npm install
 ```
4. **Start the front-end development server:**
     ```bash
     npm run dev
      ```
### Smart Contract Deployment

1. **Open a new terminal and navigate to the same project directory:**
  ```bash
  cd carbon-oracle-hooks
 ```
2. **Deploy the smart contracts using Forge:**
```bash
   forge script script/DeployHook.s.sol --rpc-url <YOUR_RPC_URL> --private-key <YOUR_PRIVATE_KEY> --broadcast
 ```


   



   
