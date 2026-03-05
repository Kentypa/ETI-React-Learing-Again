import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../../shared/context/AuthContext";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: ProfileInfo,
});

function ProfileInfo() {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-10 font-bold text-red-500">User not found</div>;
  }

  return (
    <section className="p-10 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Profile details</h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="font-semibold">Website:</span> {user.website}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Address</h3>
        <p>
          {user.address.street}, {user.address.suite}
        </p>
        <p>
          {user.address.city}, {user.address.zipcode}
        </p>
        <p>
          <span className="font-semibold">Geo:</span>
          {user.address.geo.lat}, {user.address.geo.lng}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Company</h3>
        <p>
          <span className="font-semibold">Name:</span> {user.company.name}
        </p>
        <p>
          <span className="italic">"{user.company.catchPhrase}"</span>
        </p>
        <p>
          <span className="font-semibold">Business:</span> {user.company.bs}
        </p>
      </div>
    </section>
  );
}
