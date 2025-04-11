import { useState } from "react";
// import extensions from "./data/data.json";
import "./styles.css";

// v5 - can I have a separate list of Uninstalled Extensions?

const initialExtensions = [
  {
    logo: "./assets/images/logo-devlens.svg",
    name: "DevLens",
    description:
      "Quickly inspect page layouts and visualize element boundaries.",
    isInstalled: true,
    isActive: true,
  },
  {
    logo: "./assets/images/logo-style-spy.svg",
    name: "StyleSpy",
    description: "Instantly analyze and copy CSS from any webpage element.",
    isInstalled: true,
    isActive: true,
  },
  {
    logo: "./assets/images/logo-speed-boost.svg",
    name: "SpeedBoost",
    description: "Optimizes browser resource usage to accelerate page loading.",
    isInstalled: true,
    isActive: false,
  },
  {
    logo: "./assets/images/logo-json-wizard.svg",
    name: "JSONWizard",
    description:
      "Formats, validates, and prettifies JSON responses in-browser.",
    isInstalled: true,
    isActive: true,
  },
  {
    logo: "./assets/images/logo-tab-master-pro.svg",
    name: "TabMaster Pro",
    description: "Organizes browser tabs into groups and sessions.",
    isInstalled: true,
    isActive: true,
  },
  {
    logo: "./assets/images/logo-viewport-buddy.svg",
    name: "ViewportBuddy",
    description:
      "Simulates various screen resolutions directly within the browser.",
    isInstalled: true,
    isActive: false,
  },
  {
    logo: "./assets/images/logo-markup-notes.svg",
    name: "Markup Notes",
    description:
      "Enables annotation and notes directly onto webpages for collaborative debugging.",
    isInstalled: true,
    isActive: true,
  },
  {
    logo: "./assets/images/logo-grid-guides.svg",
    name: "GridGuides",
    description:
      "Overlay customizable grids and alignment guides on any webpage.",
    isInstalled: true,
    isActive: false,
  },
  {
    logo: "./assets/images/logo-palette-picker.svg",
    name: "Palette Picker",
    description: "Instantly extracts color palettes from any webpage.",
    isInstalled: true,
    isActive: true,
  },
  {
    logo: "./assets/images/logo-link-checker.svg",
    name: "LinkChecker",
    description: "Scans and highlights broken links on any page.",
    isInstalled: true,
    isActive: true,
  },
  {
    logo: "./assets/images/logo-dom-snapshot.svg",
    name: "DOM Snapshot",
    description: "Capture and export DOM structures quickly.",
    isInstalled: true,
    isActive: false,
  },
  {
    logo: "./assets/images/logo-console-plus.svg",
    name: "ConsolePlus",
    description:
      "Enhanced developer console with advanced filtering and logging.",
    isInstalled: false,
    isActive: true,
  },
];

// let help = 1;

export default function App() {
  // const [isActive, setIsActive] = useState(true);
  const [filterBy, setFilterBy] = useState("all");
  const [extensions, setExtensions] = useState(initialExtensions);

  function handleActiveSwitch(name) {
    setExtensions((prevExtensions) =>
      prevExtensions.map((ext) =>
        ext.name === name ? { ...ext, isActive: !ext.isActive } : ext
      )
    );
  }

  function handleInstall(name) {
    setExtensions((prevExtensions) =>
      prevExtensions.map((ext) =>
        ext.name === name
          ? { ...ext, isInstalled: !ext.isInstalled, isActive: false }
          : ext
      )
    );
  }

  function handleFilterBy(id) {
    // setExtensions((prevExtensions) => {
    //   if (id === "all") {
    //     return prevExtensions; // don't filter at all
    //   } else if (id === "active") {
    //     return initialExtensions.filter((ext) => ext.isActive);
    //   } else if (id === "inactive") {
    //     return initialExtensions.filter((ext) => !ext.isActive);
    //   }
    // });
    setFilterBy(id);
  }

  const filteredExtensions = extensions.filter((ext) => {
    if (filterBy === "active") return ext.isActive;
    if (filterBy === "inactive") return !ext.isActive;
    return true; // "all" or default
  });

  const installedExtensions = filteredExtensions.filter((ext) => {
    return ext.isInstalled;
  });

  const uninstalledExtensions = filteredExtensions.filter((ext) => {
    return !ext.isInstalled;
  });

  return (
    <div className="frame">
      <PageHeader />
      <ExtensionsListHeader
        handleFilterBy={handleFilterBy}
        filterBy={filterBy}
      />
      <ExtensionsList
        extensions={installedExtensions}
        handleInstall={handleInstall}
        handleActiveSwitch={handleActiveSwitch}
      />
      <ExtensionsList
        extensions={uninstalledExtensions}
        handleInstall={handleInstall}
        handleActiveSwitch={handleActiveSwitch}
      >
        Uninstalled Extensions
      </ExtensionsList>
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

function Button({
  id,
  className,
  filterBy,
  onClick,
  handleInstall,
  handleFilterBy,
  children,
}) {
  return (
    <button id={id} className={className} onClick={(e) => onClick(e.target.id)}>
      {children}
    </button>
  );
}

function ExtensionsListHeader({ filterBy, handleFilterBy }) {
  return (
    <section id="extension-list-header" className="flex-container">
      <div className="flex-container">
        <h2>Extensions List</h2>
        <div className="flex-container">
          <Button
            id={"all"}
            className={
              `btn-filter` + (filterBy === "all" ? " active-filter" : "")
            }
            onClick={handleFilterBy}
            key={"all"}
          >
            All
          </Button>
          <Button
            id={"active"}
            className={
              `btn-filter` + (filterBy === "active" ? " active-filter" : "")
            }
            onClick={handleFilterBy}
            key={"active"}
          >
            Active
          </Button>
          <Button
            id={"inactive"}
            className={
              `btn-filter` + (filterBy === "inactive" ? " active-filter" : "")
            }
            onClick={handleFilterBy}
            key={"inactive"}
          >
            Inactive
          </Button>
        </div>
      </div>
    </section>
  );
}

function ExtensionsList({
  extensions,
  handleInstall,
  handleActiveSwitch,
  children,
}) {
  return (
    <>
      <h2>{children}</h2>
      <ul className="grid-container extensions-list">
        {extensions.map((extension) => (
          <Extension
            logo={extension.logo}
            name={extension.name}
            description={extension.description}
            isinstalled={extension.isInstalled}
            isactive={extension.isActive}
            key={extension.name}
            handleInstall={handleInstall}
            handleActiveSwitch={handleActiveSwitch}
          />
        ))}
      </ul>
    </>
  );
}

function Extension({
  logo,
  name,
  description,
  isinstalled,
  isactive,
  handleInstall,
  handleActiveSwitch,
}) {
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
        <Button onClick={handleInstall} id={name}>
          {isinstalled === true ? "uninstall" : "install"}
        </Button>
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
