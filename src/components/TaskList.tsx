import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  message,
  Popconfirm,
  Tag,
  Tooltip,
  Card,
  Modal,
  Descriptions,
  Empty,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  ReloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Task, TaskExecution } from '../models/Task';
import { TaskAPI } from '../services/API';
import TaskForm from './TaskForm';
import dayjs from 'dayjs';

const { Search } = Input;

/**
 * Main component for displaying and managing tasks
 */
const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [executionModalVisible, setExecutionModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Fetch all tasks from the API
   */
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TaskAPI.fetchTasks();
      setTasks(data);
      setSearchTerm('');
    } catch (error: any) {
      message.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Search tasks by name
   */
  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      fetchTasks();
      return;
    }

    setLoading(true);
    setSearchTerm(value);
    try {
      const data = await TaskAPI.searchTasksByName(value);
      setTasks(data);
      if (data.length === 0) {
        message.info('No tasks found matching your search');
      }
    } catch (error: any) {
      message.error('Failed to search tasks');
      console.error('Error searching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Execute a task
   */
  const handleRunTask = async (taskId: string, taskName: string) => {
    setLoading(true);
    try {
      const updatedTask = await TaskAPI.runTask(taskId);
      message.success(`Task "${taskName}" executed successfully!`);
      // Update the task in the list
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to execute task';
      message.error(errorMessage);
      console.error('Error running task:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a task
   */
  const handleDeleteTask = async (taskId: string, taskName: string) => {
    setLoading(true);
    try {
      await TaskAPI.deleteTask(taskId);
      message.success(`Task "${taskName}" deleted successfully!`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error: any) {
      message.error('Failed to delete task');
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Show execution history modal
   */
  const showExecutionHistory = (task: Task) => {
    setSelectedTask(task);
    setExecutionModalVisible(true);
  };

  /**
   * Table columns configuration
   */
  const columns: ColumnsType<Task> = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      width: '15%',
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
      width: '25%',
      ellipsis: true,
      render: (text: string) => (
        <Tooltip title={text}>
          <code style={{ fontSize: '12px' }}>{text}</code>
        </Tooltip>
      ),
    },
    {
      title: 'Executions',
      dataIndex: 'taskExecutions',
      key: 'executions',
      width: '10%',
      align: 'center',
      render: (executions: TaskExecution[]) => (
        <Tag color={executions && executions.length > 0 ? 'green' : 'default'}>
          {executions ? executions.length : 0}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '30%',
      align: 'center',
      render: (_: any, record: Task) => (
        <Space size="small">
          <Tooltip title="Run Command">
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={() => handleRunTask(record.id, record.name)}
              size="small"
            >
              Run
            </Button>
          </Tooltip>
          <Tooltip title="View Execution History">
            <Button
              icon={<EyeOutlined />}
              onClick={() => showExecutionHistory(record)}
              size="small"
              disabled={!record.taskExecutions || record.taskExecutions.length === 0}
            >
              View Output
            </Button>
          </Tooltip>
          <Tooltip title="Delete Task">
            <Popconfirm
              title="Delete Task"
              description={`Are you sure you want to delete "${record.name}"?`}
              onConfirm={() => handleDeleteTask(record.id, record.name)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} size="small">
                Delete
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0 }}>Task Management</h2>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsFormVisible(true)}
              >
                Create Task
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchTasks}
                disabled={loading}
              >
                Refresh
              </Button>
            </Space>
          </div>
        }
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Search
            placeholder="Search tasks by name..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            loading={loading}
            style={{ maxWidth: '500px' }}
          />

          <Table
            columns={columns}
            dataSource={tasks}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} tasks`,
            }}
            locale={{
              emptyText: (
                <Empty
                  description={
                    searchTerm
                      ? 'No tasks found matching your search'
                      : 'No tasks available. Create your first task!'
                  }
                />
              ),
            }}
          />
        </Space>
      </Card>

      {/* Create Task Form Modal */}
      <TaskForm
        visible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        onSuccess={fetchTasks}
      />

      {/* Execution History Modal */}
      <Modal
        title={`Execution History: ${selectedTask?.name}`}
        open={executionModalVisible}
        onCancel={() => setExecutionModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setExecutionModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedTask && selectedTask.taskExecutions && selectedTask.taskExecutions.length > 0 ? (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {selectedTask.taskExecutions.map((execution, index) => (
              <Card key={index} type="inner" title={`Execution #${index + 1}`}>
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Start Time">
                    {dayjs(execution.startTime).format('YYYY-MM-DD HH:mm:ss')}
                  </Descriptions.Item>
                  <Descriptions.Item label="End Time">
                    {dayjs(execution.endTime).format('YYYY-MM-DD HH:mm:ss')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Output">
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {execution.output || '(No output)'}
                    </pre>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            ))}
          </Space>
        ) : (
          <Empty description="No execution history available" />
        )}
      </Modal>
    </div>
  );
};

export default TaskList;
