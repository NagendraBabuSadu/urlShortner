import * as React from "react";
import FormContainer from "../FormContainer/FormContainer";
import DataTable from "../DataTable/DataTable";
import { UrlData } from "../../interface/UrlData";
import axios from "axios";
import { serverUrl } from "../../helpers/Constatnts";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);

  const reloadTheUI = (): void => {
    setReload(true);
  };

  const fetchTableData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl`);
    setData(response.data);
    setReload(false);
  };

  React.useEffect(() => {
    fetchTableData();
  }, [reload]);

  return (
    <div className="">
      <FormContainer reloadTheUI={reloadTheUI} />
      <DataTable data={data} reloadTheUI={reloadTheUI} />
    </div>
  );
};

export default Container;
