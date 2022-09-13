import { Container, Content, Informations, ListOfInformations } from "./styles";
import { GiFactory } from "react-icons/gi";
import { BsFillGearFill, BsFillPersonFill } from "react-icons/bs";
import { MdStore } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { GridComponent } from "../../components/GridComponent";
import { showToast } from "../../components/ShowToast";
import AppModal from "../../components/Modal";
import { Select } from "antd";
import { Options } from "./mocks";
import { UnityItem } from "./components/UnityItem";

export function Dashboard() {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [unities, setUnities] = useState<IUnity[]>([]);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const [listView, setListView] = useState<string>("unidades");

  const [openModal, setOpenModal] = useState(false);

  const { Option } = Select;

  function toggleModal() {
    setOpenModal(!openModal);
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
  }, []);

  return (
    <>
      <AppModal
        title={""}
        children={undefined}
        open={openModal}
        onOk={function (): void {
          throw new Error("Function not implemented.");
        }}
        isConfirmLoading={false}
        toggleModal={toggleModal}
      ></AppModal>
      <Container>
        <Content>
          <GridComponent
            header={"Total de companhias"}
            value={companies.length}
            icon={<GiFactory color="#1890ff" size="2.5rem" />}
            footer={"+ Registrar uma nova companhia"}
            onClick={toggleModal}
          />
          <GridComponent
            header={"Total de unidades"}
            value={unities.length}
            icon={<MdStore color="#1890ff" size="5rem" />}
            footer={"+ Registrar uma nova unidade"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <GridComponent
            header={"Total de máquinas"}
            value={assets.length}
            icon={<BsFillGearFill color="#1890ff" size="2.5rem" />}
            footer={"+ Cadastrar uma nova máquina"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <GridComponent
            header={"Total de usuários"}
            value={users.length}
            icon={<BsFillPersonFill color="#1890ff" size="4.5rem" />}
            footer={"+ Cadastrar um novo usuário"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Content>
        <ListOfInformations>
          <Select
            showSearch
            style={{ width: 250 }}
            defaultValue={{ value: "unidades", label: Options[0] }}
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
              unities.map((unity) => {
                return (
                  <>
                    <UnityItem
                      name={unity.unityName}
                      city={unity.city}
                      state={unity.state}
                      assetsNumber={unity.assets.length}
                    />
                  </>
                );
              })
            ) : (
              <></>
            )}
          </Informations>
        </ListOfInformations>
      </Container>
    </>
  );
}
