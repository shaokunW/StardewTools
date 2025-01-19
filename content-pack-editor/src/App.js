import React, { useState } from "react";
import {
  Layout,
  Select,
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Card,
  Row,
  Col,
  Typography,
} from "antd";
import "./App.css";

const { Header, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

function App() {
  const [contentPack, setContentPack] = useState({
    Changes: [],
  });

  const [selectedAction, setSelectedAction] = useState("EditData");
  const [selectedTarget, setSelectedTarget] = useState("Data/Shops");
  const [furnitureData, setFurnitureData] = useState({
    id: "",
    name: "",
    type: "reco",
    tilesheetSize: "1 1",
    boundingBoxSize: "1 1",
    rotations: "2",
    price: "0",
    placementRestriction: "-1",
    displayName: "",
    spriteIndex: "0",
    texture: "TileSheets/furniture",
    offLimitsForRandomSale: false,
    contextTags: [],
  });

  const handleFurnitureChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFurnitureData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContextTagsChange = (values) => {
    setFurnitureData((prev) => ({
      ...prev,
      contextTags: values,
    }));
  };

  const handleApply = () => {
    if (selectedTarget === "Data/Furniture" && selectedAction === "EditData") {
      // Ensure texture path uses backslashes and escapes them
      const formattedTexture = furnitureData.texture
        .replace(/\\/g, "\\\\")
        .replace(/\//g, "\\");

      const furnitureEntry = [
        furnitureData.name,
        furnitureData.type,
        furnitureData.tilesheetSize,
        furnitureData.boundingBoxSize,
        furnitureData.rotations,
        furnitureData.price,
        furnitureData.placementRestriction,
        furnitureData.displayName,
        furnitureData.spriteIndex,
        formattedTexture,
        furnitureData.offLimitsForRandomSale,
        furnitureData.contextTags.join(" "),
      ].join("/");

      setContentPack({
        Changes: [
          {
            Action: selectedAction,
            Target: selectedTarget,
            Entries: {
              [furnitureData.id]: furnitureEntry,
            },
          },
        ],
      });
    }
  };

  const parseFurnitureEntry = (entry) => {
    const values = entry.split("/");
    setFurnitureData({
      id: "", // Add id field to store the furniture ID
      name: values[0],
      type: values[1],
      tilesheetSize: values[2],
      boundingBoxSize: values[3],
      rotations: values[4],
      price: values[5],
      placementRestriction: values[6],
      displayName: values[7],
      spriteIndex: values[8] || "0",
      texture: values[9] || "TileSheets/furniture",
      offLimitsForRandomSale: values[10] === "true",
      contextTags: values[11] ? values[11].split(" ") : [],
    });
  };

  // Example usage:
  // You can call this function when loading an existing entry
  // parseFurnitureEntry("1226", "Furniture Catalogue/table/2 2/-1/1/200000/-1/[LocalizedText Strings\\Furniture:FurnitureCatalogue]///true");

  const renderFurnitureForm = () => {
    if (selectedTarget !== "Data/Furniture" || selectedAction !== "EditData")
      return null;

    return (
      <Card title="Furniture Editor" style={{ marginTop: 16 }}>
        <Form layout="vertical">
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <Form.Item label="id">
                <Input
                  name="id"
                  value={furnitureData.id}
                  onChange={handleFurnitureChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Name">
                <Input
                  name="name"
                  value={furnitureData.name}
                  onChange={handleFurnitureChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Type">
                <Select
                  name="type"
                  value={furnitureData.type}
                  onChange={(value) =>
                    handleFurnitureChange({ target: { name: "type", value } })
                  }
                >
                  <Option value="chair">chair</Option>
                  <Option value="armchair">armchair</Option>
                  <Option value="bed">bed</Option>
                  <Option value="bed child">bed child</Option>
                  <Option value="bed double">bed double</Option>
                  <Option value="bench">bench</Option>
                  <Option value="bookcase">bookcase</Option>
                  <Option value="couch">couch</Option>
                  <Option value="decor">decor</Option>
                  <Option value="dresser">dresser</Option>
                  <Option value="fireplace">fireplace</Option>
                  <Option value="fishtank">fishtank</Option>
                  <Option value="lamp">lamp</Option>
                  <Option value="long table">long table</Option>
                  <Option value="other">other</Option>
                  <Option value="painting">painting</Option>
                  <Option value="randomized_plant">randomized_plant</Option>
                  <Option value="rug">rug</Option>
                  <Option value="sconce">sconce</Option>
                  <Option value="table">table</Option>
                  <Option value="torch">torch</Option>
                  <Option value="window">window</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Tilesheet Size">
                <Input
                  name="tilesheetSize"
                  value={furnitureData.tilesheetSize}
                  onChange={handleFurnitureChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Bounding Box Size">
                <Input
                  name="boundingBoxSize"
                  value={furnitureData.boundingBoxSize}
                  onChange={handleFurnitureChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Rotations">
                <Select
                  name="rotations"
                  value={furnitureData.rotations}
                  onChange={(value) =>
                    handleFurnitureChange({
                      target: { name: "rotations", value },
                    })
                  }
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="4">4</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Price">
                <InputNumber
                  name="price"
                  value={furnitureData.price}
                  onChange={(value) =>
                    handleFurnitureChange({ target: { name: "price", value } })
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Placement Restriction">
                <Select
                  name="placementRestriction"
                  value={furnitureData.placementRestriction}
                  onChange={(value) =>
                    handleFurnitureChange({
                      target: { name: "placementRestriction", value },
                    })
                  }
                >
                  <Option value="-1">Default</Option>
                  <Option value="0">Indoors Only</Option>
                  <Option value="1">Outdoors Only</Option>
                  <Option value="2">Indoors or Outdoors</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Display Name">
                <Input
                  name="displayName"
                  value={furnitureData.displayName}
                  onChange={handleFurnitureChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Sprite Index">
                <InputNumber
                  name="spriteIndex"
                  value={furnitureData.spriteIndex}
                  onChange={(value) =>
                    handleFurnitureChange({
                      target: { name: "spriteIndex", value },
                    })
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Texture">
                <Input
                  name="texture"
                  value={furnitureData.texture}
                  onChange={handleFurnitureChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Off Limits for Random Sale">
                <Switch
                  name="offLimitsForRandomSale"
                  checked={furnitureData.offLimitsForRandomSale}
                  onChange={(checked) =>
                    handleFurnitureChange({
                      target: {
                        name: "offLimitsForRandomSale",
                        type: "checkbox",
                        checked,
                      },
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Context Tags"
                tooltip="Enter tags and press Enter. Example: fish_ocean, !fish_carnivorous"
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Enter tags and press Enter"
                  value={furnitureData.contextTags}
                  onChange={handleContextTagsChange}
                  tokenSeparators={[","]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" onClick={handleApply} block>
            Apply Changes
          </Button>
        </Form>
      </Card>
    );
  };

  return (
    <Layout className="layout">
      <Header style={{ background: "#fff", padding: "0 24px" }}>
        <Title level={2}>Stardew Valley Content Pack Editor</Title>
      </Header>
      <Content style={{ padding: "24px" }}>
        <Card>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Action">
                <Select
                  value={selectedAction}
                  onChange={(value) => setSelectedAction(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="EditData">EditData</Option>
                  <Option value="EditImage">EditImage</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Target">
                <Select
                  value={selectedTarget}
                  onChange={(value) => setSelectedTarget(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="Data/Shops">Data/Shops</Option>
                  <Option value="Data/Furniture">Data/Furniture</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {selectedTarget === "Data/Furniture" &&
            selectedAction === "EditData" && (
              <Card title="Load Existing Entry" style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item label="Entry String">
                      <Input.TextArea
                        id="loadEntry"
                        placeholder="e.g., Furniture Catalogue/table/2 2/-1/1/200000/-1/[LocalizedText Strings\\Furniture:FurnitureCatalogue]///true"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Button
                      type="primary"
                      onClick={() => {
                        const entry =
                          document.getElementById("loadEntry").value;
                        if (entry) {
                          parseFurnitureEntry(entry);
                        }
                      }}
                    >
                      Load Entry
                    </Button>
                  </Col>
                </Row>
              </Card>
            )}

          {renderFurnitureForm()}

          <Card title="Preview" style={{ marginTop: 16 }}>
            <pre
              style={{ background: "#f5f5f5", padding: 16, borderRadius: 4 }}
            >
              {JSON.stringify(contentPack, null, 2)}
            </pre>
          </Card>
        </Card>
      </Content>
    </Layout>
  );
}

export default App;
