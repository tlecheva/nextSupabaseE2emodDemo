import * as React from 'react';
import {
  ColorModeProvider,
  IconButton,
  Typography,
} from '@airbus/components-react';
import {
  Menu as MenuIcon,
  ArrowLeft as ArrowLeftIcon,
  Chevronleft as ChevronLeftIcon,
  Chevronright as ChevronRightIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
} from '@airbus/icons/react';

import { SideBarContent } from './SideBarContent';

function SideBarAndContent() {
  const sideBarTitles =
    //['Attributes', 'Multi-standard', 'Sketches & Comments', '..', 'Master Schedule', '..etc..']
    [
      { title: 'Attributes', component: 'Attributes' },
      { title: 'Multi-standard' },
      { title: 'Sketches & Comments' },
      { title: '...' },
      { title: 'Master Schedule', component: 'MasterSchedule' },
      { title: '..etc.' },
    ];
  const [showSideBar, setShowSideBar] = React.useState<boolean>(true);
  const [stickySideBar, setStickySideBar] = React.useState<boolean>(false);
  const [component, setComponent] = React.useState<string>(
    sideBarTitles[0].title,
  );
  const [title, setTitle] = React.useState<string>(sideBarTitles[0].title);

  const onClickMenuSidebar = () => {
    setShowSideBar(!showSideBar);
    setStickySideBar(false);
  };
  const onClickSticky = () => {
    setStickySideBar(!stickySideBar);
  };
  const onHoveringOnClosedSidebar = () => {
    if (stickySideBar) return;
    if (!showSideBar) setShowSideBar(true);
  };
  const onLeavingOpenSidebar = () => {
    if (stickySideBar) return;
    if (showSideBar) setShowSideBar(false);
  };
  const onSideBarMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // find in sideBarTitles the component with match the title and set it to component
    const title = e.currentTarget.innerText;
    setTitle(title);
    const clickedComponent = sideBarTitles.find(
      sbTitle => sbTitle.title === title,
    )?.component;
    setComponent(clickedComponent || '');
  };
  return (
    <div className="sidebar-container">
      <aside
        className={`sidebar-items${showSideBar ? '' : ' sidebar-collapsed'}`}
        onMouseEnter={onHoveringOnClosedSidebar}
        onMouseLeave={onLeavingOpenSidebar}
      >
        <ColorModeProvider mode="dark">
          <div className="sidebar-items-right-aligned flex-col">
            <div className="flex">
              <IconButton
                variant="ghost"
                aria-label="Search"
                tooltip="Sticky sidebar"
                onClick={onClickMenuSidebar}
              >
                <ChevronLeftIcon />
                {/* {!stickySideBar ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
              </IconButton>
              <IconButton
                onClick={onClickSticky}
                variant="ghost"
                aria-label="Menu"
                tooltip="Sticky sidebar"
              >
                {!stickySideBar && <ChevronRightIcon />}
                {/* <MenuIcon /> */}
              </IconButton>
            </div>

            {!showSideBar && (
              <div className="sidebar-vertical-text">{title}</div>
            )}
          </div>
          {showSideBar &&
            sideBarTitles.map((sbTitle, i) => (
              <Typography
                key={sbTitle.title}
                variant={'medium'}
                className={`mr-5 
                                ${sbTitle.component ? 'hover:bg-blue-500 cursor-pointer' : ''}
                                ${component === sbTitle.component ? 'bg-blue-700' : ''}
                            `}
                onClick={sbTitle.component ? onSideBarMenuClick : undefined}
              >
                {sbTitle.title}
              </Typography>
            ))}
        </ColorModeProvider>
      </aside>
      <SideBarContent showSideBar={showSideBar} component={component} />
    </div>
  );
}

export default SideBarAndContent;
