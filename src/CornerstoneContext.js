import { createContext, useContext } from 'react';

export const CornerstoneContext = createContext({});
export const useCornerstoneContext = () => useContext(CornerstoneContext);
