import Web3 from "web3";
import BinBins from "./ABI/BinBins.json"

let selectedAccount;
let BinBinContract;
let isInitialized = false;
let BinBinContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

export const init = async () =>{
    let provider = window.ethereum;

    if (typeof provider !== "undefined"){
        provider.request({method: "eth_requestAccounts"})
        .then((accounts)=> {
            selectedAccount = accounts[0];
        })
        .catch((err)=>{
            return;
        })
    }

    window.ethereum.on("accountChanged", function(accounts){
        selectedAccount = accounts[0];
    });


    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    BinBinContract = new web3.eth.Contract(BinBins.abi,BinBinContractAddress);
    isInitialized = true;
};

export const getUserAdress = async() => {
    if(!isInitialized){
        await init();
    }
    return selectedAccount;
};

export const setOwner = async(newOwner) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.setOwner(newOwner.toLowerCase())
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}


export const register = async(name,surname) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.addUser(name,surname)
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const addBinBin = async(name,img,rent,sale) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.addBinBin(name,img,rent,sale)
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}


export const editBinBinMetaData = async(id,name,img,rent,sale) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.editBinBinMetaData(id,name,img,rent,sale)
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}


export const editStatus = async(id,status) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.editStatus(id,status)
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}



export const checkOut = async(id) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.checkOut(id)
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const checkIn = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.checkIn()
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}


export const deposit = async(value) => {
    if(!isInitialized){
        await init();
    }
    let send_value = Web3.utils.toWei(value, "ether");
    try{
let res = await BinBinContract.methods
.deposit()
.send({from: selectedAccount, value: send_value});
return res;
    }
    catch(e){
        console.log(e)
    }
}


export const makePayment = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.makePayment()
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const withdrawBalance = async(value) => {
    if(!isInitialized){
        await init();
    }
    let send_value = Web3.utils.toWei(value, "ether");
    try{
let res = await BinBinContract.methods
.withdrawBalance(send_value)
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const withdrawOwnerBalance = async(value) => {
    if(!isInitialized){
        await init();
    }
    let send_value = Web3.utils.toWei(value, "ether");
    try{
let res = await BinBinContract.methods
.withdrawOwnerBalance(send_value)
.send({from: selectedAccount});
return res;
    }
    catch(e){
        console.log(e)
    }
}


export const getOwner = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getOwner(selectedAccount).call();
return res.toString();
    }
    catch(e){
        console.log(e)
    }
}


export const login = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getUser(selectedAccount).call()
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const getBinBin = async(id) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getBinBin(id).call()
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const getRentedBinBinId = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getRentedBinBin().call()
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const getBinBinStatus = async(id) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getBinBinByStatus(id).call()
return res;
    }
    catch(e){
        console.log(e)
    }
}


export const getBinBinsByStatus = async(status) => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getBinBinsByStatus(status).call()
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const getCurrentCount = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getCurrentCount().call()
return res;
    }
    catch(e){
        console.log(e)
    }
}


export const getContractBalance = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getContractBalance().call({from:selectedAccount})
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const getTotalPayment = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.getTotalPayment().call({from:selectedAccount})
return res;
    }
    catch(e){
        console.log(e)
    }
}

export const getStartTime = async() => {
    if(!isInitialized){
        await init();
    }
    try{
let res = await BinBinContract.methods
.StartTime().call({from:selectedAccount})
return res;
    }
    catch(e){
        console.log(e)
    }
}


