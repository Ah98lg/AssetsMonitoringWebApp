import { Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import api from "../../services/api";
import AppModal from "../Modal";
import { showToast } from "../ShowToast";
import { Container } from "./styles";

interface IFormData {
  assetName: string;
  description: string;
  model: string;
  assetOwner: string;
  status?: "Running" | "Alerting" | "Stopped";
  healthLevel?: number;
}

interface IAssetModal {
  toggleModal: () => void;
  onSubmit: () => void;
  open: boolean;
  companies: ICompany[];
}

export function AssetModal({
  toggleModal,
  open,
  onSubmit,
  companies,
}: IAssetModal) {
  const [formData, setFormData] = useState<IFormData>({
    assetName: "",
    assetOwner: "",
    description: "",
    model: "",
  });
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [unityId, setUnityId] = useState("");
  const [unities, setUnities] = useState<IUnity[]>([]);

  function clearInputs() {
    setFormData({
      assetName: "",
      assetOwner: "",
      description: "",
      model: "",
    });
  }

  async function createUnity() {
    setLoading(true);
    if (
      formData.assetName !== "" &&
      formData.assetOwner !== "" &&
      formData.description !== "" &&
      companyId !== "" &&
      unityId !== ""
    ) {
      const body: IFormData = {
        assetName: formData.assetName,
        assetOwner: formData.assetOwner,
        description: formData.description,
        model: formData.model,
      };

      try {
        await api.post(`/assets/${companyId}/${unityId}`, body).then(() => {
          showToast({
            type: "success",
            message: "Cadastro de máquina",
            description: `O cadastro da máquina ${formData.assetName} foi um sucesso`,
          });
        });
      } catch (error) {
        showToast({
          type: "error",
          message: "Cadastro de máquina",
          description: `Não foi possivel realizar o cadastro da máquina ${formData.assetName}`,
        });
      } finally {
        clearInputs();
        toggleModal();
        onSubmit();
      }
    } else {
      showToast({
        type: "error",
        message: "Cadastro de máquina",
        description: `Preencha os campos obrigatórios`,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (companyId !== "") {
      const selectedCompany = companies.find(
        (company) => company._id === companyId
      );
      if (selectedCompany) setUnities(selectedCompany?.unities);
    }
  });

  return (
    <AppModal
      title={"Registrar nova máquina"}
      open={open}
      onOk={() => createUnity()}
      isConfirmLoading={loading}
      toggleModal={toggleModal}
    >
      <Container>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item required label="Companhia">
            <Select onSelect={(event: any) => setCompanyId(event)}>
              {companies.map((company) => {
                return (
                  <Select.Option value={company._id}>
                    {company.companyName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item required label="Unidade">
            <Select
              onSelect={(event: any) => setUnityId(event)}
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
          </Form.Item>
          <Form.Item required label="Nome">
            <Input
              value={formData.assetName}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  assetName: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="Dono da máquina">
            <Input
              value={formData.assetOwner}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  assetOwner: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="Modelo">
            <Input
              value={formData.model}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  model: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="Descrição">
            <TextArea
              value={formData.description}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  description: event.target?.value,
                }));
              }}
            />
          </Form.Item>
        </Form>
      </Container>
    </AppModal>
  );
}
