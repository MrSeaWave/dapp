import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
import { transferETH } from './utils';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface TransferPageProps {
  balance?: string;
  getInfo?: () => void;
}

const TransferPage = (props: TransferPageProps) => {
  const [loading, setLoading] = useState(false);
  const { balance, getInfo } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setLoading(true);
    const { mnemonic, address, amount } = values;
    transferETH(mnemonic, address, String(amount))
      .then((item) => {
        message.success(`转账成功，交易号：${item.hash}`);
        getInfo && getInfo();
      })
      .catch((e) => {
        console.log(e);
        let msg = '转账失败' + e.message;
        if (e.code === -32000) {
          msg += ` 还有运行中的交易：${e?.transactionHash}`;
        }
        message.error(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onReset = () => {
    form.resetFields();
    setLoading(false);
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="mnemonic"
        label="助记词"
        rules={[{ required: true, message: '请填写助记词' }]}
      >
        <Input placeholder="请填写助记词" />
      </Form.Item>
      <Form.Item
        name="address"
        label="地址"
        rules={[{ required: true, message: '请输入接收方地址' }]}
      >
        <Input placeholder="请输入接收方地址" />
      </Form.Item>
      <Form.Item
        name="amount"
        label="金额"
        rules={[{ required: true, message: '请输入转出数量' }]}
      >
        <InputNumber
          placeholder="请输入转出数量"
          min={0}
          max={Number(balance)}
          step={0.1}
          addonAfter={'ETH'}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: 20 }}
          loading={loading}
        >
          确定
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransferPage;
