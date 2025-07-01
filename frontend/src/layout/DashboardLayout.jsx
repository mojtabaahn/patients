import Logo from './../assets/finni-logo.png'
import {NavLink, Outlet} from "react-router-dom";
import { Moon, Sun, Menu, Users, BarChart3, Settings, Calendar } from "lucide-react";
import { useState } from "react";
import { Header } from './Header.jsx';

export default function DashboardLayout() {
    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header spanning full width */}
            <Header />
            
            {/* Main content area with sidebar and content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-gray-950 flex flex-col border-r border-gray-200 dark:border-gray-800 shadow-sm">
                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        <NavLink
                            to="/patient"
                            className={({isActive}) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                isActive 
                                    ? 'text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-950 shadow-sm' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                            }`}
                        >
                            <Users className="w-5 h-5" />
                            Patients
                        </NavLink>

                    </nav>

                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
