import { Container, Content, Informations, ListOfInformations } from "./styles";
import { GiFactory } from "react-icons/gi";
import { BsFillGearFill, BsFillPersonFill } from "react-icons/bs";
import { MdStore } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { GridComponent } from "../../components/GridComponent";
import { showToast } from "../../components/ShowToast";
import { Empty, Select } from "antd";
import { Options } from "./mocks";
import { UnityItem } from "./components/UnityItem";
import { UserItem } from "./components/UserItem";
import { CompanyItem } from "./components/CompanyItem";
import { CompanyModal } from "../../components/CompanyModal";
import { UnityModal } from "../../components/UnityModal";
import { UserModal } from "../../components/UserModal";
import { AssetModal } from "../../components/AssetModal";

export function Dashboard() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [unities, setUnities] = useState<IUnity[]>([]);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [assetQuantity, setAssetQuantity] = useState(0);
  const [users, setUsers] = useState<IUser[]>([]);

  const [listView, setListView] = useState<string>("companhias");

  const [companyModal, setCompanyModal] = useState(false);
  const [unityModal, setUnityModal] = useState(false);
  const [assetsModal, setAssetsModal] = useState(false);
  const [usersModal, setUsersModal] = useState(false);

  const [trigger, setTrigger] = useState(false);

  const { Option } = Select;

  function toggleModal(type: string) {
    if (type === "companhia") setCompanyModal(!companyModal);
    else if (type === "unidade") setUnityModal(!unityModal);
    else if (type === "máquinas") setAssetsModal(!assetsModal);
    else if (type === "usuários") setUsersModal(!usersModal);
  }

  function triggerEffect() {
    setTrigger(!trigger);
  }

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
  async function getUnities() {
    try {
      await api.get("/unities").then((response) => {
        setUnities(response.data);
      });
    } catch (error) {
      showToast({
        type: "error",
        message: `Couldn't get the data`,
        description: `The API was not able to retrieve the data from the database, please refresh the page`,
      });
    }
  }
  async function getAssets() {
    try {
      await api.get("/assets").then((response) => {
        const data = response.data.map((array: any) => {
          return array.length;
        });
        var total = data.reduce(
          (total: number, numero: number) => total + numero,
          0
        );
        setAssetQuantity(total);
        setAssets(response.data);
      });
    } catch (error) {
      showToast({
        type: "error",
        message: `Couldn't get the data`,
        description: `The API was not able to retrieve the data from the database, please refresh the page`,
      });
    }
  }
  async function getUsers() {
    try {
      await api.get("/users").then((response) => {
        setUsers(response.data);
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
    Promise.all([getCompanies(), getAssets(), getUsers(), getUnities()]);
  }, [trigger]);

  return (
    <>
      <CompanyModal
        toggleModal={() => toggleModal("companhia")}
        open={companyModal}
        onSubmit={triggerEffect}
      />
      <UnityModal
        toggleModal={() => toggleModal("unidade")}
        onSubmit={triggerEffect}
        open={unityModal}
        companies={companies}
      />
      <UserModal
        toggleModal={() => toggleModal("usuários")}
        onSubmit={triggerEffect}
        open={usersModal}
        companies={companies}
      />
      <AssetModal
        toggleModal={() => toggleModal("máquinas")}
        onSubmit={triggerEffect}
        open={assetsModal}
        companies={companies}
      />
      <Container>
        <Content>
          <GridComponent
            header={"Total de companhias"}
            value={companies.length ?? 0}
            icon={<GiFactory color="#1890ff" size="2.5rem" />}
            footer={"+ Registrar uma nova companhia"}
            onClick={() => toggleModal("companhia")}
          />
          <GridComponent
            header={"Total de unidades"}
            value={unities?.length ?? 0}
            icon={<MdStore color="#1890ff" size="5rem" />}
            footer={"+ Registrar uma nova unidade"}
            onClick={() => toggleModal("unidade")}
          />
          <GridComponent
            header={"Total de máquinas"}
            value={assetQuantity ?? 0}
            icon={<BsFillGearFill color="#1890ff" size="2.5rem" />}
            footer={"+ Cadastrar uma nova máquina"}
            onClick={() => toggleModal("máquinas")}
          />
          <GridComponent
            header={"Total de usuários"}
            value={users?.length ?? 0}
            icon={<BsFillPersonFill color="#1890ff" size="4.5rem" />}
            footer={"+ Cadastrar um novo usuário"}
            onClick={() => toggleModal("usuários")}
          />
        </Content>
        <ListOfInformations>
          <Select
            showSearch
            style={{ width: 250 }}
            defaultValue={{ value: "companhias", label: "Companhias" }}
            onSelect={(event: any) => setListView(event)}
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
            {Options.map((option) => {
              return (
                <Option value={`${option.toLowerCase()}`}>{option}</Option>
              );
            })}
          </Select>
          <Informations>
            {listView === "unidades" ? (
              unities.length !== 0 ? (
                companies.map((company) => {
                  return company.unities.map((unity) => {
                    return (
                      <>
                        <UnityItem
                          company_id={company._id}
                          unity={unity}
                          companies={companies}
                          handleRender={getCompanies}
                        />
                      </>
                    );
                  });
                })
              ) : (
                <Empty />
              )
            ) : listView === "usuários" ? (
              users.length !== 0 ? (
                companies.map((company) => {
                  return company.users.map((user) => {
                    return (
                      <>
                        <UserItem
                          company_id={company._id}
                          user={user}
                          handleRender={() => getCompanies()}
                          workAt={company.companyName}
                          companies={companies}
                        />
                      </>
                    );
                  });
                })
              ) : (
                <Empty />
              )
            ) : listView === "companhias" ? (
              companies.length !== 0 ? (
                companies.map((company) => {
                  return (
                    <>
                      <CompanyItem
                        handleRender={() => getCompanies()}
                        company={company}
                      />
                    </>
                  );
                })
              ) : (
                <Empty />
              )
            ) : (
              <></>
            )}
          </Informations>
        </ListOfInformations>
      </Container>
    </>
  );
}
