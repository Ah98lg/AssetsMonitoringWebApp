interface ICompany {
  _id: string;
  companyName: string;
  companyOwner: string;
  area: string;
  country: string;
  cnpj: string;
  unities: IUnity[];
  users: IUser[];
}

interface IUnity {
  _id: string;
  unityName: string;
  city: string;
  state: string;
  assets: IAsset[];
}

interface IUser {
  _id: string;
  userName: string;
  age: number;
  role: string;
}

interface IAsset {
  _id: string;
  assetName: string;
  description: string;
  model: string;
  assetOwner: string;
  status: "Running" | "Alerting" | "Stopped";
  healthLevel: number;
}
