import {
  Button,
  Card,
  Input,
  List,
  message,
  Modal,
  Select,
  Steps,
  Tag,
  Typography,
  Upload,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Option } = Select;
const { Title, Text } = Typography;
const { Dragger } = Upload;
import { IResource } from "../../types/resourceTypes";
import { DeleteIcon, DownloadIcon, FileIcon } from "lucide-react";

const UploadResources: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resourceType, setResourceType] = useState<"PDF" | "DOC">();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [resources, setResources] = useState<IResource[]>([]);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const steps = [
    { title: "Select", description: "Type Of Resource" },
    { title: "Details", description: "Resource Information" },
    { title: "Verify", description: "Review Information" },
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/resources");
      setResources(response.data);
    } catch (error) {
      message.error("Failed to fetch resources");
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/resources", {
        title,
        subject,
        resourceType,
        driveLink,
      });
      message.success("Resource added successfully!");
      fetchResources();
      resetForm();
    } catch (error) {
      message.error("Failed to add resource");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`);
      message.success("Resource deleted successfully");
      fetchResources();
    } catch (error) {
      message.error("Failed to delete resource");
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setResourceType(undefined);
    setTitle("");
    setSubject("");
    setDriveLink("");
  };

  const handleNext = () => {
    if (currentStep === 2) {
      handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="mt-6">
            <Select
              placeholder="Type Of Resource"
              style={{ width: "100%" }}
              onChange={(value: "PDF" | "DOC") => setResourceType(value)}
              size="large"
              value={resourceType}
            >
              <Option value="PDF">PDF</Option>
              <Option value="DOC">WORD DOC</Option>
            </Select>
          </Card>
        );

      case 1:
        return (
          <Card className="mt-6">
            <div className="space-y-4">
              <div>
                <Title level={5}>Resource Title</Title>
                <Input
                  placeholder="Enter resource title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Title level={5}>Subject</Title>
                <Select
                  placeholder="Select subject"
                  style={{ width: "100%" }}
                  onChange={(value) => setSubject(value)}
                  value={subject}
                >
                  <Option value="mathematics">Mathematics</Option>
                  <Option value="physics">Physics</Option>
                  <Option value="chemistry">Chemistry</Option>
                  <Option value="biology">Biology</Option>
                </Select>
              </div>
              <div>
                <Title level={5}>Google Drive Link</Title>
                <Input
                  placeholder="Paste Google Drive link"
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                />
              </div>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="mt-6">
            <List>
              <List.Item>
                <List.Item.Meta
                  title="Resource Type"
                  description={resourceType}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Title" description={title} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Subject" description={subject} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Drive Link" description={driveLink} />
              </List.Item>
            </List>
          </Card>
        );

      default:
        return null;
    }
  };

  const ResourcesModal = () => (
    <Modal
      title="Available Resources"
      open={isViewModalVisible}
      onCancel={() => setIsViewModalVisible(false)}
      footer={[
        <Button
          key="close"
          type="primary"
          onClick={() => setIsViewModalVisible(false)}
        >
          Close
        </Button>,
      ]}
      width={1000}
    >
      {resources.length === 0 ? (
        <div className="text-center py-8">
          <Text type="secondary">No resources available</Text>
        </div>
      ) : (
        <List
          dataSource={resources}
          renderItem={(resource) => (
            <List.Item
              actions={[
                <Button
                  key="download"
                  type="link"
                  icon={<DownloadIcon />}
                  onClick={() => window.open(resource.driveLink, "_blank")}
                >
                  View/Download
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  danger
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(resource._id)}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <FileIcon style={{ fontSize: "24px", color: "#1890ff" }} />
                }
                title={
                  <div className="flex items-center gap-2">
                    {resource.title}
                    <Tag color="blue">{resource.resourceType}</Tag>
                  </div>
                }
                description={
                  <div>
                    <Text type="secondary">Subject: {resource.subject}</Text>
                    <br />
                    <Text type="secondary">
                      Added on:{" "}
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mb-6">
        <Title level={2} className="mb-0">
          Upload Resources
        </Title>
        <Button type="primary" onClick={() => setIsViewModalVisible(true)}>
          View Resources
        </Button>
      </div>

      <Steps
        current={currentStep}
        items={steps.map((item, index) => ({
          key: index,
          title: item.title,
          description: item.description,
        }))}
      />

      {renderStepContent()}

      <div className="flex justify-between mt-4">
        {currentStep > 0 && <Button onClick={handleBack}>Back</Button>}
        <Button
          type="primary"
          className="ml-auto"
          onClick={handleNext}
          disabled={
            (currentStep === 0 && !resourceType) ||
            (currentStep === 1 && (!title || !subject || !driveLink))
          }
        >
          {currentStep === 2 ? "Submit" : "Next"}
        </Button>
      </div>

      <ResourcesModal />
    </div>
  );
};

export default UploadResources;
