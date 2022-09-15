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
  isEdit?: boolean;
  asset?: IAsset;
  company_id?: string;
  unity_id?: string;
}

export function AssetModal({
  toggleModal,
  open,
  onSubmit,
  companies,
  isEdit,
  asset,
  company_id,
  unity_id,
}: IAssetModal) {
  const [formData, setFormData] = useState<IFormData>({
    assetName: "",
    assetOwner: "",
    description: "",
    model: "",
    status: "Running",
    healthLevel: 0,
  });
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(company_id ?? "");
  const [unityId, setUnityId] = useState(unity_id ?? "");
  const [unities, setUnities] = useState<IUnity[]>([]);

  useEffect(() => {
    if (isEdit) {
      setFormData({
        assetName: asset?.assetName ?? "",
        assetOwner: asset?.assetOwner ?? "",
        description: asset?.description ?? "",
        model: asset?.model ?? "",
        status: asset?.status ?? "Running",
        healthLevel: asset?.healthLevel ?? 0,
      });
    }
  }, [isEdit]);

  function clearInputs() {
    setFormData({
      assetName: "",
      assetOwner: "",
      description: "",
      model: "",
    });
  }

  async function createAsset() {
    setLoading(true);
    if (
      formData.assetName !== "" &&
      formData.assetOwner !== "" &&
      formData.description !== "" &&
      companyId !== "" &&
      unityId !== ""
    ) {
      const body: IFormData = !isEdit
        ? {
            assetName: formData.assetName,
            assetOwner: formData.assetOwner,
            description: formData.description,
            model: formData.model,
          }
        : {
            assetName: formData.assetName,
            assetOwner: formData.assetOwner,
            description: formData.description,
            model: formData.model,
            healthLevel: formData.healthLevel,
            status: formData.status,
          };

      try {
        await (isEdit
          ? api.patch(`/assets/${company_id}/${unity_id}/${asset?._id}`, body)
          : api.post(`/assets/${companyId}/${unityId}`, body)
        ).then(() => {
          showToast({
            type: "success",
            message: `${isEdit ? "Edição" : "Cadastro"} de máquina"`,
            description: `${isEdit ? "A edição" : "O cadastro"} da máquina ${
              formData.assetName
            } foi um sucesso`,
          });
        });
      } catch (error) {
        showToast({
          type: "error",
          message: `${isEdit ? "Edição" : "Cadastro"} de máquina`,
          description: `Não foi possivel realizar ${
            isEdit ? "a edição" : "o cadastro"
          } da máquina ${formData.assetName}`,
        });
      } finally {
        clearInputs();
        toggleModal();
        onSubmit();
      }
    } else {
      showToast({
        type: "error",
        message: `${isEdit ? "Edição" : "Cadastro"} de máquina`,
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
      title={`${isEdit ? "Editar máquina" : "Cadastrar nova máquina"}`}
      open={open}
      onOk={() => createAsset()}
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
            <Select
              onSelect={(event: any) => setCompanyId(event)}
              value={company_id}
            >
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
              disabled={companyId === "" && !company_id}
              value={unity_id}
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
          {isEdit && (
            <>
              <Form.Item required label="Status">
                <Select
                  value={formData.status}
                  onSelect={(event: any) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      status: event,
                    }));
                  }}
                >
                  <Select.Option value={"Running"}>Running</Select.Option>
                  <Select.Option value={"Alerting"}>Alerting</Select.Option>
                  <Select.Option value={"Stopped"}>Stopped</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item required label="Nível de saúde">
                <Input
                  type="number"
                  max={100}
                  min={0}
                  value={formData.healthLevel}
                  onChange={(event) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      healthLevel:
                        Number(event.target.value) > 100
                          ? 100
                          : Number(event.target?.value) < 0
                          ? 0
                          : Number(event.target.value),
                    }));
                  }}
                />
              </Form.Item>
            </>
          )}
        </Form>
      </Container>
    </AppModal>
  );
}
