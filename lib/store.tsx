"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  PROJECTS, LABOUR, MATERIALS, EXPENSES, MACHINERY, VENDORS, CLIENTS, USERS, INVOICES, DOCUMENTS,
  type Project, type LabourWorker, type Material, type Expense,
  type Equipment, type Vendor, type Client, type User, type Invoice, type Document
} from "./data";

// ── Types ────────────────────────────────────────────────────────────────────
interface StoreState {
  projects:  Project[];
  labour:    LabourWorker[];
  materials: Material[];
  expenses:  Expense[];
  machinery: Equipment[];
  vendors:   Vendor[];
  clients:   Client[];
  users:     User[];
  invoices:  Invoice[];
  documents: Document[];
  currentUser: User | null;
  isNavigating: boolean;
}
interface StoreActions {
  addProject:  (p: Project)       => void;
  addLabour:   (l: LabourWorker)  => void;
  editLabour:  (id: string, l: Partial<LabourWorker>) => void;
  addMaterial: (m: Material)      => void;
  addExpense:  (e: Expense)       => void;
  addMachinery:(e: Equipment)     => void;
  addVendor:   (v: Vendor)        => void;
  addClient:   (c: Client)        => void;
  addUser:     (u: User)          => void;
  addInvoice:  (i: Invoice)       => void;
  addDocument: (d: Document)      => void;
  deleteProject:  (id: string)    => void;
  deleteLabour:   (id: string)    => void;
  deleteMaterial: (id: string)    => void;
  deleteExpense:  (id: string)    => void;
  deleteMachinery:(id: string)    => void;
  deleteVendor:   (id: string)    => void;
  deleteClient:   (id: string)    => void;
  deleteUser:     (id: string)    => void;
  deleteInvoice:  (id: string)    => void;
  deleteDocument: (id: string)    => void;
  login:          (email: string) => boolean;
  logout:         ()              => void;
  startNavigation:()              => void;
  stopNavigation: ()              => void;
}

const StoreContext = createContext<(StoreState & StoreActions) | null>(null);

// ── Helpers ───────────────────────────────────────────────────────────────────
function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch { return fallback; }
}
function save<T>(key: string, val: T) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function nextId(prefix: string, items: { id: string }[]) {
  const nums = items.map(i => parseInt(i.id.replace(/\D/g,""))).filter(n => !isNaN(n));
  const max  = nums.length ? Math.max(...nums) : 0;
  return `${prefix}${String(max + 1).padStart(3,"0")}`;
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [projects,  setProjects]  = useState<Project[]>(() => load("dnb_projects",  PROJECTS));
  const [labour,    setLabour]    = useState<LabourWorker[]>(() => load("dnb_labour",    LABOUR));
  const [materials, setMaterials] = useState<Material[]>(() => load("dnb_materials", MATERIALS));
  const [expenses,  setExpenses]  = useState<Expense[]>(() => load("dnb_expenses",  EXPENSES));
  const [machinery, setMachinery] = useState<Equipment[]>(() => load("dnb_machinery", MACHINERY));
  const [vendors,   setVendors]   = useState<Vendor[]>(() => load("dnb_vendors",   VENDORS));
  const [clients,   setClients]   = useState<Client[]>(() => load("dnb_clients",   CLIENTS));
  const [users,     setUsers]     = useState<User[]>(() => load("dnb_users",       USERS));
  const [invoices,  setInvoices]  = useState<Invoice[]>(() => load("dnb_invoices",  INVOICES));
  const [documents, setDocuments] = useState<Document[]>(() => load("dnb_documents", DOCUMENTS));
  const [currentUser, setCurrentUser] = useState<User | null>(() => load("dnb_current_user", null));
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => { save("dnb_projects",  projects);  }, [projects]);
  useEffect(() => { save("dnb_labour",    labour);    }, [labour]);
  useEffect(() => { save("dnb_materials", materials); }, [materials]);
  useEffect(() => { save("dnb_expenses",  expenses);  }, [expenses]);
  useEffect(() => { save("dnb_machinery", machinery); }, [machinery]);
  useEffect(() => { save("dnb_vendors",   vendors);   }, [vendors]);
  useEffect(() => { save("dnb_clients",   clients);   }, [clients]);
  useEffect(() => { save("dnb_users",     users);     }, [users]);
  useEffect(() => { save("dnb_invoices",  invoices);  }, [invoices]);
  useEffect(() => { save("dnb_documents", documents); }, [documents]);
  useEffect(() => { save("dnb_current_user", currentUser); }, [currentUser]);

  const addProject   = useCallback((p: Project)       => setProjects(ps  => [p, ...ps]),  []);
  const addLabour    = useCallback((l: LabourWorker)  => setLabour(ls    => [l, ...ls]),  []);
  const editLabour   = useCallback((id: string, updated: Partial<LabourWorker>) => setLabour(ls => ls.map(l => l.id === id ? { ...l, ...updated } : l)), []);
  const addMaterial  = useCallback((m: Material)      => setMaterials(ms => [m, ...ms]), []);
  const addExpense   = useCallback((e: Expense)       => setExpenses(es  => [e, ...es]),  []);
  const addMachinery = useCallback((e: Equipment)     => setMachinery(ms => [e, ...ms]), []);
  const addVendor    = useCallback((v: Vendor)        => setVendors(vs   => [v, ...vs]),  []);
  const addClient    = useCallback((c: Client)        => setClients(cs   => [c, ...cs]),  []);
  const addUser      = useCallback((u: User)          => setUsers(us     => [u, ...us]),  []);
  const addInvoice   = useCallback((i: Invoice)       => setInvoices(is  => [i, ...is]),  []);
  const addDocument  = useCallback((d: Document)      => setDocuments(ds => [d, ...ds]),  []);

  const deleteProject   = useCallback((id: string) => setProjects(ps  => ps.filter(p => p.id !== id)),  []);
  const deleteLabour    = useCallback((id: string) => setLabour(ls    => ls.filter(l => l.id !== id)),  []);
  const deleteMaterial  = useCallback((id: string) => setMaterials(ms => ms.filter(m => m.id !== id)), []);
  const deleteExpense   = useCallback((id: string) => setExpenses(es  => es.filter(e => e.id !== id)),  []);
  const deleteMachinery = useCallback((id: string) => setMachinery(ms => ms.filter(e => e.id !== id)), []);
  const deleteVendor    = useCallback((id: string) => setVendors(vs   => vs.filter(v => v.id !== id)),  []);
  const deleteClient    = useCallback((id: string) => setClients(cs   => cs.filter(c => c.id !== id)),  []);
  const deleteUser      = useCallback((id: string) => setUsers(us     => us.filter(u => u.id !== id)),  []);
  const deleteInvoice   = useCallback((id: string) => setInvoices(is  => is.filter(i => i.id !== id)),  []);
  const deleteDocument  = useCallback((id: string) => setDocuments(ds => ds.filter(d => d.id !== id)),  []);

  const login = useCallback((email: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const startNavigation = useCallback(() => setIsNavigating(true), []);
  const stopNavigation = useCallback(() => setIsNavigating(false), []);

  return (
    <StoreContext.Provider value={{
      projects, labour, materials, expenses, machinery, vendors, clients, users, invoices, documents, currentUser, isNavigating,
      addProject, addLabour, editLabour, addMaterial, addExpense, addMachinery, addVendor, addClient, addUser, addInvoice, addDocument,
      deleteProject, deleteLabour, deleteMaterial, deleteExpense, deleteMachinery, deleteVendor, deleteClient, deleteUser, deleteInvoice, deleteDocument,
      login, logout, startNavigation, stopNavigation
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

// ── ID generators (exported for forms) ───────────────────────────────────────
export { nextId };
