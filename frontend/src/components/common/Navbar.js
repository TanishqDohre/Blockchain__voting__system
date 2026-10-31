import React from "react";
import { Link, NavLink } from "react-router-dom";
import WalletConnect from "./WalletConnect";
export default function Navbar() { return <header className="navbar"><Link className="brand" to="/">◈ VoteChain</Link><nav><NavLink exact to="/">Home</NavLink><NavLink to="/elections">Elections</NavLink><NavLink to="/how-it-works">How it works</NavLink><NavLink to="/admin">Admin</NavLink></nav><WalletConnect /></header>; }
