import { ethers } from 'ethers';
import { message } from 'antd';
import copy from 'copy-to-clipboard';

// 隐藏地址
export const hideAddress = (address: string | undefined) => {
  if (!address) return '';
  return address.slice(0, 6) + '****' + address.slice(-4);
};

// 复制文字
export const copyText = (data: any) => {
  copy(JSON.stringify(data));
  message.success('复制成功');
};

/**
 * @param {string} mnemonic 助记词
 * @param {string} receiver 接收地址
 * @param {string} amount  数量
 */
export const transferETH = async (
  mnemonic: string,
  receiver: string,
  amount: string,
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  // 获取当前用户地址
  await provider.send('eth_requestAccounts', []);

  // 检测接收地址
  try {
    receiver = ethers.utils.getAddress(receiver);
  } catch (e) {
    throw new Error(`Invalid address: ${receiver}`);
  }
  // 转换的ETH数量
  let amountFormat = ethers.utils.parseEther(amount);

  let walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);
  // 利用钱包进行ETH间的转账
  let wallet = new ethers.Wallet(walletMnemonic.privateKey, provider);
  // console.log('wallet', wallet);
  let nonce = await wallet.getTransactionCount();
  let tx = {
    nonce: nonce,
    to: receiver,
    value: amountFormat,
  };
  let resp = await wallet.sendTransaction(tx);
  console.log('resp', resp);
  // 获取收据
  // const receipt = await resp.wait();
  // console.log('receipt', receipt);
  resp.wait().then((item) => {
    message.success(`${item?.transactionHash} 交易成功`);
    console.log('交易完成', item);
  });
  return resp;
};
