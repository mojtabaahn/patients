import {Button, Tooltip} from "@heroui/react";
import {Plus} from "lucide-react";
import Logo from '../assets/finni-logo.png';
import {NavLink} from "react-router-dom";
import { createPortal } from 'react-dom';

// Portal components for filling header sections
export const HeaderTitle = ({ children }) => {
    const titlePortal = document.getElementById('header-title-portal');
    if (!titlePortal) return null;
    return createPortal(children, titlePortal);
};

export const HeaderActions = ({ children }) => {
    const actionsPortal = document.getElementById('header-actions-portal');
    if (!actionsPortal) return null;
    return createPortal(children, actionsPortal);
};

export const HeaderSubtitle = ({ children }) => {
    const subtitlePortal = document.getElementById('header-subtitle-portal');
    if (!subtitlePortal) return null;
    return createPortal(children, subtitlePortal);
};

export const Header = () => {
    return (
        <header className="flex items-stretch bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm w-full">
            {/* Logo section with sidebar width */}
            <div className="w-64 flex items-center border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 min-h-[104px]">
                <NavLink to={'/'} className="flex items-center gap-3 px-6 py-6 transition-colors duration-200 w-full">
                    <img src={Logo} alt="Finni Logo" className="h-8"/>
                </NavLink>
            </div>
            
            {/* Main heading section */}
            <div className="flex items-center justify-between flex-1 px-8 py-6">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        <div id="header-title-portal"></div>
                    </h1>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <div id="header-subtitle-portal"></div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div id="header-actions-portal"></div>
                </div>
            </div>
        </header>
    );
};