import { useEffect, useState } from "react";

export default function PatientForm({ onSubmit = () => {}, initial }) {

const emptyForm = {
name: "",
age: "",
gender: "",
phone: "",
disease: "",
doctorAssigned: "",
admissionDate: "",
status: "Admitted"
};

const [form, setForm] = useState(emptyForm);

useEffect(() => {

if (initial) {
setForm({
name: initial.name || "",
age: initial.age || "",
gender: initial.gender || "",
phone: initial.phone || "",
disease: initial.disease || "",
doctorAssigned: initial.doctorAssigned || "",
admissionDate: initial.admissionDate
? new Date(initial.admissionDate).toISOString().substring(0,10)
: "",
status: initial.status || "Admitted"
});
} 
else {
setForm(emptyForm);
}

}, [initial]);

const handleChange = (e) => {
const { name, value } = e.target;

setForm((prev) => ({
...prev,
[name]: value
}));
};

const handleSubmit = (e) => {
e.preventDefault();

const cleanPhone = form.phone.replace(/\D/g, "");

const payload = {
...form,
name: form.name.trim(),
disease: form.disease.trim(),
doctorAssigned: form.doctorAssigned.trim(),
phone: cleanPhone,
age: Number(form.age)
};

onSubmit(payload);

setForm(emptyForm);
};

return (

<form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>

<input
name="name"
placeholder="Patient Name"
value={form.name}
onChange={handleChange}
className="input input-bordered"
required
/>

<input
type="number"
name="age"
placeholder="Age"
value={form.age}
onChange={handleChange}
className="input input-bordered"
required
/>

<select
name="gender"
value={form.gender}
onChange={handleChange}
className="select select-bordered"
required
>
<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select>

<input
name="phone"
placeholder="Phone Number"
value={form.phone}
onChange={handleChange}
className="input input-bordered"
required
/>

<input
name="disease"
placeholder="Disease"
value={form.disease}
onChange={handleChange}
className="input input-bordered"
required
/>

<input
name="doctorAssigned"
placeholder="Doctor Assigned"
value={form.doctorAssigned}
onChange={handleChange}
className="input input-bordered"
required
/>

<input
type="date"
name="admissionDate"
value={form.admissionDate}
onChange={handleChange}
className="input input-bordered"
required
/>

<select
name="status"
value={form.status}
onChange={handleChange}
className="select select-bordered"
>
<option value="Admitted">Admitted</option>
<option value="Discharged">Discharged</option>
</select>

<button className="btn btn-primary col-span-2">
Save Patient
</button>

</form>

);
}