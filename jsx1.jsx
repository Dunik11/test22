// AppContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return [...state, action.payload];
        case 'DELETE_TRANSACTION':
            return state.filter(t => t.id !== action.payload);
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [transactions, dispatch] = useReducer(reducer, [], () => {
        const localData = localStorage.getItem('transactions');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    return (
        <AppContext.Provider value={{ transactions, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};