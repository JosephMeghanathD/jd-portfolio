import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedPrefs = window.localStorage.getItem('theme');
            if (typeof storedPrefs === 'string' && (storedPrefs === 'light' || storedPrefs === 'dark')) {
                return storedPrefs as Theme;
            }

            const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
            if (userMedia.matches) {
                return 'dark';
            }
        }
        return 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        
        if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return { theme, toggleTheme };
};