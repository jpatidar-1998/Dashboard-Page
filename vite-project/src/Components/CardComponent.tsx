import { useEffect, useState } from "react";
import PieChartComponent from "./PieChartComponent";
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField
} from "@mui/material";

interface CardComponentProps {
  searchQuery: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ searchQuery }) => {
  interface WidgetSettings {
    labels?: string[];
    data?: number[];
    colors?: string[];
  }

  interface Widget {
    id: string;
    type: string;
    title: string;
    settings: WidgetSettings;
  }

  interface Category {
    id: string;
    name?: string;
    widgets: Widget[];
  }

  interface DashboardData {
    dashboard: {
      categories: Category[];
    };
  }

  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWidgetTitle, setNewWidgetTitle] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");

  useEffect(() => {
    fetch("/json/widget.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }, []);

  const handleAddWidget = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const handleSaveWidget = () => {
    if (!selectedCategoryId || !newWidgetTitle || !newWidgetText) return;

    const updatedData = {
      ...data,
      dashboard: { categories: data?.dashboard?.categories || [] }
    };
    const category = updatedData.dashboard?.categories.find(
      (cat) => cat.id === selectedCategoryId
    );

    if (category) {
      category.widgets.push({
        id: `widget-${Date.now()}`, // Unique ID
        type: "custom", // Example type
        title: newWidgetTitle,
        settings: {
          labels: [newWidgetText]
        }
      });
    }

    setData(updatedData as DashboardData);
    setIsModalOpen(false);
    setNewWidgetTitle("");
    setNewWidgetText("");
  };

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    if (!data) return;

    const updatedData = { ...data };
    const category = updatedData.dashboard.categories.find(
      (cat) => cat.id === categoryId
    );

    if (category) {
      console.log("Before removing widget:", category.widgets);
      category.widgets = category.widgets.filter(
        (widget) => widget.id !== widgetId
      );
      console.log("After removing widget:", category.widgets);
    }

    setData(updatedData as DashboardData);
  };

  const filteredWidgets = data
    ? data.dashboard.categories.flatMap((category) =>
        category.widgets.filter((widget) =>
          widget.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  return (
    <div className="flex flex-col">
      {/* Conditionally Render Search Results */}
      {searchQuery.trim() && filteredWidgets.length > 0 && (
        <List style={{ zIndex: 50 }}>
          {filteredWidgets.map((widget) => (
            <ListItem key={widget.id}>
              <ListItemText
                primary={widget.title}
                secondary={widget.settings.labels?.[0]}
              />
            </ListItem>
          ))}
        </List>
      )}
      {data ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px"
          }}
        >
          {data.dashboard.categories.map((category) => (
            <Box
              key={category.id}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              {category.name ? (
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignContent: "flex-start",
                    fontSize: "20px"
                  }}
                >
                  {category.name}
                </h2>
              ) : (
                <Button
                  variant="contained"
                  component="label"
                  style={{
                    marginBottom: "10px"
                  }}
                >
                  Upload File
                  <input type="file" hidden />
                </Button>
              )}
              <Card style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {category.widgets.map((widget) => (
                  <Box
                    key={widget.id}
                    style={{
                      borderRadius: "10px",
                      padding: "20px",
                      margin: "4px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "300px",
                      height: "300px"
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3>{widget.title}</h3>
                      {widget.type === "pie" &&
                      widget.settings.labels &&
                      widget.settings.data &&
                      widget.settings.colors ? (
                        <PieChartComponent
                          labels={widget.settings.labels}
                          data={widget.settings.data}
                          colors={widget.settings.colors}
                          width={160}
                          height={230}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                            width: "100%"
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            fill="gray"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                          </svg>
                          <p
                            style={{
                              marginLeft: "10px",
                              color: "gray",
                              fontSize: "16px"
                            }}
                          >
                            No graph Data Available!
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveWidget(category.id, widget.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}

                {Array.from(
                  { length: Math.max(0, 3 - category.widgets.length) },
                  (_, index) => (
                    <Box
                      key={`placeholder-${category.id}-${index}`}
                      style={{
                        borderRadius: "10px",
                        padding: "20px",
                        margin: "4px",
                        backgroundColor: "#e0e0e0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "300px",
                        height: "300px"
                      }}
                    >
                      <Button
                        variant="outlined"
                        style={{
                          marginBottom: "10px"
                        }}
                        onClick={() => handleAddWidget(category.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50px"
                          height="50px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                            fill="#1C274C"
                          />
                        </svg>
                        Add Widget
                      </Button>
                    </Box>
                  )
                )}
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        <p>Loading...</p>
      )}

      {/* Modal for Adding Widget */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
          }}
        >
          <h3>Add Widget</h3>
          <TextField
            label="Widget Title"
            fullWidth
            value={newWidgetTitle}
            onChange={(e) => setNewWidgetTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Widget Text"
            fullWidth
            value={newWidgetText}
            onChange={(e) => setNewWidgetText(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button variant="contained" onClick={handleSaveWidget}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CardComponent;
