import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { TaskAPI } from '../services/API';
import { CreateTaskDto } from '../models/Task';

interface TaskFormProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * Modal form component for creating a new task
 */
const TaskForm: React.FC<TaskFormProps> = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: CreateTaskDto) => {
    setLoading(true);
    try {
      await TaskAPI.createTask(values);
      message.success('Task created successfully!');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create task. Please try again.';
      message.error(errorMessage);
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Create New Task"
      open={visible}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Create"
      cancelText="Cancel"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Task Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter a task name' },
            { min: 3, message: 'Task name must be at least 3 characters' },
          ]}
        >
          <Input placeholder="e.g., Print Hello World" />
        </Form.Item>

        <Form.Item
          label="Owner"
          name="owner"
          rules={[
            { required: true, message: 'Please enter the owner name' },
            { min: 2, message: 'Owner name must be at least 2 characters' },
          ]}
        >
          <Input placeholder="e.g., John Doe" />
        </Form.Item>

        <Form.Item
          label="Command"
          name="command"
          rules={[
            { required: true, message: 'Please enter a command' },
          ]}
          extra="Note: Dangerous commands (rm, sudo, etc.) will be rejected by the backend"
        >
          <Input.TextArea
            placeholder="e.g., echo Hello World"
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
