import { Avatar, Empty, Select } from "antd";
import { useEffect, useState } from "react";
import { GiGears } from "react-icons/gi";
import { showToast } from "../../components/ShowToast";
import api from "../../services/api";
import { Container } from "./styles";

export function Assets() {
  const [assets, setAssets] = useState<IAsset[]>([]);

  const { Option } = Select;

  async function getAssets() {
    try {
      await api.get("/assets").then((response) => {
        setAssets(response.data);
      });
    } catch (error) {
      showToast({
        type: "error",
        message: `Couldn't get the assets`,
        description: `The API was not able to retrieve the data from the database, please refresh the page`,
      });
    }
  }

  useEffect(() => {
    getAssets();
  }, []);

  return (
    <>
      {assets.length === 0 ? (
        <Empty />
      ) : (
        <Container>
          <div className="SelectDiv">
            <Select
              showSearch
              style={{ width: 250 }}
              defaultValue={assets[0].assetName}
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toLowerCase()
                  .localeCompare(
                    (optionB!.children as unknown as string).toLowerCase()
                  )
              }
            >
              {assets.map((asset, index) => {
                return <Option value={`${index}`}>{asset.assetName}</Option>;
              })}
            </Select>
          </div>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<GiGears size="110%" />}
            style={{ color: "#fefefe", backgroundColor: "#1890ff" }}
          />
        </Container>
      )}
    </>
  );
}
