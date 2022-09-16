import { PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import Logo from "../../assets/favicon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillGearFill } from "react-icons/bs";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface ILayout {
  children?: JSX.Element;
}

function PageLayout({ children }: ILayout) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [menu, setMenu] = useState(location.pathname);

  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem("Dashboard", "", <PieChartOutlined />),
    getItem("Máquinas", "assets", <BsFillGearFill />),
  ];

  useEffect(() => {
    if (menu === "") {
      navigate(`/`);
      localStorage.clear();
    }
    if (menu === "assets") {
      navigate(`/assets`);
    }
  }, [menu]);
  return (
    <Container>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <img
              src={Logo}
              width="100%"
              height="100%"
              style={{ userSelect: "none" }}
              alt="Fix it"
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            defaultSelectedKeys={[menu.split("/")[1]]}
            onSelect={(event) => {
              navigate(`/${event.key}`);
              setMenu(event.key);
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb> */}
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Container>
  );
}

export default PageLayout;
