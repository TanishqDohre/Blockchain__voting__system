import React from "react";
export default function AdminSidebar({ section, onChange }) { return <aside className="admin-sidebar">{["overview", "create", "candidates", "voters"].map(x => <button key={x} className={section === x ? "selected" : ""} onClick={() => onChange(x)}>{({ overview: "Overview", create: "Create election", candidates: "Candidates", voters: "Voters" })[x]}</button>)}</aside>; }
