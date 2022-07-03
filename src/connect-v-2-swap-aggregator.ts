import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ConnectV2SwapAggregator,
  SwapCall
} from "../generated/SwapAggregator/ConnectV2SwapAggregator"
import { SwapAggregatorData, TransactionData } from "../generated/schema"

export const ZERO = new BigInt(0);

export function handleSwap(call: SwapCall): void {
  let id = call.transaction.hash.toHexString() + call.block.timestamp.toString();
  let swapData = createOrLoadSwapData(id);
  let transactionData = createOrLoadTransaction(id);

  transactionData.hash = call.transaction.hash;
  transactionData.from = call.transaction.from;
  transactionData.to = call.transaction.to;
  transactionData.index = call.transaction.index;
  transactionData.input = call.transaction.input;
  transactionData.gasLimit = call.transaction.gasLimit;
  transactionData.gasPrice = call.transaction.gasPrice;
  transactionData.gasUsed = call.block.gasUsed;
  transactionData.blockNumber = call.block.number;
  transactionData.value = call.transaction.value;
  transactionData.timestamp = call.block.timestamp;

  swapData.connectors = call.inputs._connectors;
  swapData.callData = call.inputs._datas;
  swapData.eventName = call.outputs._eventName;
  swapData.eventParams = call.outputs._eventParam;
  swapData.transactionDetail = transactionData.id;

  transactionData.save();
  swapData.save();
}

export function createOrLoadSwapData(id: string): SwapAggregatorData {
  let swapData = SwapAggregatorData.load(id);
  if(swapData == null){
    swapData = new SwapAggregatorData(id);
    swapData.callData = [];
    swapData.connectors = [];
    swapData.eventName = "";
    swapData.eventParams = new Bytes(0);
  }
  return swapData;
}

export function createOrLoadTransaction(id: string): TransactionData {
  let txn = TransactionData.load(id);
  if(txn == null){
    txn = new TransactionData(id);
    txn.index = ZERO;
    txn.from = new Address(0);
    txn.to = new Address(0);
    txn.input = new Bytes(0);
    txn.blockNumber = ZERO;
    txn.timestamp = ZERO;
    txn.gasUsed = ZERO;
    txn.gasLimit = ZERO;
    txn.gasPrice = ZERO;
    txn.value = ZERO;
    txn.hash = new Bytes(0);
  }
  return txn;
}
