import Card from "components/shared/Card";
import { useAuth } from "services/User";

const Filters = () => {
  const { user } = useAuth();

  return (
    <Card>
      <p>Job posts created by me</p>
      <p>{user?.company?.name}'s job openings</p>
    </Card>
  );
};

export default Filters;
