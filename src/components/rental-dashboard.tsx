"use client";

import { showToast } from "@/lib/toast";

import Link from "next/link";
import { Boxes, CalendarDays, CircleCheck, Plus, ShieldCheck, UserRound, Users, Wallet } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { equipmentCategories } from "@/lib/marketplace-data";
import { rentalApi, type Equipment } from "@/lib/rental-api";

type Booking = {
  _id: string; equipmentName: string; customerName: string; ownerName: string;
  start: string; end: string; createdAt: string; quantity: number; total: number;
  status: string; paymentStatus: string; paymentMethod?: string; phone?: string; address?: string; notes?: string;
};
type User = { _id: string; name: string; email: string; role?: string; createdAt: string; image?: string | null; phone?: string; address?: string };
type Role = "Customer" | "Owner" | "Admin";

const fields = ["name", "description", "location", "condition", "brand", "model", "terms"] as const;

export default function RentalDashboard({ role }: { role: Role }) {
  const [items, setItems] = useState<Equipment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User>();
  const [savingUser, setSavingUser] = useState(false);
  const [userError, setUserError] = useState("");
  const userDialog = useRef<HTMLDialogElement>(null);
  const [editing, setEditing] = useState<Equipment>();
  const [message, setMessage] = useState("Loading dashboard…");
  const [version, setVersion] = useState(0);
  const scope = role.toLowerCase();
  const equipmentPath = role === "Customer" ? "/favorites" : "/" + scope + "/equipment";

  useEffect(() => {
    let current = true;
    Promise.all([
      rentalApi<Equipment[]>(equipmentPath, {}, true),
      rentalApi<Booking[]>("/bookings", {}, true),
      role === "Admin" ? rentalApi<User[]>("/admin/users", {}, true) : Promise.resolve([]),
    ]).then(([equipment, rentals, accounts]) => {
      if (!current) return;
      setItems(equipment);
      setBookings(rentals);
      setUsers(accounts);
      setMessage((previous) => previous === "Loading dashboard…" ? "" : previous);
    }).catch((error) => { if (current) setMessage(error.message); });
    return () => { current = false; };
  }, [equipmentPath, role, version]);

  async function save(path: string, method: string, body?: object, success = "Changes saved.") {
    try {
      await rentalApi(path, { method, body: body ? JSON.stringify(body) : undefined }, true);
      setMessage(success);
      showToast(success);
      setVersion((previous) => previous + 1);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save.";
      setMessage(message);
      showToast(message, "error");
      return false;
    }
  }

  useEffect(() => {
    const dialog = userDialog.current;
    if (editingUser && dialog && !dialog.open) dialog.showModal();
  }, [editingUser]);

  function editUser(user: User) {
    setEditingUser(user);
    setUserError("");
  }

  async function saveUserProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingUser) return;
    const profile = Object.fromEntries(new FormData(event.currentTarget));
    setSavingUser(true);
    setUserError("");
    try {
      const updated = await rentalApi<User>("/admin/users/" + editingUser._id + "/profile", {
        method: "PATCH",
        body: JSON.stringify(profile),
      }, true);
      setUsers((previous) => previous.map((user) => user._id === updated._id ? updated : user));
      setMessage("User profile saved.");
      showToast("User profile saved.");
      userDialog.current?.close();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save the user profile.";
      setUserError(message);
      showToast(message, "error");
    } finally {
      setSavingUser(false);
    }
  }

  const completed = bookings.filter((row) => row.status === "Completed").length;
  const paid = bookings.filter((row) => row.paymentStatus === "Paid");
  const revenue = paid.reduce((total, row) => total + row.total, 0);
  const monthly = new Map<string, number>();
  for (const row of role === "Admin" ? bookings : paid) {
    const month = row.createdAt.slice(0, 7);
    monthly.set(month, (monthly.get(month) || 0) + (role === "Admin" ? 1 : row.total));
  }

  const hasOverview = role !== "Customer";
  const panel = hasOverview ? "rounded-2xl border border-white/10 bg-[#19231c] p-4 sm:p-6" : "";
  const metrics = [
    { label: "Equipment listed", value: items.length, icon: Boxes },
    { label: "Total rentals", value: bookings.length, icon: CalendarDays },
    { label: "Completed rentals", value: completed, icon: CircleCheck },
    { label: role === "Admin" ? "Recorded revenue" : "Recorded earnings", value: "৳" + revenue.toLocaleString("en-BD"), icon: Wallet },
  ];
  if (role === "Admin") {
    metrics.unshift({ label: "Users", value: users.length, icon: Users });
    metrics.splice(2, 0, {
      label: "Pending approvals",
      value: items.filter((item) => item.status === "Pending").length,
      icon: ShieldCheck,
    });
  }
  const monthlyMaximum = Math.max(1, ...monthly.values());

  return <div className={hasOverview ? "rental-form mx-auto w-full max-w-[1480px] space-y-6 p-4 sm:p-6 lg:px-8" : "rental-form w-full space-y-8 p-5 lg:p-8"}>
    {role !== "Customer" ? (
      <header className="flex flex-wrap items-end justify-between gap-5 rounded-2xl border border-[#c8e889]/15 bg-[#213126] p-5 sm:p-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{role} dashboard</h1>
          <p className="mt-2 max-w-md text-sm text-[#bac8b9]">
            {role === "Admin" ? "Review equipment, manage accounts, and track rentals and payments." : "Manage your machines, track bookings, and see what you’ve earned."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/profile" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm font-medium !no-underline hover:bg-white/5">
            <UserRound size={16} aria-hidden="true" /> Edit profile
          </Link>
          <a href={role === "Admin" ? "#listings" : "#equipment-form"} className="inline-flex items-center gap-2 rounded-lg bg-[#c8e889] px-3 py-2 text-sm font-semibold text-[#19211c] !no-underline hover:bg-[#d7eeac]">
            {role === "Admin" ? <ShieldCheck size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
            {role === "Admin" ? "Review equipment" : "Add equipment"}
          </a>
        </div>
      </header>
    ) : <h1 className="text-3xl font-bold">Customer dashboard</h1>}
    <nav aria-label="Dashboard sections" className={hasOverview ? "flex flex-wrap gap-x-5 gap-y-2 border-b border-white/10 px-1 pb-3 text-sm text-[#d1dfce]" : "flex flex-wrap gap-4"}>
      <a href="#rentals">Rentals</a><a href="#listings">{role === "Admin" ? "All equipment" : role === "Customer" ? "Favorites" : "Equipment"}</a>
      {role === "Owner" && <a href="#equipment-form">Add equipment</a>}
      {role === "Admin" && <a href="#users">Users</a>}
      <Link href="/profile">Profile</Link>
    </nav>
    {message && message !== "User profile saved." && <p role="status">{message}</p>}
    {role !== "Customer" && <section className="space-y-3">
      <h2 className="text-xl font-bold">Overview</h2>
      <dl className={"grid grid-cols-2 gap-3 " + (role === "Admin" ? "lg:grid-cols-3 2xl:grid-cols-6" : "xl:grid-cols-4")}>
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="min-w-0 rounded-xl border border-white/10 bg-[#1c271f] p-4 sm:p-5">
            <Icon aria-hidden="true" size={20} className="mb-3 text-[#c8e889]" />
            <dt className="text-xs text-[#b4c0b4] sm:text-sm">{label}</dt>
            <dd className="mt-1 break-words text-xl font-semibold tabular-nums sm:text-2xl">{value}</dd>
          </div>
        ))}
      </dl>
      {monthly.size > 0 && <div className={panel + " space-y-2"}>
        <h3>{role === "Admin" ? "Monthly bookings" : "Monthly earnings by booking date"}</h3>
        {[...monthly].sort().map(([month, value]) => <div key={month} className="flex items-center gap-3">
          <span className="w-17 shrink-0 text-sm text-[#bac8b9]">{month}</span>
          <meter aria-label={month} className="h-4 flex-1 accent-[#c8e889]" value={value} max={monthlyMaximum} />
          <span className="min-w-8 text-right text-sm tabular-nums">{value.toLocaleString("en-BD")}</span>
        </div>)}
      </div>}
    </section>}
    <section id="rentals" className={panel + " scroll-mt-5 space-y-3"}>
      <h2 className="text-xl font-bold">{role === "Admin" ? "All rentals" : role === "Customer" ? "My rentals" : "Equipment rentals"}</h2>
      {bookings.length ? <div className="overflow-x-auto"><table className={hasOverview ? "min-w-[640px] text-sm" : ""}>
        <thead><tr><th>Equipment</th>{role !== "Customer" && <th>Customer</th>}{role === "Admin" && <th>Owner</th>}<th>Dates</th><th>Booked</th><th>Qty</th><th>Total</th><th>Payment</th><th>Status</th>{role === "Admin" && <th>Actions</th>}</tr></thead>
        <tbody>{bookings.map((row) => <tr key={row._id}>
          <td>{row.equipmentName}</td>{role !== "Customer" && <td className="min-w-40"><p className="font-medium">{row.customerName}</p>{row.phone && <p className="text-xs text-[#bac8b9]">{row.phone}</p>}{row.address && <p className="text-xs text-[#bac8b9]">{row.address}</p>}{row.notes && <p className="mt-1 text-xs text-[#bac8b9]">Notes: {row.notes}</p>}</td>}{role === "Admin" && <td>{row.ownerName}</td>}
          <td>{row.start.slice(0, 10)} – {row.end.slice(0, 10)}</td><td>{row.createdAt.slice(0, 10)}</td><td>{row.quantity}</td><td>৳{row.total}</td><td><p>{row.paymentStatus}</p>{row.paymentMethod && <p className="text-xs text-[#bac8b9]">{row.paymentMethod}</p>}</td><td>{row.status}</td>
          {role === "Admin" && <td><div className="flex flex-wrap gap-2">
            <button onClick={() => save("/admin/bookings/" + row._id, "PATCH", { paymentStatus: row.paymentStatus === "Paid" ? "Unpaid" : "Paid" }, "Payment status updated.")}>{row.paymentStatus === "Paid" ? "Mark unpaid" : "Mark paid"}</button>
            {row.status === "Confirmed" && <><button onClick={() => save("/admin/bookings/" + row._id, "PATCH", { status: "Completed" }, "Rental completed.")}>Complete</button><button onClick={() => save("/admin/bookings/" + row._id, "PATCH", { status: "Cancelled" }, "Rental cancelled.")}>Cancel</button></>}
          </div></td>}
        </tr>)}</tbody>
      </table></div> : <p className={hasOverview ? "rounded-xl border border-dashed border-white/15 p-5 text-sm text-[#b4c0b4]" : ""}>No rentals yet.</p>}
    </section>
    <section id="listings" className={panel + " scroll-mt-5 space-y-3"}>
      <h2 className="text-xl font-bold">{role === "Customer" ? "Favorites" : "Equipment"}</h2>
      {items.length ? <div className="overflow-x-auto"><table className={hasOverview ? "min-w-[550px] text-sm" : ""}>
        <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Quantity</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{items.map((row) => <tr key={row._id}>
          <td>{row.name}</td><td>{row.category}</td><td>৳{row.price}</td><td>{row.quantity}</td><td><span className={hasOverview ? "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs" : ""}>{row.status}</span></td>
          <td><div className="flex flex-wrap items-center gap-2">
            <Link href={"/browse_equipment/" + row._id}>Details</Link>
            {role !== "Customer" && <a href="#equipment-form" onClick={() => setEditing(row)}>Edit</a>}
            <button onClick={() => {
              if (role === "Customer" || window.confirm("Delete this listing?")) void save(equipmentPath + "/" + row._id, "DELETE", undefined, role === "Customer" ? "Removed from favorites." : "Equipment deleted.");
            }}>{role === "Customer" ? "Remove" : "Delete"}</button>
            {role === "Admin" && ["Approved", "Rejected"].filter((status) => row.status !== status).map((status) =>
              <button key={status} onClick={() => save(equipmentPath + "/" + row._id, "PATCH", { status }, status === "Approved" ? "Equipment approved." : "Equipment rejected.")}>{status === "Approved" ? "Approve" : "Reject"}</button>
            )}
          </div></td>
        </tr>)}</tbody>
      </table></div> : <div className={hasOverview ? "space-y-2 rounded-xl border border-dashed border-white/15 p-5 text-sm text-[#b4c0b4]" : ""}>
        <p>No equipment yet.</p>
        {role === "Owner" && <a href="#equipment-form" className="inline-block text-[#c8e889]">Add your first machine</a>}
      </div>}
    </section>
    {(role === "Owner" || editing) && <section id="equipment-form" className={panel + " scroll-mt-5 space-y-4"}>
      <h2 className="text-xl font-bold">{editing ? "Edit equipment" : "Add equipment"}</h2>
      <form key={editing?._id || "new"} className="grid gap-4 text-sm sm:grid-cols-2" onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const photo = data.get("upload");
        data.delete("upload");
        try {
          if (photo instanceof File && photo.size) {
            const upload = new FormData();
            upload.set("image", photo);
            const response = await fetch("/api/equipment-image", { method: "POST", body: upload });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);
            data.set("image", result.url);
          }
          if (await save(equipmentPath + (editing ? "/" + editing._id : ""), editing ? "PATCH" : "POST", Object.fromEntries(data), editing ? "Equipment updated." : "Equipment submitted for approval.")) {
            form.reset();
            setEditing(undefined);
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Image upload failed.";
          setMessage(message);
          showToast(message, "error");
        }
      }}>
        {fields.map((name) => <label key={name} className="capitalize">{name}<input name={name} defaultValue={editing?.[name]} required /></label>)}
        <label>Category<select name="category" defaultValue={editing?.category}>{equipmentCategories.map(({ name }) => <option key={name}>{name}</option>)}</select></label>
        <label>Rental type<select name="rentalType" defaultValue={editing?.rentalType}><option>Daily</option><option>Weekly</option><option>Monthly</option></select></label>
        <label>Rental price<input type="number" name="price" min="0.01" step="0.01" defaultValue={editing?.price} required /></label>
        <label>Available quantity<input type="number" name="quantity" min="0" step="1" defaultValue={editing?.quantity} required /></label>
        <label>Direct image URL<input type="url" name="image" defaultValue={editing?.image} /></label>
        <label>Or upload a photo<input type="file" name="upload" accept="image/*" /></label>
        <div className="flex gap-3"><button>Save listing</button>{editing && <button type="button" onClick={() => setEditing(undefined)}>Cancel edit</button>}</div>
      </form>
    </section>}
    {role === "Admin" && <section id="users" className={panel + " scroll-mt-5 space-y-3"}>
      <h2 className="text-xl font-bold">All users</h2>
      {message === "User profile saved." && <p role="status" className="text-sm text-[#c8e889]">{message}</p>}
      <div className="overflow-x-auto"><table className="min-w-[520px] text-sm [&_tbody_tr:hover]:bg-white/5 [&_thead]:text-[#bac8b9]"><thead><tr><th>Name</th><th>Email</th><th>Registered</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>{users.map((user) => <tr key={user._id}><td>{user.name}</td><td>{user.email}</td><td>{user.createdAt?.slice(0, 10)}</td>
          <td><select aria-label={"Role for " + user.name} value={user.role || "Customer"} onChange={(event) => save("/admin/users/" + user._id, "PATCH", { role: event.target.value }, "User role updated.")}>
            <option>Customer</option><option>Owner</option><option>Admin</option>
          </select></td>
          <td><button type="button" onClick={() => editUser(user)}>Edit user</button></td></tr>)}</tbody>
      </table></div>
      <dialog ref={userDialog} onClose={() => setEditingUser(undefined)} onCancel={(event) => { if (savingUser) event.preventDefault(); }} aria-labelledby="edit-user-title" className="m-auto max-h-[90vh] w-[min(94vw,32rem)] overflow-y-auto rounded-2xl border border-white/15 bg-[#19231c] p-5 text-[#edf2e6] backdrop:bg-black/70 sm:p-6">
        {editingUser && (
          <form key={editingUser._id} onSubmit={saveUserProfile} className="space-y-4">
            <div>
              <h3 id="edit-user-title" className="text-xl font-semibold">Edit user</h3>
              <p className="mt-1 break-all text-sm text-[#bac8b9]">{editingUser.email}</p>
            </div>
            <fieldset disabled={savingUser} className="grid gap-3 text-sm">
              <label>Full name<input name="name" defaultValue={editingUser.name} required maxLength={100} /></label>
              <label>Phone number<input name="phone" type="tel" defaultValue={editingUser.phone || ""} maxLength={40} /></label>
              <label>Address<textarea name="address" rows={2} defaultValue={editingUser.address || ""} maxLength={400} /></label>
              <label>Profile photo URL<input name="image" type="url" defaultValue={editingUser.image || ""} maxLength={2048} /></label>
            </fieldset>
            {userError && <p role="alert" className="text-sm text-red-300">{userError}</p>}
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={savingUser}>{savingUser ? "Saving…" : "Save changes"}</button>
              <button type="button" disabled={savingUser} className="border border-white/15 !bg-transparent !text-[#c8e889]" onClick={() => userDialog.current?.close()}>Cancel</button>
            </div>
          </form>
        )}
      </dialog>
    </section>}
  </div>;
}
