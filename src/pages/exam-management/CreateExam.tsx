import React, { useState } from "react";
import {
  Steps,
  Button,
  Upload,
  Select,
  Card,
  Typography,
  message,
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
import { ExamFile, Exam, ExamType } from "../../types/types";
import { useExams } from "../../context/ExamContext";

const { Option } = Select;
const { Title, Text } = Typography;
const { Dragger } = Upload;

const CreateExam = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [examType, setExamType] = useState<string>();
  const [questionPaper, setQuestionPaper] = useState<ExamFile[]>([]);
  const [answerSheet, setAnswerSheet] = useState<ExamFile[]>([]);
  const [uploadedExams, setUploadedExams] = useState<ExamFile[]>([]);
  const [isExamListVisible, setIsExamListVisible] = useState(false);
  const { addExam } = useExams();

  const steps = [
    {
      title: "Select",
      description: "Type of Exam",
    },
    {
      title: "Upload",
      description: "Upload Files",
    },
    {
      title: "Verify",
      description: "Review Files",
    },
  ];

  const handleTypeSelect = (value: string) => {
    setExamType(value);
    setCurrentStep(1);
  };

  const handleQuestionUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
      setQuestionPaper([info.file]);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed`);
    }
  };

  const handleAnswerUpload = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
      setAnswerSheet([info.file]);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed`);
    }
  };

  // const handleComplete = () => {
  //   const examFiles = [...questionPaper, ...answerSheet];
  //   setUploadedExams([...uploadedExams, ...examFiles]);
  //   message.success("Exam files uploaded successfully!");
  //   setQuestionPaper([]);
  //   setAnswerSheet([]);
  //   setCurrentStep(0);
  //   setExamType(undefined);
  // };
  const handleComplete = () => {
    const newExam: Exam = {
      id: Date.now().toString(),
      title: `Exam ${uploadedExams.length + 1}`,
      type: examType?.toUpperCase() + " Exam" || "EXAM",
      date: new Date().toLocaleDateString("en-US"),
      questionPaper: questionPaper[0],
      answerScript: answerSheet[0],
    };
    addExam(newExam);
    message.success("Exam files uploaded successfully!");
    setQuestionPaper([]);
    setAnswerSheet([]);
    setCurrentStep(0);
    setExamType(undefined);
  };

  const handleDeleteExam = (index: number) => {
    const newUploadedExams = [...uploadedExams];
    newUploadedExams.splice(index, 1);
    setUploadedExams(newUploadedExams);
    message.success("Exam deleted successfully");
  };

  const handleDownload = (file: ExamFile) => {
    // In a real implementation, this would handle actual file download
    message.success(`Downloading ${file.name}`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="mt-6">
            <Select
              placeholder="Select Exam Type"
              style={{ width: "100%" }}
              onChange={handleTypeSelect}
              value={examType}
              size="large"
            >
              <Option value="mock">Mock Exam</Option>
              <Option value="final">Final Exam</Option>
              <Option value="quiz">Quiz</Option>
            </Select>
          </Card>
        );

      case 1:
        return (
          <Card className="mt-6">
            <div style={{ marginBottom: 24 }}>
              <Title level={5}>Upload Question Paper</Title>
              <Upload
                customRequest={({ onSuccess }: any) =>
                  setTimeout(() => onSuccess("ok"), 0)
                }
                onChange={handleQuestionUpload}
                maxCount={1}
                className="mb-4"
              >
                <Button icon={<UploadOutlined />}>Manual Upload</Button>
              </Upload>

              <Title level={5} style={{ marginTop: 16 }}>
                Or Drag and Drop Question Paper
              </Title>
              <Dragger
                customRequest={({ onSuccess }: any) =>
                  setTimeout(() => onSuccess("ok"), 0)
                }
                onChange={handleQuestionUpload}
                multiple={false}
                showUploadList={false}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag question paper to this area
                </p>
              </Dragger>
            </div>

            <div>
              <Title level={5}>Upload Answer Sheet</Title>
              <Upload
                customRequest={({ onSuccess }: any) =>
                  setTimeout(() => onSuccess("ok"), 0)
                }
                onChange={handleAnswerUpload}
                maxCount={1}
                className="mb-4"
              >
                <Button icon={<UploadOutlined />}>Answers Upload</Button>
              </Upload>

              <Title level={5} style={{ marginTop: 16 }}>
                Or Drag and Drop Answer Sheet
              </Title>
              <Dragger
                customRequest={({ onSuccess }: any) =>
                  setTimeout(() => onSuccess("ok"), 0)
                }
                onChange={handleAnswerUpload}
                multiple={false}
                showUploadList={false}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag answer sheet to this area
                </p>
              </Dragger>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="mt-6">
            {questionPaper.map((file, index) => (
              <div
                key={`question-${index}`}
                className="flex justify-between items-center p-4 border rounded mb-2"
              >
                <div>
                  <FileOutlined style={{ marginRight: 8 }} />
                  <span>{file.name}</span>
                  <Tag color="blue" style={{ marginLeft: 8 }}>
                    Question Paper
                  </Tag>
                </div>
                <CheckCircleOutlined style={{ color: "#52c41a" }} />
              </div>
            ))}

            {answerSheet.map((file, index) => (
              <div
                key={`answer-${index}`}
                className="flex justify-between items-center p-4 border rounded mb-2"
              >
                <div>
                  <FileOutlined style={{ marginRight: 8 }} />
                  <span>{file.name}</span>
                  <Tag color="green" style={{ marginLeft: 8 }}>
                    Answer Sheet
                  </Tag>
                </div>
                <CheckCircleOutlined style={{ color: "#52c41a" }} />
              </div>
            ))}
          </Card>
        );

      default:
        return null;
    }
  };

  const ExamListModal = () => (
    <Modal
      title="Uploaded Exams"
      open={isExamListVisible}
      onCancel={() => setIsExamListVisible(false)}
      footer={[
        <Button
          key="close"
          type="primary"
          onClick={() => setIsExamListVisible(false)}
        >
          Close
        </Button>,
      ]}
      width={1000}
    >
      {uploadedExams.length === 0 ? (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <Text type="secondary">No exams uploaded yet</Text>
        </div>
      ) : (
        <List
          dataSource={uploadedExams}
          renderItem={(file, index) => (
            <List.Item
              actions={[
                <Button
                  key="download"
                  type="link"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(file)}
                >
                  Download
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteExam(index)}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <FileOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                }
                title={file.name}
                description={
                  <>
                    <Text type="secondary">
                      Type: {examType || "Exam"} | Size:{" "}
                      {(file.size / 1024).toFixed(2)} KB
                    </Text>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={2}>Prepare Exam</Title>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => setIsExamListVisible(true)}
        >
          View Uploaded Exams
        </Button>
      </div>

      <Steps current={currentStep} items={steps} />

      {renderStepContent()}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 24,
        }}
      >
        {currentStep > 0 && (
          <Button
            icon={<LeftOutlined />}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </Button>
        )}

        {currentStep < 2 && (
          <Button
            type="primary"
            style={{ marginLeft: "auto" }}
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={currentStep === 1 && questionPaper.length === 0}
          >
            Next
          </Button>
        )}

        {currentStep === 2 && (
          <Button
            type="primary"
            style={{ marginLeft: "auto" }}
            onClick={handleComplete}
          >
            Complete
          </Button>
        )}
      </div>

      <ExamListModal />
    </div>
  );
};

export default CreateExam;
