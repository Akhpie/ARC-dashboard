import React, { useState } from "react";
import {
  Steps,
  Button,
  Upload,
  Select,
  Card,
  Typography,
  message,
  Input,
  List,
  Modal,
  Tag,
} from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  InboxOutlined,
  LeftOutlined,
  ReloadOutlined,
  FileOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { RotateCwIcon } from "lucide-react";

const { Option } = Select;
const { Title, Text } = Typography;
const { Dragger } = Upload;

interface UploadResourceProps {
  onComplete?: (fileList: UploadFile[]) => void;
}

const UploadResources: React.FC<UploadResourceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resourceType, setResourceType] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [fileToReupload, setFileToReupload] = useState<number | null>(null);
  const [isUploadedResourceModalVisible, setIsUploadedResourcesModalVisible] =
    useState(false);

  const steps = [
    {
      title: "Select",
      description: "Type Of Resource",
    },
    {
      title: "Upload",
      description: "Upload Resource",
    },
    {
      title: "Verify / Check",
      description: "Review Upload",
    },
  ];

  const handleTypeSelect = (value: string) => {
    setResourceType(value);
    setCurrentStep(1);
  };

  const handleUpload = (info: any) => {
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      if (fileToReupload !== null) {
        // Replace the existing file
        const newFileList = [...fileList];
        newFileList[fileToReupload] = info.file;
        setFileList(newFileList);
        setFileToReupload(null);
      } else {
        setFileList([...fileList, info.file]);
      }
      setCurrentStep(2);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleDownloadResource = (file: UploadFile) => {
    // Create a URL for the file
    const url = URL.createObjectURL(file.originFileObj as Blob);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    message.success(`Downloading ${file.name}`);
  };

  const handleReUpload = (index: number) => {
    setFileToReupload(index);
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep === 2) {
      const newUploadedFiles = [...uploadedFiles, ...fileList];
      setUploadedFiles(newUploadedFiles);
      onComplete?.(fileList);
      message.success("Videos uploaded successfully!");
      setFileList([]); // Clear current upload list
      setCurrentStep(0); // Reset to first step
      setResourceType(undefined); // Reset video type
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleDeleteVideo = (index: number) => {
    const newUploadedFiles = [...uploadedFiles];
    newUploadedFiles.splice(index, 1);
    setUploadedFiles(newUploadedFiles);
    message.success("Video deleted successfully");
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (fileToReupload !== null) {
        setFileToReupload(null);
      }
    }
  };

  const UploadedVideosModal = () => (
    <Modal
      title="Uploaded Videos"
      open={isUploadedResourceModalVisible}
      onCancel={() => setIsUploadedResourcesModalVisible(false)}
      footer={[
        <Button
          key="close"
          type="primary"
          onClick={() => setIsUploadedResourcesModalVisible(false)}
        >
          Close
        </Button>,
      ]}
      width={1200}
    >
      {uploadedFiles.length === 0 ? (
        <div className="text-center py-8">
          <Text type="secondary">No Resources uploaded yet</Text>
        </div>
      ) : (
        <List
          dataSource={uploadedFiles}
          renderItem={(file, index) => (
            <List.Item
              actions={[
                <Button
                  key="download"
                  type="link"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownloadResource(file)}
                >
                  Download
                </Button>,
                <Button
                  key="edit"
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setFileToReupload(index);
                    setCurrentStep(1);
                    setIsUploadedResourcesModalVisible(false);
                  }}
                >
                  Edit
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteVideo(index)}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <FileOutlined
                    style={{ fontSize: "24px", color: "#1890ff" }}
                  />
                }
                title={
                  <div className="flex items-center gap-2">
                    {file.name}
                    <Tag color="blue">
                      {file.type || resourceType || "Video"}
                    </Tag>
                  </div>
                }
                description={
                  <div>
                    <Text type="secondary">
                      Uploaded on: {new Date().toLocaleDateString()}
                    </Text>
                    <br />
                    <Text type="secondary">
                      Size: {(file.size! / (1024 * 1024)).toFixed(2)} MB
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

  const renderNavigation = () => {
    return (
      <div className="flex justify-between mt-4">
        {currentStep > 0 && (
          <Button icon={<LeftOutlined />} onClick={handleBack}>
            Back
          </Button>
        )}
        {currentStep < 2 && (
          <Button type="primary" className="ml-auto" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === 2 && (
          <Button type="primary" className="ml-auto" onClick={handleNext}>
            Complete
          </Button>
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="mt-6">
            <Select
              placeholder="Type Of Video"
              style={{ width: "100%" }}
              onChange={handleTypeSelect}
              size="large"
              value={resourceType}
            >
              <Option value="PDF">PDF</Option>
              <Option value="DOC">WORD DOC</Option>
            </Select>
            {renderNavigation()}
          </Card>
        );

      case 1:
        return (
          <Card className="mt-6">
            <Title level={5}>Upload Manual Resource</Title>
            <Upload
              customRequest={({ file, onSuccess }: any) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              onChange={handleUpload}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Manual Upload</Button>
            </Upload>

            <Title level={5} className="mt-4">
              Upload Resource Link
            </Title>
            <Input placeholder="Google Drive Link..." className="mb-4" />

            <Title level={5}>Or Drag and Drop Resource</Title>
            <Dragger
              customRequest={({ file, onSuccess }: any) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              onChange={handleUpload}
              multiple={false}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Upload Resource</p>
            </Dragger>

            {fileToReupload !== null && (
              <div className="mt-4">
                <span>Replacing: {fileList[fileToReupload]?.name}</span>
              </div>
            )}

            {renderNavigation()}
          </Card>
        );

      case 2:
        return (
          <Card className="mt-6">
            {fileList.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded mb-2"
              >
                <span>{file.name}</span>
                <div>
                  <Button
                    type="dashed"
                    className="mr-2"
                    onClick={() => handleReUpload(index)}
                  >
                    Re-Upload
                  </Button>
                  <CheckCircleOutlined
                    style={{ color: "#52c41a", fontSize: "20px" }}
                  />
                </div>
              </div>
            ))}
            {renderNavigation()}
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="mb-4">
          Upload Resources
        </Title>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          iconPosition="end"
          onClick={() => setIsUploadedResourcesModalVisible(true)}
        >
          Uploaded Resources
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
      <UploadedVideosModal />
    </div>
  );
};

export default UploadResources;
