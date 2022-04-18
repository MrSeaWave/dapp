import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card, message, Spin } from 'antd';
import styles from './index.less';
import MetaPage from './MetaPage';
import TransferPage from './TransferPage';

// 构建一个Dpp
// 转出ETH至某个地址
// 可以用来验证以太网地址

// MetaMask是一个存储加密货币的钱包，它也是连接到基于区块链的应用程序的一个网关。
export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0.0');

  async function fetchInfo() {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      // 获取地址
      let userAddress = await signer.getAddress();
      setAddress(userAddress);
      // 获取以太币数量。
      let balance = await provider.getBalance(userAddress);
      let balanceStr = ethers.utils.formatEther(balance);
      setBalance(balanceStr);
    } catch (e) {
      message.error('连接失败，请点击头像重新尝试');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Spin spinning={loading}>
        <Card
          hoverable
          style={{ width: 400 }}
          cover={
            <img
              alt="map"
              src="https://images.ctfassets.net/9sy2a0egs6zh/1zLT7PnFFsnIPEKvH8xfue/4956b13b3d2b2c4d49976c0d07583d47/about-map.svg"
            />
          }
        >
          <h3>账户信息：</h3>
          <MetaPage address={address} getInfo={fetchInfo} balance={balance} />
          <h3>转账：</h3>
          <TransferPage balance={balance} getInfo={fetchInfo} />
        </Card>
      </Spin>
    </div>
  );
}
