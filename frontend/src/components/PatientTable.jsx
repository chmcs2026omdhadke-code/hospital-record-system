export default function PatientTable({
  patients = [],
  onEdit = () => {},
  onDelete = () => {}
}) {

const safePatients = Array.isArray(patients) ? patients : [];

return (
<div className="overflow-x-auto">

<table className="table table-zebra w-full">

<thead className="bg-base-200">
<tr>
<th>Name</th>
<th>Age</th>
<th>Disease</th>
<th>Doctor</th>
<th>Phone</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{safePatients.length === 0 ? (
<tr>
<td colSpan="7" className="text-center text-gray-500">
No patients found
</td>
</tr>
) : (

safePatients.map((p) => (

<tr key={p?._id || Math.random()}>

<td>{p?.name || "-"}</td>
<td>{p?.age || "-"}</td>
<td>{p?.disease || "-"}</td>
<td>{p?.doctorAssigned || "-"}</td>
<td>{p?.phone || "-"}</td>

<td>
<span
className={`badge ${
p?.status === "Admitted"
? "badge-success"
: "badge-error"
}`}
>
{p?.status || "Unknown"}
</span>
</td>

<td className="space-x-2">

<button
className="btn btn-sm btn-info"
onClick={() => onEdit(p)}
>
Edit
</button>

<button
className="btn btn-sm btn-error"
onClick={() => onDelete(p?._id)}
>
Delete
</button>

</td>

</tr>

))
)}

</tbody>

</table>

</div>
);
}

