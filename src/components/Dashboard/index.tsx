import { GridComponent } from "../GridComponent";
import { Container, Content } from "./styles";
import { GiFactory } from "react-icons/gi";
import { BsFillGearFill, BsFillPersonFill } from "react-icons/bs";
import { MdStore } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "../../services/api";

interface ICompany {
  companyName: string;
  companyOwner: string;
  area: string;
  country: string;
  cnpj: string;
  unities: [string];
  users: [string];
}

export function Dashboard() {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  async function getCompanies() {
    try {
      await api.get("/companies").then((response) => {
        setCompanies(response.data);
      });
    } catch (error) {}
  }

  useEffect(() => {
    getCompanies();
  }, []);
  return (
    <Container>
      <Content>
        <GridComponent
          header={"Total de companhias"}
          value={companies.length}
          icon={<GiFactory color="#1890ff" size="4.5rem" />}
          footer={"+ Registrar uma nova companhia"}
        />
        <GridComponent
          header={"Total de unidades"}
          value={2}
          icon={<MdStore color="#1890ff" size="5rem" />}
          footer={"+ Registrar uma nova unidade"}
        />
        <GridComponent
          header={"Total de máquinas"}
          value={10}
          icon={<BsFillGearFill color="#1890ff" size="4rem" />}
          footer={"+ Cadastrar uma nova máquina"}
        />
        <GridComponent
          header={"Total de usuários"}
          value={2}
          icon={<BsFillPersonFill color="#1890ff" size="4.5rem" />}
          footer={"+ Cadastrar um novo usuário"}
        />
      </Content>
    </Container>
  );
}
