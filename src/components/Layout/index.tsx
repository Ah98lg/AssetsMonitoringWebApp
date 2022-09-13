import { PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Container } from "./styles";
import Logo from "../../assets/favicon.svg";
import { useNavigate } from "react-router-dom";
import { BsFillGearFill, BsFillPersonFill } from "react-icons/bs";
import { MdStore } from "react-icons/md";

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

  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem("Dashboard", "", <PieChartOutlined />),
    getItem("Máquinas", "assets", <BsFillGearFill />),
  ];

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
            defaultSelectedKeys={[""]}
            mode="inline"
            items={items}
            onSelect={(event) => {
              navigate(`/${event.key}`);
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "4.2rem 0 0" }}>
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
          <Footer style={{ textAlign: "center" }}>
            Assets Monitoring ©2022
          </Footer>
        </Layout>
      </Layout>
    </Container>
  );
}

export default PageLayout;