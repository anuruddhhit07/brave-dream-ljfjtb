
//const express = require('express')
import express from "express"
import { TradingViewAPI } from "tradingview-scraper"
import { connect, getCandles } from 'tradingview-ws'

//const TradingView = require('../main');
import * as TradingView from '@mathieuc/tradingview/main.js'

const bitcoinSymbol = "BTCUSD";
const tv = new TradingViewAPI();

const app = express()
const port = 3000

/*

(async function() {
  const connection = await connect()
  const candles = await getCandles({
    connection,
    symbols: ['FX:AUDCAD', 'FX:AUDCHF'],
    amount: 10_000,
    timeframe: 60
  })
  await connection.close()
  console.log(`Candles for AUDCAD:`, candles[0])
  console.log(`Candles for AUDCHF:`, candles[1])
}());

*/
const client = new TradingView.Client(); // Creates a websocket client

const chart = new client.Session.Chart(); // Init a Chart session
console.log(client)
chart.setMarket('BINANCE:BTCEUR', { // Set the market
  timeframe: 'D',
});

chart.onError((...err) => { // Listen for errors (can avoid crash)
  console.error('Chart error:', ...err);
  // Do something...
});

chart.onSymbolLoaded(() => { // When the symbol is successfully loaded
  console.log(`Market "${chart.infos.description}" loaded !`);
});
/*
chart.onUpdate(() => { // When price changes
  if (!chart.periods[0]) return;
  console.log(`[${chart.infos.description}]:h ${chart.periods[0].close} ${chart.infos.currency_id}`);
  // Do something...
});
*/

const asyncFunc = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Helloo World!"), 1000)
  })
}

async function asyncCall() {
  console.log('calling');
const connection = await connect()
  const candles = await getCandles({
    connection,
    symbols: ["NSE:NIFTY",'FX:AUDCAD', 'FX:AUDCHF'],
    amount: 2,
    timeframe: 5
  })
  await connection.close()
  console.log(candles[0])
  //console.log(`Candles for AUDCAD:`, candles[0])
 // console.log(`Candles for AUDCHF:`, candles[1])
  return candles[0]
  // Expected output: "resolved"
}
console.log("value",asyncCall())

/*
const  tvasyncfn=() =>{
  const connection = await connect()
  const candles = await getCandles({
    connection,
    symbols: ['FX:AUDCAD', 'FX:AUDCHF'],
    amount: 10_000,
    timeframe: 60
  })
  await connection.close()
  console.log(`Candles for AUDCAD:`, candles[0])
  console.log(`Candles for AUDCHF:`, candles[1])
  return candles
}
console.log("value",tvasyncfn())

*/

app.get('/', async (req, res) => {
  /*
  let aa=2
  chart.onUpdate(()=>{
    if(!chart.periods[0]) return;
    console.log("hhhh")
    aa= 1
   // return res.send("1344")
  })
  */
  /*
  const connection = await connect()
  const candles = await getCandles({
    connection,
    symbols: ['FX:AUDCAD', 'FX:AUDCHF'],
    amount: 2,
    timeframe: 60
  })
  await connection.close()
  console.log(candles)
  */
  
  const result2 = await asyncCall()
  console.log(result2[0].timestamp)
  const unixTimestamp = result2[0].timestamp

const milliseconds = unixTimestamp * 1000 // 1575909015000
 const result = await asyncFunc()
 const dt= new Date(milliseconds)
 //return res.send(dt.toLocaleString())
 return res.json(result2[0])
})


app.get('/home', async (req, res) => {
  //res.send('Hello World!')
  /*
 (async function(){
   const connection = await connect()
   const candles = await getCandles({
    connection,
    symbols: ['NSE:NIFTY', 'NSE:BANKNIFTY'],
    amount: 2,
    timeframe: 60
  })
  await connection.close()
  console.log(`Candles for AUDCAD:`, candles[0])
  console.log(`Candles for AUDCHF:`, candles[1])
    console.log("hi")
 }())
 */
 
 /*
 chart.onUpdate(() => { // When price changes
  if (!chart.periods[0]) return;
  console.log(`[${chart.infos.description}]:gg ${chart.periods[0].close} ${chart.infos.currency_id}`);
  // Do something...
});
 */

  /*
 tv.setup().then(() =>
  tv.getTicker(bitcoinSymbol).then((ticker) =>
    ticker
      .fetch()
      .then(console.log)
      .then(() => {
       // tv.cleanup();
      })
  )
);
*/
const result = await asyncFunc()
  return res.send(result)
 // res.send("hiii")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})