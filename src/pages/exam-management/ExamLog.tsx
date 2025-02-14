import React from "react";
import {
  Card,
  Button,
  Typography,
  Layout,
  Row,
  Col,
  Space,
  Tooltip,
  message,
} from "antd";
import {
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
  RedoOutlined,
  ShareAltOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useExams } from "../../context/ExamContext";
import { Exam } from "../../types/types";

const { Title, Text } = Typography;

const ExamLog: React.FC = () => {
  const { exams, deleteExam } = useExams();

  const handleDelete = (id: string) => {
    deleteExam(id);
    message.success("Exam deleted successfully");
  };

  const handleDownload = (file: any) => {
    message.info(`Downloading ${file.name}`);
  };

  const handleView = () => {
    message.info("Opening file viewer...");
  };

  const handleReTest = () => {
    message.info("Initiating re-test...");
  };

  return (
    <Layout style={{ background: "#f0f2f5", padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
        Exam Log
      </Title>

      <Row gutter={24}>
        <Col xs={24} lg={18}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {exams.map((exam) => (
              <Card
                key={exam.id}
                style={{ width: "100%" }}
                bodyStyle={{ padding: 24 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Space>
                    <Text strong style={{ color: "#1890ff", fontSize: 16 }}>
                      {exam.title} [ {exam.type} ]
                    </Text>
                    <Tooltip title="Share">
                      <Button type="text" icon={<ShareAltOutlined />} />
                    </Tooltip>
                  </Space>
                </div>

                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <Card
                    size="small"
                    bordered={false}
                    style={{ background: "#fff" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text>{exam.questionPaper.name}</Text>
                      <Space>
                        <Tooltip title="View">
                          <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={handleView}
                          />
                        </Tooltip>
                        <Tooltip title="Download">
                          <Button
                            type="text"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownload(exam.questionPaper)}
                          />
                        </Tooltip>
                        <Tooltip title="More">
                          <Button type="text" icon={<ArrowDownOutlined />} />
                        </Tooltip>
                      </Space>
                    </div>
                  </Card>

                  {exam.answerScript && (
                    <Card
                      size="small"
                      bordered={false}
                      style={{ background: "#fff" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text>{exam.answerScript.name}</Text>
                        <Space>
                          <Tooltip title="View">
                            <Button
                              type="text"
                              icon={<EyeOutlined />}
                              onClick={handleView}
                            />
                          </Tooltip>
                          <Tooltip title="Download">
                            <Button
                              type="text"
                              icon={<DownloadOutlined />}
                              onClick={() => handleDownload(exam.answerScript)}
                            />
                          </Tooltip>
                          <Tooltip title="More">
                            <Button type="text" icon={<ArrowDownOutlined />} />
                          </Tooltip>
                        </Space>
                      </div>
                    </Card>
                  )}
                </Space>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 16,
                    gap: 8,
                  }}
                >
                  <Button
                    icon={<RedoOutlined />}
                    onClick={handleReTest}
                    style={{
                      borderColor: "#00b96b",
                      color: "#00b96b",
                    }}
                  >
                    Re-Test
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(exam.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </Space>
        </Col>

        <Col xs={24} lg={6}>
          <Card style={{ background: "#00b96b", color: "#fff" }}>
            <Title level={4} style={{ color: "#fff", marginBottom: 24 }}>
              Conducted Exams
            </Title>
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              {exams.map((exam) => (
                <div key={exam.id}>
                  <Text
                    style={{ color: "#fff", display: "block", marginBottom: 8 }}
                  >
                    • Date: {exam.date}
                  </Text>
                  <Card size="small" style={{ background: "#fff" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#1890ff" }}>
                        {exam.title} [ {exam.type} ]
                      </Text>
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={handleView}
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default ExamLog;
