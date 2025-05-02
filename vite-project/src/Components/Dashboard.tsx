import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import CardComponent from "./CardComponent";

interface DashboardProps {
  searchQuery: string;
}

const Dashboard: React.FC<DashboardProps> = ({ searchQuery }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const openAddWidgetModal = () => {
    setSelectedCategoryId("default-category-id");
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log("Sidebar state updated:", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <span
          style={{
            whiteSpace: "nowrap",
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "flex-start",
            borderColor: "#a9a9a9"
          }}
        >
          CNAPP Dashboard
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Button
            variant="outlined"
            component="label"
            style={{
              alignItems: "center",
              marginRight: "4px",
              borderColor: "#a9a9a9",
              color: "#a9a9a9"
            }}
            onClick={openAddWidgetModal}
          >
            Add Widget
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                fill="#a9a9a9"
              />
            </svg>
          </Button>
          <Button
            variant="outlined"
            component="label"
            style={{
              borderColor: "#a9a9a9",
              color: "#a9a9a9",
              marginRight: "4px"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 9.69494 20.1334 7.59227 18.7083 6L16 3M12 3C7.02944 3 3 7.02944 3 12C3 14.3051 3.86656 16.4077 5.29168 18L8 21M21 3H16M16 3V8M3 21H8M8 21V16"
                stroke="#a9a9a9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
          <Button
            variant="outlined"
            component="label"
            style={{
              borderColor: "#a9a9a9",
              marginRight: "4px"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="-6.5 0 20 20"
              version="1.1"
            >
              <title>menu_option [#1374]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-306.000000, -800.000000)"
                  fill="#a9a9a9"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M253.5,658 C252.857167,658 252.333333,657.551 252.333333,657 C252.333333,656.449 252.857167,656 253.5,656 C254.142833,656 254.666667,656.449 254.666667,657 C254.666667,657.551 254.142833,658 253.5,658 M253.5,654 C251.566833,654 250,655.343 250,657 C250,658.657 251.566833,660 253.5,660 C255.433167,660 257,658.657 257,657 C257,655.343 255.433167,654 253.5,654 M253.5,651 C252.857167,651 252.333333,650.551 252.333333,650 C252.333333,649.449 252.857167,649 253.5,649 C254.142833,649 254.666667,649.449 254.666667,650 C254.666667,650.551 254.142833,651 253.5,651 M253.5,647 C251.566833,647 250,648.343 250,650 C250,651.657 251.566833,653 253.5,653 C255.433167,653 257,651.657 257,650 C257,648.343 255.433167,647 253.5,647 M253.5,642 C254.142833,642 254.666667,642.449 254.666667,643 C254.666667,643.551 254.142833,644 253.5,644 C252.857167,644 252.333333,643.551 252.333333,643 C252.333333,642.449 252.857167,642 253.5,642 M253.5,646 C255.433167,646 257,644.657 257,643 C257,641.343 255.433167,640 253.5,640 C251.566833,640 250,641.343 250,643 C250,644.657 251.566833,646 253.5,646"
                      id="menu_option-[#1374]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </Button>
          <Button
            variant="outlined"
            component="label"
            style={{
              gap: "4px",
              borderColor: "#a9a9a9",
              color: "#a9a9a9"
            }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                  fill="#a9a9a9"
                />
                <path
                  d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2343 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.5459 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"
                  fill="#a9a9a9"
                />
              </svg>
            </span>
            <span>Last 2 days</span>
          </Button>
        </div>
      </div>

      <Box
        style={{
          display: "flex",
          filter: isSidebarOpen ? "blur(4px)" : "none",
          transition: "filter 0.3s ease"
        }}
      >
        <CardComponent
          searchQuery={searchQuery}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </Box>

      {isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "300px",
            height: "100%",
            backgroundColor: "#fff",
            boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
            zIndex: 1000,
            padding: "20px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <button
            style={{
              alignSelf: "flex-end",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer"
            }}
            onClick={toggleSidebar}
          >
            ✖
          </button>
          <h3>Add Widget</h3>
          <p>Sidebar content goes here...</p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
