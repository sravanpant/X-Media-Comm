"use client";

import React, { createContext, useContext, useReducer } from "react";
import {
  Company,
  Communication,
  CommunicationMethod,
  mockCompanies,
  mockCommunicationMethods,
  mockCommunications,
} from "@/lib/mockData";

type State = {
  companies: Company[];
  communications: Communication[];
  communicationMethods: CommunicationMethod[];
};

type Action =
  | { type: "ADD_COMPANY"; payload: Company }
  | { type: "UPDATE_COMPANY"; payload: Company }
  | { type: "DELETE_COMPANY"; payload: string }
  | { type: "ADD_COMMUNICATION"; payload: Communication }
  | { type: "UPDATE_COMMUNICATION"; payload: Communication }
  | { type: "DELETE_COMMUNICATION"; payload: string }
  | { type: "SET_COMMUNICATION_METHODS"; payload: CommunicationMethod[] }
  | { type: "ADD_COMMUNICATION_METHOD"; payload: CommunicationMethod }
  | { type: "DELETE_COMMUNICATION_METHOD"; payload: string };

const initialState: State = {
  companies: mockCompanies,
  communications: mockCommunications,
  communicationMethods: mockCommunicationMethods,
};

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_COMPANY":
      return {
        ...state,
        companies: [...state.companies, action.payload],
      };
    case "UPDATE_COMPANY":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.id ? action.payload : company
        ),
      };
    case "DELETE_COMPANY":
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company.id !== action.payload
        ),
      };
    case "ADD_COMMUNICATION":
      return {
        ...state,
        communications: [...state.communications, action.payload],
      };
    case "UPDATE_COMMUNICATION":
      return {
        ...state,
        communications: state.communications.map((comm) =>
          comm.id === action.payload.id ? action.payload : comm
        ),
      };
    case "DELETE_COMMUNICATION":
      return {
        ...state,
        communications: state.communications.filter(
          (comm) => comm.id !== action.payload
        ),
      };
    case "SET_COMMUNICATION_METHODS":
      return {
        ...state,
        communicationMethods: action.payload,
      };
    case "ADD_COMMUNICATION_METHOD":
      return {
        ...state,
        communicationMethods: [...state.communicationMethods, action.payload],
      };
    case "DELETE_COMMUNICATION_METHOD":
      return {
        ...state,
        communicationMethods: state.communicationMethods.filter(
          (method) => method.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
