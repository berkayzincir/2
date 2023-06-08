
import './App.css';
import Header from './compenents/Header';
import TopLabel from "./compenents/TopLabel"
import Status from "./compenents/Status"
import AdminActions from './compenents/AdminActions';
import GradientButton from './compenents/reusables/GradientButton';
import InfoBox from './compenents/InfoBox';
import InputCompenent from './compenents/InputCompenent';
import DueCompenent from './compenents/DueCompenent';
import BinBinCompenent from './compenents/BinBinCompenent';
import Footer from './compenents/Footer';

import {
  getUserAdress,
  register,
  getBinBinsByStatus,
  getBinBin,
  getOwner,
  login,
} from "./Web3Client.js";


import {useState, useEffect} from "react";
import Web3 from "web3";
const web3 = new Web3();

function App() {
const [showModal, setShowModal] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
const [userName, setUserName] = useState("");
const [binbins, setBinBins] = useState([]);
const [name, setName] = useState({});
const [lastName, setLastName] = useState ({})
const [isAdmin, setisAdmin] = useState(false);
const [userCredit, setUserCredit] = useState("0");
const [due, setDue] = useState("0");
const [isAvailable, setIsAvailable] = useState("BinBin Rent");
const [rideMins, setrideMins] = useState("0");
const [address, setAddress] = useState("");
const emptyAddress = "0x0000000000000000000000000000000000000000"

useEffect(()=> {
const handleInit = async () =>{
  let isAUser = await login();
      if (isAUser?.address !== emptyAddress) {
        if (isAUser?.name) {
          setLoggedIn(true);
          setUserCredit(web3.utils.fromWei(isAUser.balance, "ether"));
        }
        setUserName(isAUser?.name);
        setLastName(isAUser?.lastame);
        setAddress(isAUser?.walletAddress);
        let userDue = 0
   
          userDue = web3.utils.fromWei(isAUser.debt, "ether").toString();
          setDue(Number(userDue));
   
          let owner = await getOwner();
          if (address === owner.toString().toLowerCase()) {
            setisAdmin(true);
          }
    
        
        let address = await getUserAdress();
      
    let binbinArray = [];
    let binbinsByStatus = await getBinBinsByStatus(2);
    binbinArray.push(...binbinsByStatus);
    if(isAUser.rentedBinBinId !== "0") {
      const userBinBin = await getBinBin(Number(isAUser.rentedBinBinId));
      binbinArray.push(userBinBin)
    }
    setBinBins(binbinArray);
    if(isAUser.rentedBinBinId !== "0"){
      let rentedBinBin = await getBinBin(isAUser.rentedBinBin);
      setIsAvailable(`Rented ${rentedBinBin.name} - ${rentedBinBin.id}`)
    } else{
      console.warn(userDue);
      if(userDue !== "0"){
        setIsAvailable("Pay your due to rent again!")
      }
    }
let rideMins = "0";
if(isAUser.rentedBinBinId !== "0"){
  rideMins = Math.floor((Math.floor(Date.now()/1000)-isAUser.start)/60).toString();
}
setrideMins(rideMins);
  }
}
handleInit();
}, [])


const handleNameChange = (e) => {
  setName(e.target.value)
}

const handleLastNameChange = (e) => {
  setLastName(e.target.value)
}

const handleRegister = async (e) => {
  e.preventDefault();
  try {
    let res = await register(name, lastName);
    if (res) {
      setLoggedIn(true);
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
    <div>
        <Header loggedIn={loggedIn}/>
        {loggedIn ? (
          <div>
              <div>
                  <TopLabel userName={userName} address={address} lastName={lastName}/>
              </div>
              <div>
                {isAdmin && (
                  <GradientButton
                    onClick={()=> setShowModal(true)}
                    title="Admin Actions"
                  />
                )}
              </div>
          <div>
              <div>
                <div>
                  <InfoBox
                    label="BNB Credit"
                    number={userCredit}
                  />
                  <InfoBox label="BNB Due" number={due}/>
                  <InfoBox
                    label ="Ride Minutes"
                    number={rideMins}
                  />
                  <div>
                    <Status status={isAvailable}/>
                  </div>
                </div>
              </div>
          </div>

          <div>
                  <InputCompenent
                    holder="Credit Balance"
                    label="Credit your account"
                    type="credit"
                  />
                  <DueCompenent
                    label="pay your due"
                  />
                  <InputCompenent
                    holder="Withdraw Balance"
                    label="Withdraw your account"
                    type="Withdraw"
                  />
          </div>
                {/*BinBin Section*/}
              <div>
                {binbins.length>0 ? (
                  binbins.map((binbin)=>(
                    <div key={binbin.id}>
                      <BinBinCompenent
                        binbinStatus ={binbin.status}
                        rentFee = {binbin.rentFee}
                        saleFee= {binbin.saleFee}
                        image= {binbin.imgURL}
                        id = {binbin.id}
                        name= {binbin.name}
                      />
                    </div>
                  ))

                

                ):(
                  <div>
                    <div> BinBins are Loading...</div>
                  </div>
                )}
              </div>
            </div>

        ) : (

          <form
            onSubmit={handleRegister}
          >
            <div >
              <input
                type="text"
                onChange={handleNameChange}
                placeholder="Name"
                
              />

<span>
                Name
              </span>
              </div>
            <div>
              <input
                type="text"
                onChange={handleLastNameChange}
                placeholder="Lastname"
                
              />
              <span>
                Lastname
              </span>
            </div>
            <button type="submit">
              <div>
                Register
              </div>
            </button>
          </form>
        )}
  </div>
  <Footer />
      {isAdmin && <AdminActions />}
    </>
  );
}

export default App;
