import { User, columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<{ data: User[]; result: number }> => {
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const { data, result } = await response.json();

    return {
      data: data.map((user: User) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      })),
      result,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], result: 0 };
  }
};

const UserPage = async () => {
  const { data, result } = await getData();

  return (
    <div>
      <h1 className="text-lg font-semibold">All Users ({result})</h1>
      <div className="container mx-auto py-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserPage;
