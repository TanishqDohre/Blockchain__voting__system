import React, { useState } from "react";
import useWeb3 from "../../hooks/useWeb3";
import { createElection } from "../../services/contractService";
import { friendlyError } from "../../utils/errorHandler";
export default function CreateElection({ onCreated }) {
 const { contract, account, isAdmin, isCorrectNetwork } = useWeb3(); const [form,setForm]=useState({title:"",description:"",start:"",end:""}); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();setMessage("");if(!isAdmin||!isCorrectNetwork)return setMessage("Connect the administrator wallet on the correct network.");const start=Math.floor(new Date(form.start).getTime()/1000),end=Math.floor(new Date(form.end).getTime()/1000);if(!Number.isFinite(start)||!Number.isFinite(end))return setMessage("Enter valid start and end dates.");setBusy(true);try{await createElection(contract,account,form.title,form.description,start,end);setMessage("Election created successfully.");setForm({title:"",description:"",start:"",end:""});onCreated?.();}catch(err){setMessage(friendlyError(err));}finally{setBusy(false);}};
 return <form className="panel form-grid" onSubmit={submit}><h2>Create an election</h2><label>Election title<input name="title" value={form.title} onChange={change} required /></label><label>Description<textarea name="description" value={form.description} onChange={change}/></label><label>Start date and time<input type="datetime-local" name="start" value={form.start} onChange={change} required/></label><label>End date and time<input type="datetime-local" name="end" value={form.end} onChange={change} required/></label><button className="vc-button primary" disabled={busy}>{busy?"Submitting...":"Create election"}</button>{message&&<p className="notice">{message}</p>}</form>;
}
