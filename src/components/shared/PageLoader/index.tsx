import Loader from "components/shared/Loader";
import usePageLoader from "components/shared/PageLoader/usePageLoader";

const PageLoader = () => {
  const loading = usePageLoader();

  return <Loader isLoading={loading} size="sm" />;
};

export default PageLoader;
