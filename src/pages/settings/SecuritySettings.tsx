import React, { useState } from 'react';
import { Card, Form, Input, Button, List, Switch, Divider, message } from 'antd';
import { Lock, Smartphone, Shield, Key } from 'lucide-react';

export default function SecuritySettings() {
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Password updated successfully');
    } catch (error) {
      message.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const securityMethods = [
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: <Smartphone className="w-5 h-5 text-purple-500" />,
      action: <Switch />,
    },
    {
      title: 'Security Questions',
      description: 'Set up security questions for account recovery',
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      action: <Button type="link">Configure</Button>,
    },
    {
      title: 'Active Sessions',
      description: 'Manage your active login sessions',
      icon: <Key className="w-5 h-5 text-purple-500" />,
      action: <Button type="link">View All</Button>,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Security Settings</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage your account security and authentication methods</p>
        </div>
      </div>

      <Card title="Change Password" className="shadow-sm">
        <Form layout="vertical" onFinish={handlePasswordChange}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true, message: 'Please enter your current password' }]}
            >
              <Input.Password prefix={<Lock className="w-4 h-4 text-gray-400" />} />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: 'Please enter a new password' },
                { min: 8, message: 'Password must be at least 8 characters' },
              ]}
            >
              <Input.Password prefix={<Lock className="w-4 h-4 text-gray-400" />} />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<Lock className="w-4 h-4 text-gray-400" />} />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" loading={loading}>
            Update Password
          </Button>
        </Form>
      </Card>

      <Card title="Security Methods" className="shadow-sm">
        <List
          itemLayout="horizontal"
          dataSource={securityMethods}
          renderItem={(item) => (
            <List.Item
              actions={[item.action]}
            >
              <List.Item.Meta
                avatar={item.icon}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}