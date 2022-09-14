import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../../services/api";
import AppModal from "../Modal";
import { showToast } from "../ShowToast";
import { Container } from "./styles";

interface IFormData {
  unityName: string;
  city: string;
  state: string;
}

interface IUnityModal {
  toggleModal: () => void;
  onSubmit: () => void;
  open: boolean;
  unity?: IUnity;
  isEdit?: boolean;
  company_id?: string;
  companies: ICompany[];
}

export function UnityModal({
  toggleModal,
  open,
  onSubmit,
  companies,
  isEdit,
  unity,
  company_id,
}: IUnityModal) {
  const [formData, setFormData] = useState<IFormData>({
    unityName: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(company_id ?? "");

  function clearInputs() {
    setFormData({
      unityName: "",
      city: "",
      state: "",
    });
  }

  useEffect(() => {
    if (isEdit) {
      setFormData({
        unityName: unity?.unityName ?? "",
        city: unity?.city ?? "",
        state: unity?.state ?? "",
      });
    }
  }, [isEdit]);

  async function createUnity() {
    setLoading(true);
    if (
      formData.unityName !== "" &&
      formData.city !== "" &&
      formData.state !== "" &&
      companyId !== ""
    ) {
      const body: IFormData = {
        unityName: formData.unityName,
        city: formData.city,
        state: formData.state,
      };

      try {
        await (isEdit
          ? api.patch(`/unities/${company_id}/${unity?._id}`, body)
          : api.post(`/unities/${companyId}`, body)
        ).then(() => {
          showToast({
            type: "success",
            message: `${isEdit ? "Edição de" : "Nova"} unidade`,
            description: `A ${isEdit ? "edição" : "criação"} da unidade ${
              formData.unityName
            } foi um sucesso`,
          });
        });
      } catch (error) {
        showToast({
          type: "error",
          message: `${isEdit ? "Edição de" : "Nova"} unidade`,
          description: `Não foi possivel realizar a ${
            isEdit ? "edição" : "criação"
          } da unidade ${formData.unityName}`,
        });
      } finally {
        clearInputs();
        toggleModal();
        onSubmit();
      }
    } else {
      showToast({
        type: "error",
        message: `${isEdit ? "Edição de" : "Nova"} unidade`,
        description: `Preencha os campos obrigatórios`,
      });
    }
    setLoading(false);
  }

  return (
    <AppModal
      title={isEdit ? "Editar unidade" : "Registrar nova unidade"}
      open={open}
      onOk={() => createUnity()}
      isConfirmLoading={loading}
      toggleModal={toggleModal}
    >
      <Container>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
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
          <Form.Item required label="Nome">
            <Input
              value={formData.unityName}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  unityName: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="Cidade">
            <Input
              value={formData.city}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  city: event.target?.value,
                }));
              }}
            />
          </Form.Item>
          <Form.Item required label="Estado">
            <Input
              value={formData.state}
              onChange={(event) => {
                setFormData((prevState) => ({
                  ...prevState,
                  state: event.target?.value,
                }));
              }}
            />
          </Form.Item>
        </Form>
      </Container>
    </AppModal>
  );
}
