import React from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { copyText, hideAddress } from './utils';
import styles from './index.less';

const { Meta } = Card;

interface MetaPageProps {
  address?: string;
  balance?: string;
  getInfo?: () => void;
}

export default function MetaPage(props: MetaPageProps) {
  const { address, getInfo, balance } = props;

  const description = (
    <Tooltip title={address}>
      <div onClick={() => copyText(address)}>
        {hideAddress(address)}
        <CopyOutlined style={{ marginLeft: 20 }} />
      </div>
    </Tooltip>
  );

  const title = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>{balance} ETH </div>
      <img
        className={styles.identicon}
        src="https://cdn.jsdelivr.net/gh/MrSeaWave/figure-bed-profile@main/uPic/2022/eth.svg"
        alt="eth"
      ></img>
    </div>
  );

  return (
    <Meta
      avatar={
        <div onClick={getInfo}>
          <Avatar src="https://joeschmoe.io/api/v1/random" size="large" />
        </div>
      }
      title={title}
      description={description}
    />
  );
}
