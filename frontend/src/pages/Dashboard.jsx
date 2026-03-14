
import { useEffect, useState } from "react";
import API from "../services/api";
import PatientForm from "../components/PatientForm";
import PatientTable from "../components/PatientTable";
import toast from "react-hot-toast";

export default function Dashboard() {

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null);

  // Fetch patients
  const fetchPatients = async () => {
    try {
      const res = await API.get("/");
      setPatients(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load patients");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add or update patient
  const addPatient = async (data) => {
    try {

      const payload = {
        ...data,
        age: Number(data.age)
      };

       console.log("Sending data:", payload);


      if (editing && editing._id) {
        await API.put(`/${editing._id}`, payload);
        toast.success("Patient Updated");
        setEditing(null);
      } else {
        await API.post("/", payload);
        toast.success("Patient Added");
      }

      fetchPatients();

    } catch (error) {
      console.error("Save patient error:", error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Error saving patient");
    }
  };

  // Delete patient
  const deletePatient = async (id) => {
    try {
      await API.delete(`/${id}`);
      toast.success("Patient Deleted");
      fetchPatients();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting patient");
    }
  };

  // Search + filter
  const filtered = patients
    .filter((p) =>
      (p?.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      filter ? p?.status === filter : true
    );

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Hospital Record System
      </h1>

      {/* Patient count */}
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Patients</div>
          <div className="stat-value">{patients.length}</div>
        </div>
      </div>

      {/* Search */}
      <input
        placeholder="Search Patient"
        className="input input-bordered"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter */}
      <select
        className="select select-bordered"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="Admitted">Admitted</option>
        <option value="Discharged">Discharged</option>
      </select>

      {/* Patient form */}
      <PatientForm
        onSubmit={addPatient}
        initial={editing}
      />

      {/* Patient table */}
      <PatientTable
        patients={filtered}
        onEdit={setEditing}
        onDelete={deletePatient}
      />

    </div>
  );
}

