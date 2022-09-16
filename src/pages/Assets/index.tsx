import { Empty, Select } from "antd";
import { useEffect, useState } from "react";
import { showToast } from "../../components/ShowToast";
import api from "../../services/api";
import { AssetItem } from "./Components/AssetItem";
import { Container, DropdownContent, EmptyContainer } from "./styles";

export function Assets() {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [unities, setUnities] = useState<IUnity[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [selectedUnity, setSelectedUnity] = useState("");

  async function getCompanies() {
    try {
      await api.get("/companies").then((response) => {
        setCompanies(response.data);
      });
    } catch (error) {
      showToast({
        type: "error",
        message: `Couldn't get the data`,
        description: `The API was not able to retrieve the data from the database, please refresh the page`,
      });
    }
  }

  useEffect(() => {
    if (companyId !== "") {
      const selectedCompany = companies.find(
        (company) => company._id === companyId
      );
      if (selectedCompany) setUnities(selectedCompany?.unities);
    }
    if (selectedUnity !== "") {
      const unity = unities.find((unity) => unity._id === selectedUnity);
      if (unity) setAssets(unity?.assets);
    }
  }, [companyId, selectedUnity]);

  useEffect(() => {
    getCompanies();
  }, [companies?.length, unities.length]);

  return (
    <>
      {companies?.length === 0 && unities.length === 0 ? (
        <EmptyContainer>
          <Empty />
        </EmptyContainer>
      ) : (
        <Container>
          <DropdownContent>
            <Select
              placeholder="Escolha a companhia"
              onSelect={(event: any) => {
                setCompanyId(event);
              }}
              style={{ width: "300px" }}
            >
              {companies.map((company) => {
                return (
                  <Select.Option value={company._id}>
                    {company.companyName}
                  </Select.Option>
                );
              })}
            </Select>
            <Select
              placeholder="Escolha a unidade"
              style={{ width: "300px" }}
              onSelect={(event: any) => {
                setSelectedUnity(event);
              }}
              disabled={companyId === ""}
            >
              {unities.map((unity) => {
                return (
                  <Select.Option value={unity._id}>
                    {unity.unityName}
                  </Select.Option>
                );
              })}
            </Select>
          </DropdownContent>
          {assets.length !== 0 ? (
            assets.map((asset) => {
              return (
                <AssetItem
                  companyId={companyId}
                  companies={companies}
                  unityId={selectedUnity}
                  asset={asset}
                  handleRender={() => window.location.reload()}
                />
              );
            })
          ) : (
            <EmptyContainer>
              <Empty />
            </EmptyContainer>
          )}
        </Container>
      )}
    </>
  );
}
