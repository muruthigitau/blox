import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConfigProvider } from "@/contexts/ConfigContext";
import Loading from "@/components/core/account/Loading";
import DoctypeForm from "@/components/pages/form";
import { useDocumentData } from "@/hooks/useDocumentData";
import { handleSave } from "@/utils/handleSave";
import { useData } from "@/contexts/DataContext";
import {
  lifecycleHooks,
  customButtons,
  customComponents,
} from "@/custom/customConfig";

const DocumentDetail = () => {
  const router = useRouter();
  const { slug, id } = router.query;
  const [config, setConfig] = useState(null);
  const { data, form, setData, setForm, loading, setLoading } = useData();

  const { appData, setAppData } = useDocumentData(slug, id, setConfig);

  const saveData = async (f) => {
    await handleSave({
      data,
      form,
      appData,
      slug,
      id,
      setData,
      setForm,
      setLoading,
      config,
    });
  };

  if (!config) {
    return <Loading />;
  }

  return (
    <ConfigProvider initialConfig={config} initialAppData={appData}>
      <DoctypeForm
        handleSave={saveData}
        config={config}
        lifecycleHooks={lifecycleHooks}
        customButtons={customButtons}
        customComponents={customComponents}
      />
    </ConfigProvider>
  );
};

export default DocumentDetail;
