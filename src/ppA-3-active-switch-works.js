import { useState } from "react";
// import extensions from "./data/data.json";
import "./styles.css";

const initialExtensions = [
  {
    logo: "./assets/images/logo-devlens.svg",
    name: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isActive: true,
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isActive: false,
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isActive: true,
  },
];

// let help = 1;

export default function App() {
  // const [isActive, setIsActive] = useState(true);
  const [filterBy, setFilterBy] = useState("");
  const [filteredExtensions, setFilteredExtensions] =
    useState(initialExtensions);

  function handleActiveSwitch(name) {
    setFilteredExtensions((prevExtensions) =>
      prevExtensions.map((ext) =>
        ext.name === name ? { ...ext, isActive: !ext.isActive } : ext
      )
    );
  }

  function handleFilterBy(id) {
    setFilteredExtensions((prevExtensions) => {
      if (id === "all") {
        return prevExtensions; // don't filter at all
      } else if (id === "active") {
        return initialExtensions.filter((ext) => ext.isActive);
      } else if (id === "inactive") {
        return initialExtensions.filter((ext) => !ext.isActive);
      }
    });
  }

  return (
    <div className="frame">
      <PageHeader />
      <ExtensionsListHeader handleFilterBy={handleFilterBy} />
      <ExtensionsList
        filteredExtensions={filteredExtensions}
        handleActiveSwitch={handleActiveSwitch}
      />
    </div>
  );
}

function PageHeader() {
  return (
    <>
      <div className="flex-container">
        <h1>Extensions</h1>
        <div>lightdark_icon</div>
      </div>
    </>
  );
}

function Button({ id, handleFilterBy, children }) {
  return (
    <button id={id} onClick={(e) => handleFilterBy(e.target.id)}>
      {children}
    </button>
  );
}

function ExtensionsListHeader({ handleFilterBy }) {
  return (
    <div className="flex-container">
      <h2>Extensions List</h2>
      <div className="flex-container">
        <Button id={"all"} handleFilterBy={handleFilterBy} key={"all"}>
          All
        </Button>
        <Button id={"active"} handleFilterBy={handleFilterBy} key={"active"}>
          Active
        </Button>
        <Button
          id={"inactive"}
          handleFilterBy={handleFilterBy}
          key={"inactive"}
        >
          Inactive
        </Button>
      </div>
    </div>
  );
}

function Extension({ logo, name, description, isactive, handleActiveSwitch }) {
  return (
    // isactive && (
    <li
      className={
        `flex-container extension-card` + (!isactive ? ` not-active` : "")
      }
      key={name}
      isactive={isactive}
    >
      <div className="flex-container">
        <img className="extension-icon" src={logo} alt={name} />
        <div>
          {" "}
          <p>{name}</p>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex-container">
        <Button>Remove</Button>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => handleActiveSwitch(name)}
            checked={isactive}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </li>
    // )
  );
}

function ExtensionsList({ filteredExtensions, handleActiveSwitch }) {
  return (
    <ul className="flex-container extension-list">
      {filteredExtensions.map((extension) => (
        <Extension
          logo={extension.logo}
          name={extension.name}
          description={extension.description}
          isactive={extension.isActive}
          key={extension.name}
          handleActiveSwitch={handleActiveSwitch}
        />
      ))}
    </ul>
  );
}
