import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Switch, Divider, Upload, message } from 'antd';
import { User, Mail, Globe, Bell, Upload as UploadIcon } from 'lucide-react';

export default function GeneralSettings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Settings updated successfully');
    } catch (error) {
      message.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">General Settings</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and settings</p>
        </div>
      </div>

      <Card title="Profile Information" className="shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: 'John Doe',
            email: 'john@example.com',
            language: 'en',
            timezone: 'UTC',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input prefix={<User className="w-4 h-4 text-gray-400" />} placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input prefix={<Mail className="w-4 h-4 text-gray-400" />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item name="language" label="Language">
              <Select
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                ]}
              />
            </Form.Item>

            <Form.Item name="timezone" label="Timezone">
              <Select
                options={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'EST', label: 'Eastern Time' },
                  { value: 'PST', label: 'Pacific Time' },
                ]}
              />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form>
      </Card>

      <Card title="Notifications" className="shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
            </div>
            <Switch defaultChecked />
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium">Push Notifications</h4>
              <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>
    </div>
  );
}